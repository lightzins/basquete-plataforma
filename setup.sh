#!/bin/bash

echo "================================"
echo "BasketScore Pro - Setup"
echo "================================"
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado"
    echo "   Instale em: https://nodejs.org"
    exit 1
fi

echo "✓ Node.js encontrado: $(node --version)"
echo ""

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

if [ $? -eq 0 ]; then
    echo "✓ Dependências instaladas com sucesso"
else
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

echo ""
echo "================================"
echo "Próximos passos:"
echo "================================"
echo ""
echo "1. Configure suas variáveis de ambiente:"
echo "   - Edite o arquivo .env"
echo "   - Adicione SUPABASE_URL e SUPABASE_KEY"
echo ""
echo "2. Para rodar localmente:"
echo "   npm start"
echo ""
echo "3. Para deploy no Vercel:"
echo "   - Git: git init && git add . && git commit -m 'Initial commit'"
echo "   - GitHub: git remote add origin <seu-repo>"
echo "   - Vercel: npm i -g vercel && vercel --prod"
echo ""
echo "✓ Setup concluído!"
