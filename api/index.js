const koa = require("koa");
const conversor = require("basic-auth");
const processador = require("koa-bodyparser");
const aplicacao = new koa();
const pesquisar = require("../bigquery/pesquisar");

aplicacao.use(processador());
aplicacao.use(async function (contexto) {
  try {
    // Verificar se há header de autorização
    if (!contexto.request.headers.authorization) {
      contexto.status = 401;
      contexto.body = {
        mensagem: "Header de autorização necessário",
      };
      return;
    }

    const usuarioEsenha = conversor.parse(
      contexto.request.headers.authorization
    );

    if (!usuarioEsenha) {
      contexto.status = 401;
      contexto.body = {
        mensagem: "Formato de autorização inválido",
      };
      return;
    }

    const USUARIO = process.env.USUARIO;
    const SENHA = process.env.SENHA;

    if (USUARIO !== usuarioEsenha.name || SENHA !== usuarioEsenha.pass) {
      contexto.status = 401;
      contexto.body = {
        mensagem: "Usuário ou senha inválidos",
      };
      return;
    }

    const corpoDaRequisicao = contexto.request.body;
    const resultados = await pesquisar(corpoDaRequisicao.filtro);

    contexto.status = 200;
    contexto.body = {
      dados: resultados,
      total: resultados.length,
    };
  } catch (erro) {
    console.error("Erro na API:", erro);
    contexto.status = 500;
    contexto.body = {
      mensagem: "Erro interno do servidor",
    };
  }
});

aplicacao.listen(3000);

console.log("API rodando na porta 3000");