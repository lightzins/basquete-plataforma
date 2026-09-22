# Guia de Deploy - BasketScore Pro

## Preparação Local

### 1. Instale as dependências
```bash
npm install
```

### 2. Configure o Supabase

#### Criar uma conta Supabase
1. Acesse [https://supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Faça login com GitHub ou Google
4. Crie um novo projeto

#### Criar as tabelas no Supabase

No Dashboard do Supabase, vá para SQL Editor e execute:

```sql
-- Criar tabela de jogadores
CREATE TABLE jogadores (
  id BIGSERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  vitorias INTEGER DEFAULT 0,
  pontos INTEGER DEFAULT 0,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de sorteios
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

-- Inserir jogadores padrão
INSERT INTO jogadores (nome) VALUES
('Enzo'),
('Mateus'),
('Thiago'),
('Lucas'),
('Miguel'),
('Lorenzo'),
('Gabriel'),
('Vinicius');
```

#### Obter as credenciais Supabase

1. No Dashboard do Supabase, clique em "Settings" (engrenagem)
2. Vá para "API"
3. Copie:
   - **Project URL** → Use como `SUPABASE_URL`
   - **Project API Key** → Use como `SUPABASE_KEY`

### 3. Configure o arquivo .env

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=seu-api-key-aqui
PORT=5000
NODE_ENV=production
```

### 4. Teste localmente

```bash
npm start
```

Acesse: http://localhost:5000

---

## Deploy no Vercel

### 1. Prepare o repositório Git

```bash
git init
git add .
git commit -m "Initial commit"
```

### 2. Faça push para GitHub

```bash
git remote add origin https://github.com/seu-usuario/basketscore-pro.git
git branch -M main
git push -u origin main
```

### 3. Deploy no Vercel

#### Opção A: Via Dashboard

1. Acesse [https://vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Selecione seu repositório do GitHub
4. Configure as variáveis de ambiente:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `NODE_ENV=production`
5. Clique em "Deploy"

#### Opção B: Via CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

### 4. Adicione variáveis de ambiente no Vercel

No dashboard do Vercel:
1. Vá para Settings → Environment Variables
2. Adicione:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `NODE_ENV=production`
3. Redeploy o projeto

---

## Configurar Row Level Security (Opcional - Segurança)

No Supabase, vá para "Authentication" → "Policies" e configure:

```sql
-- Permitir leitura pública
ALTER TABLE jogadores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "jogadores_select" ON jogadores FOR SELECT USING (true);
CREATE POLICY "jogadores_update" ON jogadores FOR UPDATE USING (true);

ALTER TABLE sorteios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sorteios_select" ON sorteios FOR SELECT USING (true);
CREATE POLICY "sorteios_insert" ON sorteios FOR INSERT WITH CHECK (true);
```

---

## URLs Finais

Após o deploy:
- **Frontend**: `https://seu-projeto.vercel.app`
- **API**: `https://seu-projeto.vercel.app/api`

---

## Troubleshooting

### Erro: "Cannot connect to Supabase"
- Verifique se as variáveis de ambiente estão corretas
- Certifique-se que as tabelas foram criadas
- Teste com `/api/health`

### Erro: "CORS"
- As configurações CORS já estão habilitadas
- Se persistir, adicione no Supabase → Authentication → URL Configuration

### Dados não salvam
- Confirme que o Supabase está conectado
- Verifique os logs no Vercel
- Teste a conexão: `curl https://seu-projeto.vercel.app/api/health`

---

## Estrutura do Projeto

```
projeto de basquete/
├── public/
│   └── index.html           # Frontend (React-like)
├── server.js                # Backend com Supabase
├── package.json
├── .env                      # Variáveis de ambiente
├── vercel.json              # Configuração Vercel
└── DEPLOY.md               # Este arquivo
```
