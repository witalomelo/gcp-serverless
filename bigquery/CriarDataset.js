const BigQuery = require('@google-cloud/bigquery').BigQuery;
const instancia = new BigQuery();

async function criarDataset() {
    const [datasets] = await instancia.getDatasets();
    const nomeDataset = 'forum_alura';
    const datasetFiltrado = datasets.filter(function (datasetAtual){
        return datasetAtual.id == nomeDataset
    })

    if (datasetFiltrado.length > 0) {
        console.log('Este dataset já existe');
        return;
    }

    await instancia.createDataset(nomeDataset);
    console.log('Dataset criado com sucesso:', nomeDataset);
}

criarDataset()