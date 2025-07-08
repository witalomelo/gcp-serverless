const BigQuery = require('@google-cloud/bigquery').BigQuery
const instancia = new BigQuery()

async function criarTabela() {
    try {
        const dataset = instancia.dataset('forum_alura')
        const [tabelas] = await dataset.getTables()
        const nomeTabela = 'atividades'
        const tabelasEncontradas = tabelas.filter(function (tabelaAtual) {
            return tabelaAtual.id === nomeTabela
        })

        if (tabelasEncontradas.length > 0) {
            console.log('Esta tabela ja existe')
            return
        }

        const estrutura = [
            {
                name: 'data_criacao_atividade',
                type: 'timestamp',
                mode: 'required'
            },
            {
                name: 'tipo_de_atividade',
                type: 'string',
                mode: 'required'
            },
            {
                name: 'nome_do_curso',
                type: 'string',
                mode: 'required'
            },
            {
                name: 'nome_da_aula',
                type: 'string',
                mode: 'required'
            },
            {
                name: 'texto',
                type: 'string',
                mode: 'required'
            },
            {
                name: 'id_atividade_principal',
                type: 'integer',
                mode: 'nullable'
            }
        ]

        await dataset.createTable(nomeTabela, { schema: estrutura })
        console.log('Tabela criada com sucesso:', nomeTabela)
        
    } catch (error) {
        console.error('Erro ao criar tabela:', error.message)
        throw error
    }
}

criarTabela()
    .then(() => console.log('Processo concluído'))
    .catch(error => console.error('Erro no processo:', error))