# 🚀 INICIAR AGORA - Guia em 3 Passos

## ⚡ Opção 1: Deploy Rápido (Recomendado - 30 minutos)

### Passo 1: Criar Supabase
```
1. Ir para https://supabase.com
2. New Project
3. No SQL Editor, copiar e colar (do DEPLOY.md):
   - CREATE TABLE jogadores...
   - CREATE TABLE sorteios...
   - INSERT INTO jogadores...
4. Copiar URL e API Key → salvar em local seguro
```

### Passo 2: GitHub Push
```bash
cd "/home/enzo/Documents/projeto de basquete"
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/SEU-USUARIO/basketscore-pro.git
git push -u origin main
```

### Passo 3: Vercel Deploy
```
1. https://vercel.com
2. New Project
3. Conectar GitHub
4. Selecionar repositório
5. Adicionar environment variables:
   - SUPABASE_URL = (cola aqui)
   - SUPABASE_KEY = (cola aqui)
6. Deploy
7. Pronto! Sua URL está em: https://SEU-PROJETO.vercel.app
```

---

## 🎮 Opção 2: Testar Localmente (Sem Supabase)

```bash
cd "/home/enzo/Documents/projeto de basquete"
npm install
npm start
# Abrir http://localhost:5000
# Funciona com localStorage (dados locais)
```

---

## 📚 Documentação Completa

- **README.md** - Guia geral
- **DEPLOY.md** - Deploy detalhado com SQL
- **CHECKLIST.md** - Lista de verificação
- **tabela_pontuacao.html** - Versão HTML pura (offline)

---

## 🎯 Arquivos Importantes

| Arquivo | Função |
|---------|--------|
| `server.js` | Backend (cria a API) |
| `public/index.html` | Frontend (interface visual) |
| `package.json` | Dependências Node.js |
| `.env` | Variáveis secretas (Supabase URL/KEY) |
| `vercel.json` | Config de deploy |

---

## ❓ Dúvidas Rápidas

### P: Qual é a URL para acessar?
**R:** Após deploy Vercel: `https://seu-projeto.vercel.app`

### P: Os dados salvam?
**R:** Sim! Com Supabase salvam na nuvem. Localmente em localStorage.

### P: Preciso de senha?
**R:** Não. É público. Adicione proteção no Vercel se quiser.

### P: Qual é o custo?
**R:** Grátis! (Vercel + Supabase)

### P: Funciona no celular?
**R:** Sim! Totalmente responsivo.

---

## 🔗 Links Úteis

- [Supabase](https://supabase.com)
- [Vercel](https://vercel.com)
- [GitHub](https://github.com)
- [Node.js](https://nodejs.org)

---

## ✅ Checklist Mínimo

- [ ] Supabase criado e tabelas criadas
- [ ] Credenciais em .env
- [ ] Git push para GitHub
- [ ] Vercel apontando para GitHub
- [ ] Variáveis de ambiente adicionadas no Vercel
- [ ] Deploy concluído
- [ ] URL do Vercel funciona

**Pronto? Comece pelo Passo 1! 🎉**

---

*Para instruções detalhadas, veja DEPLOY.md*
