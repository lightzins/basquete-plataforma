# Checklist de Deploy - BasketScore Pro

## ☐ Preparação Local

- [ ] Node.js 18+ instalado (`node --version`)
- [ ] Dependências instaladas (`npm install`)
- [ ] App funciona localmente (`npm start` → http://localhost:5000)
- [ ] Todos os 8 jogadores aparecem no ranking
- [ ] Sorteios 3v3 funcionam
- [ ] Sorteios 2v2 funcionam
- [ ] Histórico salva sorteios
- [ ] localStorage funciona (dados persistem ao recarregar)

## ☐ Configurar Supabase

- [ ] Criar conta em [supabase.com](https://supabase.com)
- [ ] Criar novo projeto
- [ ] Copiar `Project URL`
- [ ] Copiar `Project API Key` (anon key)
- [ ] Executar SQL para criar tabelas (veja DEPLOY.md)
- [ ] Inserir 8 jogadores padrão
- [ ] Testar conectando localmente

### Credenciais Supabase:
```
URL: ___________________________________
API Key: ______________________________
```

## ☐ Configurar Variáveis de Ambiente

### .env local:
```
SUPABASE_URL=https://[seu-projeto].supabase.co
SUPABASE_KEY=[sua-chave-api]
PORT=5000
NODE_ENV=development
```

### Vercel (adicionar na dashboard):
- [ ] SUPABASE_URL
- [ ] SUPABASE_KEY
- [ ] NODE_ENV=production

## ☐ GitHub & Git

- [ ] Criar repositório local: `git init`
- [ ] Adicionar arquivos: `git add .`
- [ ] Commit inicial: `git commit -m "Initial commit"`
- [ ] Criar repositório no GitHub
- [ ] Adicionar remote: `git remote add origin ...`
- [ ] Push: `git push -u origin main`

### Verificar:
- [ ] Arquivo .env está em .gitignore (dados sensíveis)
- [ ] Diretório node_modules está em .gitignore
- [ ] Repositório tem todos os arquivos (exceto .env)

## ☐ Deploy Vercel

### Opção A: Web Dashboard (Recomendado)
- [ ] Criar conta em [vercel.com](https://vercel.com)
- [ ] Conectar GitHub
- [ ] Selecionar repositório basketscore-pro
- [ ] Vercel detecta automaticamente como Node.js
- [ ] Adicionar variáveis de ambiente
- [ ] Clicar em Deploy

### Opção B: CLI
- [ ] Instalar: `npm install -g vercel`
- [ ] Login: `vercel login`
- [ ] Deploy: `vercel --prod`

## ☐ Após Deploy

- [ ] Acessar URL do Vercel (ex: https://basketscore-pro.vercel.app)
- [ ] Verificar se frontend carrega
- [ ] Testar /api/health (deve retornar status)
- [ ] Adicionar ponto a um jogador
- [ ] Fazer sorteio e salvar
- [ ] Recarregar página (dados devem persistir)
- [ ] Se algo falhar, verificar logs no Vercel

### URL Implantação:
```
https://_____________________________.vercel.app
```

## ☐ Teste em Produção

### Testes Funcionais:
- [ ] Ranking carrega e mostra os 8 jogadores
- [ ] Adicionar vitória funciona e atualiza pontuação
- [ ] Adicionar ponto funciona e atualiza pontuação
- [ ] Remover vitória/ponto funciona
- [ ] Sorteio 3v3 cria times válidos
- [ ] Sorteio 2v2 cria duplas válidas
- [ ] Salvar sorteio registra no histórico
- [ ] Histórico exibe todos os sorteios salvos
- [ ] Exportar CSV funciona
- [ ] Limpar dados reseta tudo

### Performance:
- [ ] Página carrega em menos de 3s
- [ ] Cliques em botões são responsivos
- [ ] Sem mensagens de erro no console

### Supabase Sync:
- [ ] Se usar Supabase, dados salvos aparecem no dashboard
- [ ] Múltiplas abas sincronizam automaticamente

## ☐ Configurações Opcionais

- [ ] Adicionar domínio customizado no Vercel
- [ ] Configurar Row Level Security no Supabase
- [ ] Adicionar proteção de senha (Vercel)
- [ ] Configurar SSL certificate (automático no Vercel)

## ☐ Manutenção Pós-Deploy

- [ ] Salvar URLs finais em local seguro
- [ ] Documentar credenciais Supabase
- [ ] Monitorar logs no Vercel
- [ ] Testar regularmente funcionalidades críticas

## 🎉 Pronto!

Se todos os itens estão marcados, seu BasketScore Pro está **LIVE** e funcionando!

### Compartilhe:
- URL: `https://seu-dominio.vercel.app`
- Nenhuma autenticação necessária
- Funciona em qualquer navegador/dispositivo

---

**Última atualização:** 22 de Setembro de 2026
**Versão:** 1.0.0
