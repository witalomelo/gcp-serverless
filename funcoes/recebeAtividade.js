const pubsub = require('./pubsub')

module.exports = async function recebeAtividade(requisicao, resposta) {
    const resultado = await pubsub(requisicao.body, 'atividades')
    console.log(requisicao.body)
    resposta.send(resultado)
}