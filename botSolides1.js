(async () => {
  const positivas = [
    "Alegre",
    "Animado",
    "Arrogante",
    "Ativo",
    "Audacioso (Ousado)",
    "Auto-Disciplinado",
    "Auto-Suficiente",
    "Bem-Humorado",
    "Bem-Quisto",
    "Bom Companheiro",
    "Calculista",
    "Calmo",
    "Compreensivo",
    "Comunicativo",
    "Conservador",
    "Contagiante",
    "Corajoso",
    "Crítico",
    "Cumpridor",
    "Decidido",
    "Dedicado",
    "Destacado",
    "Discreto",
    "Eficiente",
    "Empolgante",
    "Enérgico",
    "Entusiasta",
    "Equilibrado",
    "Estimulante",
    "Exagerado",
    "Exigente",
    "Extrovertido",
    "Exuberante",
    "Firme",
    "Habilidoso",
    "Idealista",
    "Independente",
    "Influenciador",
    "Leal",
    "Líder",
    "Metódico",
    "Minucioso",
    "Modesto",
    "Otimista",
    "Paciente",
    "Perfeccionista",
    "Persistente",
    "Popular",
    "Prático",
    "Pretensioso",
    "Procrastinador",
    "Racional",
    "Reservado",
    "Resoluto (Decidido)",
    "Rotineiro",
    "Sarcástico",
    "Sensível",
    "Simpático",
    "Sincero",
    "Teórico",
    "Tranquilo",
    "Vaidoso"
  ];

  const negativas = [
    "Barulhento",
    "Desconfiado",
    "Egocêntrico",
    "Egoísta",
    "Espalhafatoso",
    "Frio",
    "Impaciente",
    "Indeciso",
    "Inflexível",
    "Ingênuo",
    "Inseguro",
    "Insensível",
    "Intolerante",
    "Introvertido",
    "Orgulhoso",
    "Pessimista",
    "Sentimental",
    "Temeroso",
  ];

  const positivasEscolhidas = [];
  const negativasEscolhidas = [];
  let contadorEscolhidas = 0;
  let iterador = 0;

  while (contadorEscolhidas < 31) {
    if (Math.round(Math.random() - 0.45)) {
      document.getElementsByClassName("sc-hLiYPF AfDZr")[positivas[iterador]]?.click();
      positivasEscolhidas.push(positivas[iterador])
      ++contadorEscolhidas;
    }
    if (++iterador > 61) iterador = 0;
  }

  contadorEscolhidas = 0;
  iterador = 0;

  while (contadorEscolhidas < 5) {
    if (Math.round(Math.random() - 0.45)) {
      document.getElementsByClassName("sc-hLiYPF AfDZr")[negativas[iterador]]?.click();
      negativasEscolhidas.push(negativas[iterador])
      ++contadorEscolhidas;
    }
    if (++iterador > 17) iterador = 0;
  }

  contadorEscolhidas = 0;
  iterador = 0;

  const positivasRestantes = positivas.filter(
    (positiva) => !positivasEscolhidas.some(
      (positivaEscolhida) => positivaEscolhida == positiva
    )
  );

  const negativasRestantes = negativas.filter(
    (negativa) => !negativasEscolhidas.some(
      (negativaEscolhida) => negativaEscolhida == negativa
    )
  );
  
  await new Promise(handler => setTimeout(handler, 2000));

  document.getElementsByClassName("sc-hMqMXs sc-kEYyzF gJMkrv")[0]?.click();
  
  await new Promise(handler => setTimeout(handler, 1500));

  while (contadorEscolhidas < 10) {
    if (Math.round(Math.random() - 0.45)) {
      document.getElementsByClassName("sc-hLiYPF AfDZr")[positivasRestantes[iterador]]?.click();
      ++contadorEscolhidas;
    }
    if (++iterador > 30) iterador = 0;
  }

  contadorEscolhidas = 0;
  iterador = 0;

  while (contadorEscolhidas < 3) {
    if (Math.round(Math.random() - 0.45)) {
      document.getElementsByClassName("sc-hLiYPF AfDZr")[negativasRestantes[iterador]]?.click();
      ++contadorEscolhidas;
    }
    if (++iterador > 12) iterador = 0;
  }
  
  await new Promise(handler => setTimeout(handler, 1500));

  document.getElementsByClassName("sc-hMqMXs sc-kEYyzF gJMkrv")[0].click();
})()
