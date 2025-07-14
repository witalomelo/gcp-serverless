# Forum Alura - Aplicação DevOps

Aplicação Node.js que integra com BigQuery para demonstrar práticas de DevOps no Google Cloud Platform (GCP).

## 📋 Sobre o Projeto

Esta aplicação é uma API REST desenvolvida em Node.js que:

- Processa atividades de usuários
- Armazena dados no BigQuery
- Utiliza Cloud Functions e Cloud Pub/Sub
- Executa em containers Docker
- Deploy automatizado no Google Kubernetes Engine (GKE)

## 🏗️ Arquitetura

```
API Node.js → BigQuery (Armazenamento)
     ↓
Docker Container → GKE (Kubernetes)
     ↓
Artifact Registry (Imagens)
```

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime da aplicação
- **Docker** - Containerização
- **Google Kubernetes Engine (GKE)** - Orquestração
- **BigQuery** - Data Warehouse
- **Artifact Registry** - Registro de imagens
- **Cloud Functions** - Serverless
- **Cloud Pub/Sub** - Mensageria

## 📦 Estrutura do Projeto

```
├── api/
│   └── index.js          # API principal
├── bigquery/
│   ├── CriarDataset.js   # Criação de datasets
│   ├── criarTabela.js    # Criação de tabelas
│   ├── inserir.js        # Inserção de dados
│   └── pesquisar.js      # Consultas
├── funcoes/
│   ├── insereAtividade.js
│   ├── pubsub.js
│   └── recebeAtividade.js
├── Dockerfile            # Configuração do container
├── deployment.yaml       # Manifesto Kubernetes
├── package.json         # Dependências Node.js
└── serverless.yml       # Configuração Serverless
```

## 🚀 Deploy no Google Cloud

### 1. Pré-requisitos

```bash
# Instalar dependências
npm install

# Autenticar no Google Cloud
gcloud auth login

# Configurar projeto
gcloud config set project projeto_id
```

### 2. Build e Push da Imagem

```bash
# Build da imagem Docker
docker build -t us-central1-docker.pkg.dev/projeto_id/forum-alura/forum-alura:latest .

# Push para o Artifact Registry
docker push us-central1-docker.pkg.dev/projeto_id/forum-alura/forum-alura:latest
```

### 3. Deploy no Kubernetes

```bash
# Conectar ao cluster GKE
gcloud container clusters get-credentials forum --zone us-central1-a --project projeto_id

# Criar secrets para credenciais
kubectl create secret generic segredos-api \
  --from-literal=USUARIO=forum-alura \
  --from-literal=SENHA=minhasenhasecreta

# Criar secret para chave do Google Cloud
kubectl create secret generic gcp-key --from-file=key.json=sua-chave.json

# Aplicar deployment
kubectl apply -f deployment.yaml

# Verificar pods
kubectl get pods
```

### 4. Comandos Úteis

```bash
# Ver logs da aplicação
kubectl logs -f -l app=forum-alura

# Verificar status do deployment
kubectl get deployments

# Listar services
kubectl get services

# Verificar secrets
kubectl get secrets
```

## 🔧 Configuração do BigQuery

```bash
# Criar dataset
node bigquery/CriarDataset.js

# Criar tabela
node bigquery/criarTabela.js
```

## 🔐 Autenticação

A aplicação usa Service Account para acessar o BigQuery:

- Service Account: `nome_serv_accountt@projeto_id.iam.gserviceaccount.com`
- Roles necessárias: `bigquery.admin`

## 🐳 Docker

```bash
# Build local
docker build -t forum-alura:latest .

# Executar localmente
docker run --rm --name api -p 3000:3000 forum-alura:latest
```

## ☁️ Serverless (Cloud Functions)

```bash
# Deploy serverless
serverless deploy --region us-central1
```

## 📊 Monitoramento

- Logs: `kubectl logs -f -l app=forum-alura`
- Métricas: Google Cloud Console → Kubernetes Engine
- BigQuery: Google Cloud Console → BigQuery

## 🔍 Troubleshooting

### Erro de permissão BigQuery

```bash
# Verificar roles da service account
gcloud projects get-iam-policy projeto_id \
    --flatten="bindings[].members" \
    --filter="bindings.members:nome_serv_accountt@projeto_id.iam.gserviceaccount.com"
```

### Pods não startando

```bash
# Debug do pod
kubectl describe pod -l app=forum-alura

# Verificar eventos
kubectl get events --sort-by='.lastTimestamp'
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
