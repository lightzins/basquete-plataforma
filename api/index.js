import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

let jogadores = [];
let sorteios = [];
let nextJogadorId = 1;

function inicializarJogadores() {
    if (jogadores.length === 0) {
        const nomes = ['Enzo', 'Mateus', 'Thiago', 'Lucas', 'Miguel', 'Lorenzo', 'Gabriel', 'Vinicius'];
        nomes.forEach(nome => {
            jogadores.push({
                id: nextJogadorId++,
                nome,
                vitorias: 0,
                pontos: 0
            });
        });
    }
}

async function carregarJogadoresSupabase() {
    if (!supabase) {
        inicializarJogadores();
        return;
    }

    try {
        const { data } = await supabase.from('jogadores').select('*').order('id', { ascending: true });
        if (data && data.length > 0) {
            jogadores = data;
        } else {
            inicializarJogadores();
        }
    } catch (err) {
        inicializarJogadores();
    }
}

carregarJogadoresSupabase();

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const pathname = url.pathname;

        // GET /api/jogadores
        if (pathname === '/api/jogadores' && req.method === 'GET') {
            if (supabase) {
                const { data } = await supabase.from('jogadores').select('*').order('id', { ascending: true });
                return res.status(200).json(data || jogadores);
            }
            return res.status(200).json(jogadores);
        }

        // PUT /api/jogadores/:id/vitoria
        if (pathname.match(/^\/api\/jogadores\/\d+\/vitoria$/) && req.method === 'PUT') {
            const id = parseInt(pathname.split('/')[3]);
            const { acao } = req.body;

            if (supabase) {
                const { data: jogadorData } = await supabase.from('jogadores').select('*').eq('id', id).single();
                if (!jogadorData) return res.status(404).json({ erro: 'Não encontrado' });

                const novasVitorias = acao === 'add' ? jogadorData.vitorias + 1 : acao === 'remove' && jogadorData.vitorias > 0 ? jogadorData.vitorias - 1 : jogadorData.vitorias;
                const { data: updated } = await supabase.from('jogadores').update({ vitorias: novasVitorias }).eq('id', id).select().single();
                return res.status(200).json(updated);
            } else {
                const jogador = jogadores.find(j => j.id === id);
                if (!jogador) return res.status(404).json({ erro: 'Não encontrado' });
                if (acao === 'add') jogador.vitorias += 1;
                else if (acao === 'remove' && jogador.vitorias > 0) jogador.vitorias -= 1;
                return res.status(200).json(jogador);
            }
        }

        // PUT /api/jogadores/:id/ponto
        if (pathname.match(/^\/api\/jogadores\/\d+\/ponto$/) && req.method === 'PUT') {
            const id = parseInt(pathname.split('/')[3]);
            const { acao } = req.body;

            if (supabase) {
                const { data: jogadorData } = await supabase.from('jogadores').select('*').eq('id', id).single();
                if (!jogadorData) return res.status(404).json({ erro: 'Não encontrado' });

                const novosPontos = acao === 'add' ? jogadorData.pontos + 1 : acao === 'remove' && jogadorData.pontos > 0 ? jogadorData.pontos - 1 : jogadorData.pontos;
                const { data: updated } = await supabase.from('jogadores').update({ pontos: novosPontos }).eq('id', id).select().single();
                return res.status(200).json(updated);
            } else {
                const jogador = jogadores.find(j => j.id === id);
                if (!jogador) return res.status(404).json({ erro: 'Não encontrado' });
                if (acao === 'add') jogador.pontos += 1;
                else if (acao === 'remove' && jogador.pontos > 0) jogador.pontos -= 1;
                return res.status(200).json(jogador);
            }
        }

        // POST /api/jogadores/reset
        if (pathname === '/api/jogadores/reset' && req.method === 'POST') {
            if (supabase) {
                await supabase.from('jogadores').update({ vitorias: 0, pontos: 0 }).neq('id', -1);
                await supabase.from('sorteios').delete().neq('id', -1);
            } else {
                jogadores.forEach(j => { j.vitorias = 0; j.pontos = 0; });
                sorteios = [];
            }
            return res.status(200).json({ mensagem: 'OK' });
        }

        // POST /api/sorteios
        if (pathname === '/api/sorteios' && req.method === 'POST') {
            const { tipo, timeA, timeB, timeC, timeD, reserva } = req.body;

            if (supabase) {
                const { data: ultimo } = await supabase.from('sorteios').select('semana').order('semana', { ascending: false }).limit(1).single();
                const semana = ultimo ? ultimo.semana + 1 : 1;

                const { data } = await supabase.from('sorteios').insert([{
                    semana,
                    tipo,
                    timeA: timeA.map(j => j.nome),
                    timeB: timeB.map(j => j.nome),
                    timeC: timeC ? timeC.map(j => j.nome) : [],
                    timeD: timeD ? timeD.map(j => j.nome) : [],
                    reserva: reserva ? reserva.map(j => j.nome) : []
                }]).select().single();
                return res.status(201).json(data);
            }
            return res.status(201).json({ ok: true });
        }

        // GET /api/sorteios
        if (pathname === '/api/sorteios' && req.method === 'GET') {
            if (supabase) {
                const { data } = await supabase.from('sorteios').select('*').order('criado_em', { ascending: false });
                return res.status(200).json(data || sorteios);
            }
            return res.status(200).json(sorteios);
        }

        // GET /api/health
        if (pathname === '/api/health' && req.method === 'GET') {
            return res.status(200).json({ status: 'ok', supabase: supabase ? 'conectado' : 'desconectado' });
        }

        return res.status(404).json({ erro: 'Rota não encontrada' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ erro: err.message });
    }
}
