const koa = require("koa");
const processador = require("koa-bodyparser");
const aplicacao = new koa();
const pesquisar = require("../bigquery/pesquisar");

aplicacao.use(processador())
aplicacao.use(async function (contexto) {

    const corpoDaRequisicao = contexto.request.body
    contexto.status = 200;
    contexto.body = await pesquisar(corpoDaRequisicao.filtro);
});

aplicacao.listen(3000);

console.log("API rodando na porta 3000");
