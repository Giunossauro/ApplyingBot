Este é um modelo de código para enviar currículos de maneira automatizada para a Catho, respondendo perguntas com IA.

Necessário ajusta o código front e back end para funcionar com base nos parâmetros atuais das plataformas (Catho e OpenAI).

Necessário criar uma conta de desenvolvedor na OpenAI, criar uma chave de API, confirmar os limites atuais (TMP, RPM e RPD) e criar um assistente que basear-se-á no currículo transcrito como auto-biografia.

Exemplo de instruções para o assistente:
"""
Você está enviando currículos e deve responder as perguntas de com base nas instruções a seguir.
Suas respostas devem aproveitar o máximo possível dos elementos da Descrição da Vaga, pois isto vai garantir que os robos de avaliação de candidaturas percebam a aderência do candidato com as funções da vaga, mas também devem limitar-se ao seu currículo.
Também é muito importante que você respeite o limite de caracteres que será pedido para a resposta.

Seu currículo:
Currículo:
```
Fulano
Objetivo: Enxugador de Gelo

Endereço (bairro, cidade, estado)
Contato: 11999999999 (principal) e 11987654321 (recados)
LinkedIn: https...
E-mail: aaa@gmail.com

FORMAÇÃO

Instituição de Ensino Superior: Estácio de Sá
Curso: Enxugador de Gelo
Nível: Graduação
Início: 03/2018
Conclusão: 07/2020
O que aprendeu: Enxugar gelo até o sumiço completo do mesmo.

PRINCIPAIS COMPETÊNCIAS

bla bla bla

EXPERIÊNCIAS PROFISSIONAIS

Claro Nxt
Cargo: Exnxugador de gelo
De 01/02/2024 até o 30/09/2025
Enxugação de gelo básica.

bla bla bla

CURSOS

etc.

IDIOMAS

bla bla bla
```
"""

Com a assistente, as requisições pode seguir assim:
"""
Olá! Com base na descrição da vaga, por favor, responda com até ${limiteDeCaracteresDaPergunta} caracteres: ${pergunta}

Descrição da Vaga:
```
${descricaoDaVagaFormatada)
```
"""

---

Outro jeito de consumir a OpenAI é sem usar o assistente. Neste caso, todas as requisições devem conter algo assim:
"""
Olá! Com base no currículo e na descrição da vaga, por favor, responda com até ${limiteDeCaracteresDaPergunta} caracteres: ${pergunta}

Currículo:
```
Fulano
Objetivo: Enxugador de Gelo

Endereço (bairro, cidade, estado)
Contato: 11999999999 (principal) e 11987654321 (recados)
LinkedIn: https...
E-mail: aaa@gmail.com

FORMAÇÃO

Instituição de Ensino Superior: Estácio de Sá
Curso: Enxugador de Gelo
Nível: Graduação
Início: 03/2018
Conclusão: 07/2020
O que aprendeu: Enxugar gelo até o sumiço completo do mesmo.

PRINCIPAIS COMPETÊNCIAS

bla bla bla

EXPERIÊNCIAS PROFISSIONAIS

Claro Nxt
Cargo: Exnxugador de gelo
De 01/02/2024 até o 30/09/2025
Enxugação de gelo básica.

bla bla bla

CURSOS

etc.

IDIOMAS

bla bla bla
```

Descrição da Vaga:
```
${descricaoDaVagaFormatada)
```
"""

Se não me engano, o assistente vai consumir o mesmo tanto de caracteres que enviando tudo da segunda forma (tudo junto, pergunta + curriculo + descrição da vaga).
