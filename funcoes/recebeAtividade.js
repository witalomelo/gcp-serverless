module.exports = function recebeAtividade(requisicao, resposta) {
    console.log(requisicao.body)
    resposta.send(JSSON.stringify(requisicao.body))
}