const BigQuery = require('@google-cloud/bigquery').BigQuery
const instancia = new BigQuery()

module.exports = async function inserir(linhas) {
    try {
        if (!linhas) {
            throw new Error('Dados para inserção não fornecidos')
        }

        const dataset = instancia.dataset('forum_alura')
        const tabela = dataset.table('atividades')

        console.log('Inserindo dados na tabela atividades...')
        const resultado = await tabela.insert(linhas)
        
        console.log('Dados inseridos com sucesso')
        return resultado
        
    } catch (error) {
        console.error('Erro ao inserir dados:', error.message)
        
        // Log de erros específicos do BigQuery
        if (error.name === 'PartialFailureError') {
            console.error('Erros de inserção:', error.errors)
        }
        
        throw error
    }
}