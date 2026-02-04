document.addEventListener('DOMContentLoaded', () => {
    // Lista de artistas com base nas imagens extraídas
    const artistData = [
        { name: 'Gustavo Lima', image: './img/Gustavo Lima.png' },
        { name: 'Henrique e Juliano', image: './img/Henrique e Juliano.png' },
        { name: 'Jorge e Mateus', image: './img/Jorge e Mateus.png' },
        { name: 'Luan Santana', image: './img/luansantana.png' },
        { name: 'Matheus e Kauan', image: './img/Matheus e Kauan.png' },
        { name: 'Zé Neto e Cristiano', image: './img/Zé Neto e Cristiano.png' }
    ];

    // Seleciona o elemento onde os cards dos artistas serão inseridos
    // O usuário deve garantir que exista um elemento com a classe 'artist-grid' no HTML
    const artistsGrid = document.querySelector('.artists-grid');

    // Verifica se o elemento 'artist-grid' existe antes de tentar manipulá-lo
    if (artistsGrid) {
        artistData.forEach(artist => {
            // Cria o elemento div para o card do artista
            const artistCard = document.createElement('div');
            artistCard.classList.add('artistCard');

            // Define o conteúdo HTML do card
            artistCard.innerHTML = `
                <img src="${artist.image}" alt="Imagem do ${artist.name}">
                <h3>${artist.name}</h3>
                <p>Artista</p>
            `;

            // Adiciona o card ao grid
            artistsGrid.appendChild(artistCard);
        });
    } else {
        console.error("Elemento com a classe '.artists-grid' não encontrado no HTML.");
    }

    // Lista de álbuns com base nas imagens extraídas
    const albumData = [
        { name: 'Caju', image: './img/Album caju.png', description: 'Álbum' },
        { name: 'Céu Explica', image: './img/Album ceu explica.png', description: 'Álbum' },
        { name: 'Escândalo', image: './img/Album escandalo.png', description: 'Álbum' },
        { name: 'Hit Me', image: './img/Album hit me.png', description: 'Álbum' },
        { name: 'Racionais', image: './img/Album racionais.png', description: 'Álbum' },
        { name: 'Vida Loka', image: './img/Album vida loka.png', description: 'Álbum' },
        { name: 'White Noise', image: './img/Album white noise.png', description: 'Álbum' }
    ];

    // Seleciona o elemento onde os cards dos álbuns serão inseridos
    const albumsGrid = document.querySelector('.albums-grid');

    // Verifica se o elemento 'albums-grid' existe antes de tentar manipulá-lo
    if (albumsGrid) {
        albumData.forEach(album => {
            // Cria o elemento div para o card do álbum
            const albumCard = document.createElement('div');
            albumCard.classList.add('albumCard'); // Usaremos uma nova classe para álbuns

            // Define o conteúdo HTML do card
            albumCard.innerHTML = `
                <img src="${album.image}" alt="Capa do álbum ${album.name}">
                <h3>${album.name}</h3>
                <p>${album.description}</p>
            `;

            // Adiciona o card ao grid
            albumsGrid.appendChild(albumCard);
        });
    } else {
        console.error("Elemento com a classe '.albums-grid' não encontrado no HTML.");
    }
});
