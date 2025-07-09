const pubsub = require("./pubsub");

module.exports = async function recebeAtividade(requisicao, resposta) {
  const atividade = requisicao.body;

  if (atividade.hasOwnProperty("data_criacao_atividade") === false) {
    resposta.send("o campo data_criacao_atividade é obrigatório");
    return;
  }

  const tiposDeAtividade = ["pergunta", "resposta"];
  if (tiposDeAtividade.indexOf(atividade.tipo_de_atividade) === -1) {
    resposta.send("o campo tipo_de_atividade deve ser pergunta ou resposta");
    return;
  }

  if (atividade.hasOwnProperty("nome_do_curso") === false) {
    resposta.send("o campo nome do curso é obrigatório");
    return;
  }

  if (atividade.hasOwnProperty("nome_da_aula") === false) {
    resposta.send("o campo nome da aula é obrigatório");
    return;
  }

  if (atividade.hasOwnProperty("texto") === false) {
    resposta.send("o campo texto é obrigatório");
    return;
  }

  if (atividade.texto.length > 255) {
    resposta.send("o campo texto deve ter no máximo 255 caracteres");
    return;
  }

  const resultado = await pubsub(atividade, "atividades");
  console.log(atividade);
  resposta.send(resultado);
};
