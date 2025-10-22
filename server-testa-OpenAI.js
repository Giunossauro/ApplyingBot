import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "myApiKey" // 
});

(async () => {
  const thread = await openai.beta.threads.create();
  const threadId = thread.id;

  const message = await openai.beta.threads.messages.create( // teste
    threadId, // example "thread_GTJB732sFSm951TaD3fvdo6w",
    {
      role: "user",
      content: "Você pode levantar um caminhão? Responda com até 60 palavras."
    }
  );
  
  const run1 = await openai.beta.threads.runs.create(
    threadId, // "thread_GTJB702wFSdsa1TaD3fvdo6w",
    {
      assistant_id: "", // example: asst_7mcXnH8342dpG4b5T8E2M7PJ
    }
  );
  
  const run2 = await openai.beta.threads.runs.retrieve(
    threadId, // "thread_GTJB702wFSm951Tasaavdo6w",
    run1.id
  );

  const messages = await openai.beta.threads.messages.list(
    threadId, // "thread_GTJB702wFS54teTaD3fvdo6w",
  );

  console.log(messages.data.toString());
})();
