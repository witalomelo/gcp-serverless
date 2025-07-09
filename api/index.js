const koa = require('koa');
const aplicacao = new koa();

aplicacao.use(function (contexto) {
    contexto.status = 200
    contexto.body = {
        mensagem: 'API esta funcionando'
    }
    
})

aplicacao.listen(3000)

console.log('API rodando na porta 3000');