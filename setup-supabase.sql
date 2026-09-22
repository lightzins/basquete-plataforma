-- ====================================
-- BasketScore Pro - Setup Supabase
-- ====================================

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

-- Inserir os 8 jogadores
INSERT INTO jogadores (nome, vitorias, pontos) VALUES
('Enzo', 0, 0),
('Mateus', 0, 0),
('Thiago', 0, 0),
('Lucas', 0, 0),
('Miguel', 0, 0),
('Lorenzo', 0, 0),
('Gabriel', 0, 0),
('Vinicius', 0, 0);

-- Habilitar Row Level Security (opcional)
ALTER TABLE jogadores ENABLE ROW LEVEL SECURITY;
ALTER TABLE sorteios ENABLE ROW LEVEL SECURITY;

-- Políticas para permitir acesso público
CREATE POLICY "jogadores_select" ON jogadores FOR SELECT USING (true);
CREATE POLICY "jogadores_update" ON jogadores FOR UPDATE USING (true);

CREATE POLICY "sorteios_select" ON sorteios FOR SELECT USING (true);
CREATE POLICY "sorteios_insert" ON sorteios FOR INSERT WITH CHECK (true);

-- ====================================
-- Instruções:
-- 1. Vá para https://supabase.com
-- 2. Dashboard → SQL Editor
-- 3. New Query
-- 4. Cole este script completo
-- 5. Clique em "Run"
-- ====================================
