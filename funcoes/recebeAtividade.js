module.exports = function recebeAtividade(requisicao, resposta) {
    console.log(requisicao.body)
    resposta.send(JSON.stringify(requisicao.body))
}