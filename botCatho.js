(async () => {
  const complementoTexto = ` Se a resposta for positiva ou parcialmente positiva, responda com um texto de 10 até 60 palavras, mas se a resposta for negativa ou se a pergunta for de "Sim" ou "Não", responda apenas com "Não.".`;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  for (let pagina = 0; pagina < 500; ++pagina) {
    // Conta quantas vagas tem na página
    for (const oldButton of document.getElementsByClassName(
      "Button__StyledButton-sc-1ovnfsw-1 cqioez sc-eqUAAy sc-fHjqPf kRUyJB lmJCPj"
    )) {
      console.log(
        "oldButton: " + oldButton
          ?.parentElement
          ?.parentElement
          ?.parentElement
          ?.parentElement
          ?.parentElement
          ?.children[0]
          ?.children[1]
      );

      oldButton
        ?.parentElement
        ?.parentElement
        ?.parentElement
        ?.parentElement
        ?.parentElement
        ?.children[0]
        ?.children[1]
        ?.click();

      await sleep(1250);
    }

    for (const button of document.getElementsByClassName(
      "Button__StyledButton-sc-1ovnfsw-1 cqioez sc-eqUAAy sc-fHjqPf kRUyJB lmJCPj"
    )) {
      console.log("button: " + button);

      const divDescricaoDaVaga = button
        .parentElement.parentElement.parentElement.children[0].children[0];
      console.log("divDescricaoDaVaga: " + divDescricaoDaVaga);

      const preDescricaoDaVaga = divDescricaoDaVaga.children[0].innerText.concat(
        Boolean(
          divDescricaoDaVaga?.children[1]?.innerText
        ) ? ". " + divDescricaoDaVaga.children[1].innerText : ""
      ).substring(0, 1234);

      const descricaoDaVaga = preDescricaoDaVaga + "\nRegime de Contratação: " + divDescricaoDaVaga
        ?.parentElement
        ?.parentElement
        ?.children[2]
        ?.children[0]
        ?.children[1]
        ?.children[1]
        ?.children[1]
        ?.innerText;

      // Abre a vaga
      await sleep(1500);
      button.click();
      await sleep(2500);

      // Implementar aqui o fetch com a questão e preencher o form com a resposta.
      const form = document.getElementsByTagName("form")[1].children;
      console.log("form: " + form);

      const formSize = form.length - 1;
      console.log("formSize: " + formSize);

      const inputIndexes = [];
      const cleanedQueries = [];

      let query = `Descrição e requisitos da vaga:\n"""\n`.concat(
        descricaoDaVaga,
        `\n"""\n\nDe acordo com a descrição e requisitos da vaga, responda a${
          (formSize - 4) < 2 ? '' : 's'
        }${
          (formSize - 4) < 2 ? '' : " "
        } pergunta${(formSize - 4) < 2 ? '' : 's'} seguinte${(formSize - 4) < 2 ? '' : 's'}: \n"""`
      );

      for (let inputIndex = 3; inputIndex < formSize && Boolean(form[inputIndex].innerHTML); ++inputIndex) {
        // Implementar aqui o teste para saber se é "Sim" ou "Não".
        const isRadioButton = form[inputIndex]
          ?.children[0]
          ?.children[2]
          ?.className == "FieldGroup-sc-18uoi37-0 RadioGroup__Group-sc-1l7wvp0-0 kNOdxP kkjnDG";
        console.log("isRadioButton: " + isRadioButton);

        if (!isRadioButton) {
          inputIndexes.push(inputIndex);
          const bruteQuery = (
            form[inputIndex]?.children[0]?.children[0]?.children[0] || form[inputIndex].children[0].children[0]
          ).innerText;
          console.log("bruteQuery: " + bruteQuery);

          const cleanedQuery = (
            bruteQuery.endsWith("*") ? bruteQuery.substring(0, bruteQuery.length - 1) : bruteQuery
          );
          console.log("cleanedQuery: " + cleanedQuery);

          query += `\n- ${cleanedQuery}\n`;
          cleanedQueries.push(`- ${cleanedQuery}`)
        } else {
          const radioButtons = form[inputIndex]
            .children[0]
            .children[2];
          console.log("radioButtons: " + radioButtons);
          if (radioButtons.children[0].innerText.toUpperCase().includes("SIM")) {
            console.log(
              "radioButtons.children[0].innerText: " + radioButtons.children[0].innerText
            );
            radioButtons.children[0].click();
          } else {
            console.log(
              "radioButtons.children[1].innerText: " + radioButtons.children[1].innerText
            );
            radioButtons.children[1].click();
          }
        }
        await sleep(800);
      }

      query += `"""\n\n`;

      if (inputIndexes.length) {
        let respostaBruta = (await (await fetch('http://localhost:9001', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          }, body: JSON.stringify({
            pergunta: query.concat(
              `Inicie cada resposta com "Resposta: " insira a resposta na mesma linha sem repetir a pergunta. `,
              `Exemplo de resposta com respostas para 2 perguntas:\n"""\nResposta: Esta é a resposta para a primeira pergunta.`,
              `\n\nResposta: Esta é a resposta para a segunda pergunta.\n"""\n\nVocê deve responder exatamente neste modelo. `,
              "Você não deve repetir nenhuma pergunta na resposta (nem para deixar mais organizado), deve apenas responder conforme o exemplo acima, mesmo que isto pareça estranho!",
              complementoTexto
            ),
          })
        })).json()).resposta;
        console.log("resposta: " + respostaBruta);

        cleanedQueries.forEach((cleanedQuery) => {
          respostaBruta.replace(cleanedQuery, '');
        })
        const respostas = respostaBruta.replaceAll('\n', '').split("Resposta:").map(
          (resposta) => resposta.replace("Resposta:")
        );
        console.log(respostas)
await sleep(5000000)
        if (respostas.length == inputIndexes.length) {
          let respostaIndex = 0;
          for (const inputIndex of inputIndexes) {
            form[inputIndex].children[0].children[0].children[1].innerText = respostas[respostaIndex++];
            await sleep(1300);
          }
        }
        else {
          let enganaSonarLint = 32000;
          while(--enganaSonarLint != 0) {
            console.error("A quantidade de respostas está diferente quantidade de inputs.");
            console.error("Estou num loop infinito para logar esta mensagem! hehehe...");
            await sleep(60000);
          }
        }
      }

      // Envia a candidatura
      document?.getElementsByClassName(
        "Button__StyledButton-sc-1ovnfsw-1 lloNUs"
      )[0].click(); // clica em enviar,
      await sleep(2500);

      // Se tiver uma janelinha de confirmação...
      if (Boolean(document?.getElementsByClassName(
        "Footer-sc-pp401c-0 sc-fUnMCh kxpEKS gvGeRj")[0]
      )) {
        console.log("tem janelinha de confirmação: " + document.getElementsByClassName(
          "Button__StyledButton-sc-1ovnfsw-1 gaLHkw"
        )[1]);
        document.getElementsByClassName(
          "Button__StyledButton-sc-1ovnfsw-1 gaLHkw"
        )[1].click(); // clica para fechar.
        await sleep(2500);
      }
    }
    // Passa para próxima página.
    console.log("botão próxima página: " + document.getElementsByClassName(
      "ActionButton-sc-2etngu-0 Mobile__StyledActionButton-sc-1h7l4jx-1 hphAPI cJJOEM"
    )[0]);
    document.getElementsByClassName(
      "ActionButton-sc-2etngu-0 Mobile__StyledActionButton-sc-1h7l4jx-1 hphAPI cJJOEM"
    )[0].click();

    // Espera nova página carregar.
    await sleep(5000);
  }
})()
