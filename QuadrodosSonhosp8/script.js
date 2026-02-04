const formulario = document.getElementById('dreamform');
const inputImagem = document.getElementById('imageUrl');
const inputTitulo = document.getElementById('dreamtitle');
const gridSonhos = document.getElementById('dreams-grid');
const estadoVazio = document.getElementById('empty-stage');

let sonhos = [];

// SUBMIT
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const urlImagem = inputImagem.value;
    const titulo = inputTitulo.value;

    adicionarSonho(urlImagem, titulo);
    formulario.reset();
});

// CRIAR SONHO
function adicionarSonho(urlImagem, titulo) {
    sonhos = carregarSonhos();

    const novoSonho = {
        id: crypto.randomUUID(),
        titulo,
        urlImagem,
        status: 'sonho'
    };

    sonhos.push(novoSonho);
    salvarSonhos(sonhos);
    renderizarSonho();
}

// RENDERIZAÇÃO
function renderizarSonho() {
    sonhos = carregarSonhos();
    gridSonhos.innerHTML = '';

    if (sonhos.length === 0) {
        estadoVazio.classList.remove('hidden');
        gridSonhos.classList.add('hidden');
    } else {
        estadoVazio.classList.add('hidden');
        gridSonhos.classList.remove('hidden');

        sonhos.forEach((sonho) => {
            const card = criarCardSonho(sonho);
            gridSonhos.appendChild(card);
        });
    }
}

// CARD
function criarCardSonho(sonho) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="image-card">
            <img src="${sonho.urlImagem}" alt="${sonho.titulo}">
        </div>
        <div class="card-conteudo">
            <h3>${sonho.titulo}</h3>
        </div>
    `;
    return card;
}

// LOCAL STORAGE
function salvarSonhos(sonhos) {
    localStorage.setItem('meus-sonhos', JSON.stringify(sonhos));
}

function carregarSonhos() {
    const dados = localStorage.getItem('meus-sonhos');
    return dados ? JSON.parse(dados) : [];
}

// INICIALIZA
renderizarSonho();
