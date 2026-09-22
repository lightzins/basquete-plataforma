const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
let supabase = null;

if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
}

// Dados em memória (fallback se Supabase não estiver configurado)
let jogadores = [];
let sorteios = [];
let nextJogadorId = 1;
let nextSorteioId = 1;

// Inicializar jogadores
function inicializarJogadores() {
    if (jogadores.length === 0) {
        const nomes = ['Enzo', 'Mateus', 'Thiago', 'Lucas', 'Miguel', 'Lorenzo', 'Gabriel', 'Vinicius'];
        nomes.forEach(nome => {
            jogadores.push({
                id: nextJogadorId++,
                nome,
                vitorias: 0,
                pontos: 0,
                criado_em: new Date()
            });
        });
        console.log('Jogadores inicializados');
    }
}

// Função auxiliar para carregar dados do Supabase
async function carregarJogadoresSupabase() {
    if (!supabase) {
        inicializarJogadores();
        return;
    }

    try {
        const { data, error } = await supabase
            .from('jogadores')
            .select('*')
            .order('id', { ascending: true });

        if (error) {
            console.error('Erro ao carregar jogadores:', error);
            inicializarJogadores();
            return;
        }

        if (data && data.length > 0) {
            jogadores = data;
        } else {
            // Se não há jogadores, criar os padrões
            const nomes = ['Enzo', 'Mateus', 'Thiago', 'Lucas', 'Miguel', 'Lorenzo', 'Gabriel', 'Vinicius'];
            for (const nome of nomes) {
                const { data: novoJogador, error: erroInserção } = await supabase
                    .from('jogadores')
                    .insert([{ nome, vitorias: 0, pontos: 0 }])
                    .select();

                if (!erroInserção && novoJogador) {
                    jogadores.push(novoJogador[0]);
                }
            }
            console.log('Jogadores criados no Supabase');
        }
    } catch (err) {
        console.error('Erro ao conectar Supabase:', err);
        inicializarJogadores();
    }
}

// Rotas de Jogadores
app.get('/api/jogadores', async (req, res) => {
    try {
        if (supabase) {
            const { data, error } = await supabase
                .from('jogadores')
                .select('*')
                .order('id', { ascending: true });

            if (error) throw error;
            return res.json(data || jogadores);
        }
        res.json(jogadores.sort((a, b) => a.id - b.id));
    } catch (err) {
        console.error('Erro:', err);
        res.status(500).json({ erro: err.message });
    }
});

app.put('/api/jogadores/:id/vitoria', async (req, res) => {
    try {
        const { acao } = req.body;
        const id = parseInt(req.params.id);

        let jogador;

        if (supabase) {
            // Buscar jogador
            const { data: jogadorData, error: erroFetch } = await supabase
                .from('jogadores')
                .select('*')
                .eq('id', id)
                .single();

            if (erroFetch) throw erroFetch;
            jogador = jogadorData;

            // Atualizar
            const novasVitorias = acao === 'add' 
                ? jogador.vitorias + 1 
                : acao === 'remove' && jogador.vitorias > 0 
                    ? jogador.vitorias - 1 
                    : jogador.vitorias;

            const { data: updated, error: erroUpdate } = await supabase
                .from('jogadores')
                .update({ vitorias: novasVitorias })
                .eq('id', id)
                .select()
                .single();

            if (erroUpdate) throw erroUpdate;
            return res.json(updated);
        } else {
            // Fallback em memória
            jogador = jogadores.find(j => j.id === id);
            if (!jogador) return res.status(404).json({ erro: 'Jogador não encontrado' });

            if (acao === 'add') {
                jogador.vitorias += 1;
            } else if (acao === 'remove' && jogador.vitorias > 0) {
                jogador.vitorias -= 1;
            }

            return res.json(jogador);
        }
    } catch (err) {
        console.error('Erro:', err);
        res.status(500).json({ erro: err.message });
    }
});

app.put('/api/jogadores/:id/ponto', async (req, res) => {
    try {
        const { acao } = req.body;
        const id = parseInt(req.params.id);

        let jogador;

        if (supabase) {
            const { data: jogadorData, error: erroFetch } = await supabase
                .from('jogadores')
                .select('*')
                .eq('id', id)
                .single();

            if (erroFetch) throw erroFetch;
            jogador = jogadorData;

            const novosPontos = acao === 'add' 
                ? jogador.pontos + 1 
                : acao === 'remove' && jogador.pontos > 0 
                    ? jogador.pontos - 1 
                    : jogador.pontos;

            const { data: updated, error: erroUpdate } = await supabase
                .from('jogadores')
                .update({ pontos: novosPontos })
                .eq('id', id)
                .select()
                .single();

            if (erroUpdate) throw erroUpdate;
            return res.json(updated);
        } else {
            jogador = jogadores.find(j => j.id === id);
            if (!jogador) return res.status(404).json({ erro: 'Jogador não encontrado' });

            if (acao === 'add') {
                jogador.pontos += 1;
            } else if (acao === 'remove' && jogador.pontos > 0) {
                jogador.pontos -= 1;
            }

            return res.json(jogador);
        }
    } catch (err) {
        console.error('Erro:', err);
        res.status(500).json({ erro: err.message });
    }
});

app.post('/api/jogadores/reset', async (req, res) => {
    try {
        if (supabase) {
            const { error } = await supabase
                .from('jogadores')
                .update({ vitorias: 0, pontos: 0 })
                .neq('id', -1);

            if (error) throw error;

            await supabase.from('sorteios').delete().neq('id', -1);

            return res.json({ mensagem: 'Dados resetados com sucesso' });
        } else {
            jogadores.forEach(j => {
                j.vitorias = 0;
                j.pontos = 0;
            });
            sorteios = [];
            return res.json({ mensagem: 'Dados resetados com sucesso' });
        }
    } catch (err) {
        console.error('Erro:', err);
        res.status(500).json({ erro: err.message });
    }
});

// Rotas de Sorteio
app.post('/api/sorteios', async (req, res) => {
    try {
        const { tipo, timeA, timeB, timeC, timeD, reserva } = req.body;

        if (supabase) {
            const ultimoSorteio = await supabase
                .from('sorteios')
                .select('semana')
                .order('semana', { ascending: false })
                .limit(1)
                .single();

            const semana = ultimoSorteio.data ? ultimoSorteio.data.semana + 1 : 1;

            const { data, error } = await supabase
                .from('sorteios')
                .insert([{
                    semana,
                    tipo,
                    timeA: timeA.map(j => j.nome),
                    timeB: timeB.map(j => j.nome),
                    timeC: timeC ? timeC.map(j => j.nome) : [],
                    timeD: timeD ? timeD.map(j => j.nome) : [],
                    reserva: reserva ? reserva.map(j => j.nome) : [],
                    criado_em: new Date()
                }])
                .select()
                .single();

            if (error) throw error;
            return res.status(201).json(data);
        } else {
            const semana = sorteios.length > 0 
                ? Math.max(...sorteios.map(s => s.semana)) + 1 
                : 1;

            const sorteio = {
                id: nextSorteioId++,
                semana,
                tipo,
                timeA: timeA.map(j => j.nome),
                timeB: timeB.map(j => j.nome),
                timeC: timeC ? timeC.map(j => j.nome) : [],
                timeD: timeD ? timeD.map(j => j.nome) : [],
                reserva: reserva ? reserva.map(j => j.nome) : [],
                criado_em: new Date()
            };

            sorteios.push(sorteio);
            return res.status(201).json(sorteio);
        }
    } catch (err) {
        console.error('Erro:', err);
        res.status(500).json({ erro: err.message });
    }
});

app.get('/api/sorteios', async (req, res) => {
    try {
        if (supabase) {
            const { data, error } = await supabase
                .from('sorteios')
                .select('*')
                .order('criado_em', { ascending: false });

            if (error) throw error;
            return res.json(data || sorteios);
        }
        res.json(sorteios.sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em)));
    } catch (err) {
        console.error('Erro:', err);
        res.status(500).json({ erro: err.message });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', supabase: supabase ? 'conectado' : 'desconectado' });
});

// Serve index.html para qualquer rota não tratada (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    await carregarJogadoresSupabase();
});

module.exports = app;
