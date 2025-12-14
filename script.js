// ============================== // QUIZ CEREBRAL 2 - script.js (AJUSTADO 100%) // ==============================

let currentQuestion = 0; let waiting = false; let outsideExpected = false; let waitTimeout = null;

const questions = [ { q: "Qual número vem depois de 9?", a: ["10", "9", "11", "Nenhum"], c: 0 }, { q: "Qual palavra NÃO existe?", a: ["Mesa", "Cadeira", "Porta", "Nenhuma"], c: 3 }, { q: "Qual opção está mais à direita?", a: ["A", "B", "C", "A que você não vê"], c: 3 }, { q: "Quantos segundos tem meia hora?", a: ["1800", "3600", "30", "Nenhum"], c: 0 },

// esperar sem clicar { q: "Espere sem clicar", wait: 3000 },

{ q: "Qual número é maior?", a: ["-2", "-1", "0", "1"], c: 3 },

// clique fora { q: "Clique fora dos botões", outside: true },

{ q: "Qual dessas palavras está errada?", a: ["Errrado", "Certo", "Normal", "Ok"], c: 0 }, { q: "Quanto é 8 × 7?", a: ["54", "56", "64", "49"], c: 1 }, { q: "Qual alternativa NÃO deve ser clicada?", a: ["Essa", "Aquela", "Nenhuma", "Todas"], c: 2 },

{ q: "Quantas letras tem a palavra CEREBRO?", a: ["5", "6", "7", "8"], c: 2 }, { q: "Qual número não é par nem ímpar?", a: ["0", "1", "2", "Nenhum"], c: 3 }, { q: "Essa pergunta é fácil. Escolha a difícil.", a: ["Fácil", "Fácil", "Difícil", "Fácil"], c: 2 },

// não clicar { q: "Não clique em nada", wait: 4000 },

{ q: "Qual opção está fora do padrão?", a: ["A", "AA", "AAA", "B"], c: 3 }, { q: "Qual resposta responde a pergunta?", a: ["Essa", "Aquela", "Nenhuma", "Todas"], c: 0 }, { q: "Essa é a pergunta número…", a: ["17", "Dezessete", "Ambas", "Nenhuma"], c: 2 }, { q: "Quanto é 12 ÷ 3 × 2?", a: ["8", "6", "4", "2"], c: 0 }, { q: "Clique na alternativa que não existe", a: ["A", "B", "C", "—"], c: 3 },

{ q: "Prepare-se.", a: ["Ok", "Não", "Talvez", "…"], c: 0 }, { q: "Qual número é menor?", a: ["-10", "-5", "0", "1"], c: 0 }, { q: "Qual dessas não é resposta?", a: ["Sim", "Não", "Talvez", "Pergunta"], c: 3 }, { q: "Quantos lados tem um círculo?", a: ["0", "1", "2", "Infinito"], c: 0 }, { q: "Qual alternativa não é alternativa?", a: ["A", "B", "C", "Nenhuma"], c: 3 },

// última troll antes do final { q: "Não clique ainda", wait: 2000 },

// QUESTÃO 30 FINAL { q: "Resolva: (6² − 12) × 2 + √81 + 18 ÷ 3", a: ["60", "66", "72", "78"], wait: 3000 } ];

function startGame() { currentQuestion = 0; showScreen('game'); showQuestion(); }

function showQuestion() { clearTimeout(waitTimeout); waiting = false; outsideExpected = false;

const q = questions[currentQuestion]; const answersDiv = document.getElementById('answers');

document.getElementById('questionNumber').innerText = Pergunta ${currentQuestion + 1}/30; document.getElementById('questionText').innerText = q.q; answersDiv.innerHTML = '';

// esperar sem clicar if (q.wait) { waiting = true; waitTimeout = setTimeout(() => { waiting = false; nextQuestion(); }, q.wait); return; }

// clique fora if (q.outside) { outsideExpected = true; return; }

// perguntas normais q.a.forEach((text, index) => { const btn = document.createElement('button'); btn.className = 'btn-blue'; btn.innerText = text; btn.onclick = () => checkAnswer(index, q.c); answersDiv.appendChild(btn); }); }

// detectar clique fora dos botões window.addEventListener('click', (e) => { if (outsideExpected) { if (!e.target.classList.contains('btn-blue')) { outsideExpected = false; nextQuestion(); } } else if (waiting) { // clicou quando não podia gameOver(); } });

function checkAnswer(index, correct) { if (waiting) return gameOver(); if (index === correct) nextQuestion(); else gameOver(); }

function nextQuestion() { currentQuestion++; if (currentQuestion >= 30) showScreen('final'); else showQuestion(); }

function gameOver() { clearTimeout(waitTimeout); showScreen('gameOver'); }

function resetGame() { clearTimeout(waitTimeout); showScreen('menu'); }

function showScreen(id) { document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); document.getElementById(id).classList.add('active'); }
