const inserir = require('../bigquery/inserir')


module.exports = async function insereAtividade(evento) {
    try {
        const AtividadeCodificada = evento.data
        const json = Buffer.from(AtividadeCodificada, 'base64').toString()
        const atividade = JSON.parse(json)

        const resultados = await inserir(atividade)
        console.log(resultados)
    } catch (erro) {
        console.error(erro)
        console.log(erro.response)
    }

}

