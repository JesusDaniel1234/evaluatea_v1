const conteoPuntosQChat = (preguntas, checkedList) => {
  let puntos = 0;

  for (let i = 0; i < preguntas.length; i++) {
    const pregunta = preguntas[i];
    
    const checkedItem = checkedList.find(
      (item) => pregunta.id === item.id
    );
    

    if (checkedItem) {
      if (
        pregunta.rango_riesgo.rango.startsWith("Más") ||
        pregunta.rango_riesgo.rango.startsWith("Mayor")
      ) {
        puntos += Number(checkedItem.value);
      } else {
        puntos += 4 - Number(checkedItem.value);
      }
    }
  }
  return puntos;
};

const conteoPuntosQchat10 = (preguntas, checkedList) => {
  var puntos = 0;

  for (let i = 0; i < preguntas.length; i++) {
    
    const pregunta = preguntas[i];
    const checkedItem = checkedList.find(
      (item) => pregunta.id === item.id
    );

    if (checkedItem) {
      const isLessRisk = pregunta.rango_riesgo.rango.startsWith("Menos");
      const isValueInRiskRange = isLessRisk
        ? pregunta.valor_riesgo.orden >= Number(checkedItem.value)
        : pregunta.valor_riesgo.orden <= Number(checkedItem.value);

      if (isValueInRiskRange) {
        puntos++;
      }
    }
  }

  return puntos;
};


export const conteoPuntosMChatR = (preguntas, valoresMarcados) => {
  var puntos = 0;

  for (let i = 0; i < preguntas.length; i++) {
    for (let j = 0; j < valoresMarcados.length; j++) {
      if (
        preguntas[i].id === valoresMarcados[j].id &&
        preguntas[i].respuesta_riesgo === valoresMarcados[j].value
      ) {
        puntos++;
      }
    }
  }
  return puntos;
};

export const conteoPuntos = {
  MChatR: conteoPuntosMChatR,
  QChat: conteoPuntosQChat,
  QChat10: conteoPuntosQchat10
}