# BasketScore Pro

Sistema de gerenciamento de time de basquete com ranking, sorteio de times e histórico semanal.

## Funcionalidades

- ✅ **Ranking de Jogadores** - Classificação em tempo real
- ✅ **Sorteio 3v3** - Gera dois times de 3 jogadores + reservas
- ✅ **Sorteio 2v2** - Gera quatro duplas
- ✅ **Histórico Semanal** - Registra os sorteios
- ✅ **Suporte a Supabase** - Banco de dados em nuvem
- ✅ **Deploy Vercel** - Hospedagem gratuita
- ✅ **Fallback Local** - Funciona sem conexão com banco

## Stack Tecnológico

- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **Backend**: Node.js + Express
- **Banco de Dados**: Supabase (PostgreSQL)
- **Hospedagem**: Vercel
- **Persistência Local**: localStorage

## Instalação Local

### Requisitos
- Node.js 18+
- npm ou yarn

### Passo 1: Clone o repositório

```bash
cd "/home/enzo/Documents/projeto de basquete"
```

### Passo 2: Instale as dependências

```bash
npm install
```

### Passo 3: Configure o Supabase (Opcional)

Se você não tiver Supabase configurado, o app funcionará localmente com localStorage.

Para usar Supabase:

1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Execute no SQL Editor:

```sql
-- Jogadores
CREATE TABLE jogadores (
  id BIGSERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  vitorias INTEGER DEFAULT 0,
  pontos INTEGER DEFAULT 0,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sorteios
CREATE TABLE sorteios (
  id BIGSERIAL PRIMARY KEY,
  semana INTEGER NOT NULL,
  tipo TEXT NOT NULL,
  timeA TEXT[] DEFAULT ARRAY[]::TEXT[],
  timeB TEXT[] DEFAULT ARRAY[]::TEXT[],
  timeC TEXT[] DEFAULT ARRAY[]::TEXT[],
  timeD TEXT[] DEFAULT ARRAY[]::TEXT[],
  reserva TEXT[] DEFAULT ARRAY[]::TEXT[],
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir jogadores
INSERT INTO jogadores (nome) VALUES
('Enzo'), ('Mateus'), ('Thiago'), ('Lucas'),
('Miguel'), ('Lorenzo'), ('Gabriel'), ('Vinicius');
```

4. Crie o arquivo `.env`:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave-api
PORT=5000
NODE_ENV=development
```

5. Obtenha as credenciais em Settings → API

### Passo 4: Execute localmente

```bash
npm start
```

Acesse: [http://localhost:5000](http://localhost:5000)

## Deploy no Vercel

### Pré-requisitos
- Conta GitHub
- Conta Vercel (grátis)
- Supabase configurado (opcional)

### Instruções

1. **Inicie um repositório Git**

```bash
git init
git add .
git commit -m "Initial commit"
```

2. **Faça push para GitHub**

```bash
git remote add origin https://github.com/seu-usuario/basketscore-pro.git
git branch -M main
git push -u origin main
```

3. **Deploy no Vercel**

#### Opção A: Interface Web (Mais fácil)

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Conecte seu GitHub
4. Selecione o repositório
5. Configure as variáveis de ambiente:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `NODE_ENV=production`
6. Clique em "Deploy"

#### Opção B: CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Após o Deploy

Sua aplicação estará disponível em:
```
https://seu-projeto.vercel.app
```

## Como Usar

### Ranking
1. Abra a aba "Ranking"
2. Use os botões para adicionar/remover vitórias e pontos
3. Sistema de pontuação: **Vitória = 10 pontos | Ponto = 1 ponto**

### Sorteio 3v3
1. Clique em "Sorteio de Times"
2. Clique em "Sortear Times"
3. Veja os times sugeridos
4. Clique em "Salvar Sorteio" para registrar

### Sorteio 2v2
1. Clique em "Sortear Duplas"
2. As 4 duplas serão geradas
3. Clique em "Salvar Sorteio"

### Histórico
1. Vá para "Histórico"
2. Veja todos os sorteios salvos com datas

## Endpoints da API

```
GET    /api/jogadores              - Lista jogadores
PUT    /api/jogadores/:id/vitoria  - Adiciona/remove vitória
PUT    /api/jogadores/:id/ponto    - Adiciona/remove ponto
POST   /api/jogadores/reset        - Reseta todos os dados
GET    /api/sorteios               - Lista sorteios
POST   /api/sorteios               - Cria novo sorteio
GET    /api/health                 - Status do servidor
```

## Troubleshooting

### "Não consigo conectar ao Supabase"
- Verifique as variáveis de ambiente
- Certifique-se que as tabelas foram criadas
- Teste com: `curl https://seu-projeto.vercel.app/api/health`

### "Os dados não salvam"
- Se o Supabase não estiver configurado, os dados são salvos localmente
- Limpe o localStorage para resetar

### "CORS Error"
- A configuração CORS já está habilitada
- Se o erro persistir, adicione seu domínio no Supabase

## Estrutura do Projeto

```
projeto de basquete/
├── public/
│   └── index.html           # Frontend
├── server.js                # Backend
├── package.json             # Dependências
├── .env                      # Variáveis de ambiente
├── .gitignore               # Git ignore
├── vercel.json              # Config Vercel
├── DEPLOY.md                # Guia de deploy detalhado
└── README.md                # Este arquivo
```

## Desenvolvimento

### Modo desenvolvimento com hot reload

```bash
npm install -g nodemon
nodemon server.js
```

### Usar localStorage (sem Supabase)

Os dados são automaticamente salvos no navegador. Sem variáveis de ambiente configuradas, o app funciona localmente.

## Segurança

- Sem autenticação (público)
- Sem senha (torne privado com Vercel)
- Row Level Security opcional no Supabase

Para tornar privado:
1. Vá para Settings no Vercel
2. Adicione proteção por senha

## Contribuindo

Sinta-se livre para fazer fork e enviar pull requests.

## Licença

MIT

## Suporte

Para dúvidas ou problemas:
1. Verifique o DEPLOY.md
2. Consulte os logs no Vercel
3. Teste localmente primeiro

---

**Desenvolvido com ❤️ para gerenciar times de basquete**
