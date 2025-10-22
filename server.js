import fs from 'node:fs';
import express from 'express';
import cors from 'cors';
import OpenAI from "openai";
import { sleep } from 'openai/core';

const app = express();
const port = 9001;

const openai = new OpenAI({
  apiKey: "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" // exemplo
});

/* (async () => { // aqui seria para re-treinar a IA (o fine-tuning)
  const file = await openai.files.create({
    file: fs.createReadStream('mydata.jsonl'), purpose: 'fine-tune'
  }); // file-NQQAVo8PkIuyHdiV1uF9CsCf

  console.log(file)

  await sleep(500000);

  const fineTune = await openai.fineTuning.jobs.create({
    training_file: 'mydata', model: 'gpt-3.5-turbo'
  });
})(); */

const lastDate = new Date();
const TPM_LIMIT = 40000;
const RPM_LIMIT = 3;
const RPD_LIMIT = 200;
let TPMCounter = 0;
let RPMCounter = 0;
let RPDCounter = 0;
let lastMinute = lastDate.getUTCMinutes();
let lastDay = lastDate.getUTCDate();

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((_req, res, next) => {
  res.setHeader('Content-Security-Policy', 'connect-src *');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/', async (req, res) => {
  const date = new Date();
  let day = date.getUTCDate();
  let minute = date.getUTCMinutes();

  if (RPMCounter == RPM_LIMIT || TPMCounter >= TPM_LIMIT) {
    while (minute == lastMinute) {
      await sleep(5000);
      lastMinute = (new Date()).getUTCMinutes();
    }
  }

  if (RPDCounter == RPD_LIMIT) {
    while (day == lastDay) {
      await sleep(600000);
      lastDay = (new Date()).getUTCDate();
    }
  }

  if (RPDCounter == RPD_LIMIT) {
    const newDate = new Date();
    RPDCounter = 0;
    RPMCounter = 0;
    TPMCounter = 0;
    lastMinute = newDate.getUTCMinutes();
    lastDay = newDate.getUTCDate();
  }
  else if (RPMCounter == RPM_LIMIT || TPMCounter >= TPM_LIMIT) {
    RPMCounter = 0;
    TPMCounter = 0;
    lastMinute = (new Date()).getUTCMinutes();
  }

  //const thread = await openai.beta.threads.create();
  const threadId = "thread_EEV5NYXhbqxuyMGDLLJY9u"; // exemplo

  await openai.beta.threads.messages.create(
    threadId,
    { role: "user", content: req.body.pergunta }
  );

  const runId = (await openai.beta.threads.runs.create(
    threadId,
    { assistant_id: "asst_oXdLdoqOVsasoz04rLgHSqsb" } // exemplo
  )).id;

  let runResult = "";

  do {
    await sleep(5000);
    runResult = (await openai.beta.threads.runs.retrieve(
      threadId,
      runId
    )).status;
    if (runResult == "failed") throw new Error("run failed!");
  } while (runResult != "completed");

  const resposta = (await openai.beta.threads.messages.list(
    threadId
  ))?.data[0]?.content[0]?.text?.value;

  console.log("threadId:", threadId, "\n");
  console.log("pergunta:", req.body.pergunta, "\n")
  console.log("resposta:", resposta, "\n");
  console.log("\n\n\n----\n\n\n");
  /* console.log("resposta", resposta);
  console.log("\n\n")
  console.log("resposta.data", resposta.data);
  console.log("\n\n")
  console.log("resposta.data[0]", resposta.data[0]);
  console.log("\n\n")
  console.log("resposta.data[0].content", resposta.data[0].content);
  console.log("\n\n")
  console.log("resposta.data[0].content[0]", resposta.data[0].content[0]);
  console.log("\n\n")
  console.log("resposta.data[0].content[1]", resposta.data[0].content[1]);
  console.log("\n\n")
  console.log("resposta.data[0].content[0].text", resposta.data[0].content[0].text);
  console.log("\n\n")
  console.log("resposta.data[0].content[1].text", resposta.data[0].content[1].text);
  console.log("\n\n")
  console.log("resposta.data[0].content[0].text.value", resposta.data[0].content[0].text.value);
  console.log("\n\n")
  console.log("resposta.data[0].content[1].text.value", resposta.data[0].content[1].text.value);
    await sleep(500000); */
  res.send({ resposta: resposta || "Erro na geração da resposta." });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
