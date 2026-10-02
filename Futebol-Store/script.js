alert("Feito por: Lucas Pietro Carvalho de Oliveira")

const catalogoProdutos = [
    {
        name: "Camisa Brasil 2026",
        description: "Camisa inspirada na seleção brasileira para os apaixonados por futebol.",
        price: 349.90,
        category: "Camisas",
        image: "imagens/camisa-brasil.svg"
    },
    {
        name: "Chuteira Mercurial",
        description: "Chuteira leve para jogadores que gostam de velocidade e precisão.",
        price: 599.90,
        category: "Chuteiras",
        image: "imagens/chuteira.svg"
    },
    {
        name: "Bola de Futebol Profissional",
        description: "Bola resistente para treinos e partidas de futebol.",
        price: 299.90,
        category: "Bolas",
        image: "imagens/bola.svg"
    },
    {
        name: "Luva de Goleiro Pro",
        description: "Luva com excelente aderência para ajudar o goleiro durante as defesas.",
        price: 189.90,
        category: "Goleiro",
        image: "imagens/luva.svg"
    },
    {
        name: "Meião Esportivo",
        description: "Meião confortável para completar seu uniforme de futebol.",
        price: 49.90,
        category: "Acessórios",
        image: "imagens/meiao.svg"
    },
    {
        name: "Camisa Futebol Retrô",
        description: "Camisa com estilo retrô para quem gosta de futebol clássico.",
        price: 219.90,
        category: "Camisas",
        image: "imagens/camisa-retro.svg"
    },
    {
        name: "Shorts Futebol Pro",
        description: "Shorts leve e confortável para treinos e partidas.",
        price: 99.90,
        category: "Roupas",
        image: "imagens/shorts.svg"
    },
    {
        name: "Mochila Esportiva",
        description: "Mochila espaçosa para transportar chuteiras, uniforme e acessórios.",
        price: 159.90,
        category: "Acessórios",
        image: "imagens/mochila.svg"
    }
];

const divCatalogo = document.getElementById("div-catalogo");
const formBusca = document.getElementById("form-busca");

function removeAccents(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function mostrarCatalogoProdutos(event) {
    event.preventDefault();

    const filtro = removeAccents(
        document.getElementById("filtro").value.trim().toLowerCase()
    );

    let produtosFiltrados = catalogoProdutos;

    if (filtro !== "") {
        produtosFiltrados = catalogoProdutos.filter((produto) => {
            const nome = removeAccents(produto.name.toLowerCase());
            const descricao = removeAccents(produto.description.toLowerCase());
            const categoria = removeAccents(produto.category.toLowerCase());

            return nome.includes(filtro) ||
                   descricao.includes(filtro) ||
                   categoria.includes(filtro);
        });
    }

    renderizarProdutos(produtosFiltrados);
}

function renderizarProdutos(produtos) {
    divCatalogo.innerHTML = "";

    if (produtos.length === 0) {
        divCatalogo.innerHTML = `
            <p class="filtro-erro">
                ⚽ Nenhum produto encontrado.
            </p>
        `;
        return;
    }

    produtos.forEach((produto) => {
        const divCard = document.createElement("div");
        divCard.classList.add("div-card");

        const imagem = document.createElement("img");
        imagem.src = produto.image;
        imagem.alt = produto.name;
        imagem.classList.add("img-produto");

        const divConteudo = document.createElement("div");
        divConteudo.classList.add("card-conteudo");

        const h3 = document.createElement("h3");
        h3.textContent = produto.name;

        const pDescricao = document.createElement("p");
        pDescricao.textContent = produto.description;
        pDescricao.classList.add("p-descricao");

        const spanCategoria = document.createElement("span");
        spanCategoria.textContent = produto.category;
        spanCategoria.classList.add("span-categoria");

        const spanPreco = document.createElement("span");
        spanPreco.textContent = `R$ ${produto.price.toFixed(2).replace(".", ",")}`;
        spanPreco.classList.add("span-preco");

        divConteudo.appendChild(h3);
        divConteudo.appendChild(pDescricao);
        divConteudo.appendChild(spanCategoria);
        divConteudo.appendChild(spanPreco);

        divCard.appendChild(imagem);
        divCard.appendChild(divConteudo);

        divCatalogo.appendChild(divCard);
    });
}

formBusca.addEventListener("submit", mostrarCatalogoProdutos);

renderizarProdutos(catalogoProdutos);
