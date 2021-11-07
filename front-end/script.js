
const lista = document.getElementById('lista')
const apiUrl = 'http://localhost:3000/filmes';
let edicao = false;
let idEdicao = 0;
let imagem = document.getElementById('imagem');
let nome = document.getElementById('nome');
let genero = document.getElementById('genero');
let ano = document.getElementById('ano');
let diretor = document.getElementById('diretor');
let nota = document.getElementById('nota');
let assistido = document.getElementById('assistido');


//[GET]
const getFilmes = async () => {
    // FETCH API api do javascript responsavel por fazer comunicacao entre requicoes http.
    // faz uma requisicao [GET] para o backend na url http://localhost:3000/filmes
    const response = await fetch(apiUrl)
    // é a lista de objetos filmes (array de objetos)
    const filmes = await response.json();

    console.log(filmes);

    // a gente pega o resultado da api(um array de objetos com os filmes) e itera essa lista com o map
    // algo parecido com um for.
    filmes.map((filme) => {
        lista.insertAdjacentHTML('beforeend', `
        <div class="col">
            <div class="card">
            <img src="${filme.imagem}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${filme.nome} - ${filme.ano}</h5>
                <span class="badge bg-primary">${filme.genero}</span>
                <p class="card-text">Dirigido por ${filme.diretor}</p>
                <p class="card-text">Nota ${filme.nota}</p>
                <p class="card-text">Já assitido? ${filme.assistido}</p>
                <div>
                    <button class="btn btn-primary" onclick="editFilme('${filme.id}')">Editar</button>
                    <button class="btn btn-danger" onclick="deleteFilme('${filme.id}')">Excluir</button>
                </div>
            </div>
            </div>
        </div>
        `)
    })
}

// [POST] envia uma file para o backend para ser cadastrada

const submitForm = async (event) => {
    // previnir que o navegador atualiza a pagina por causa o evento de submit
    event.preventDefault();

    // Estamos construindo um objeto com os valores que estamos pegando no input.
    const filme = {
        imagem: imagem.value,
        nome: nome.value,
        ano: ano.value,
        genero: genero.value,
        diretor: diretor.value,
        nota: nota.value,
        assistido: assistido.value
    }
    // é o objeto preenchido com os valores digitados no input

    if(edicao) {
        putFilme(filme, idEdicao);
    } else {
        createFilme(filme);
    }

    clearFields();
    lista.innerHTML = '';
}

const createFilme = async(filme) => {
    // estou construindo a requisicao para ser enviada para o backend.
    const request = new Request(`${apiUrl}/add`, {
        method: 'POST',
        body: JSON.stringify(filme),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    // chamamos a funcao fetch de acordo com as nossa configuracaoes de requisicao.
    const response = await fetch(request);
    const result = await response.json();
    // pego o objeto que vem do backend e exibo a msg de sucesso em um alerta.
    alert(result.message)
    // filme cadastrada com sucesso.
    getFilmes();

}

const putFilme = async(filme, id) => {
    // estou construindo a requisicao para ser enviada para o backend.
    const request = new Request(`${apiUrl}/edit/${id}`, {
        method:  'PUT',
        body: JSON.stringify(filme),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })

    // chamamos a funcao fetch de acordo com as nossa configuracaoes de requisicao.
    const response = await fetch(request);

    const result = await response.json();
    // pego o objeto que vem do backend e exibo a msg de sucesso em um alerta.
    alert(result.message)
    edicao = false;
    idEdicao = 0;
    getFilmes();
}


// [DELETE] funcao que exclui um filme de acordo com o seu id
const deleteFilme = async (id) => {
    // construir a requiscao de delete
    const request = new Request(`${apiUrl}/delete/${id}`, {
        method: 'DELETE'
    })

    const response = await fetch(request);
    const result = await response.json();

    alert(result.message);
    
    lista.innerHTML = '';
    getFilmes();
}


// [GET] /filme/{id} - funcao onde recebe um id via paramtero envia uma requisicao para o backend
// e retorna o filme de acordo com esse id.
const getFilmeById = async (id) => {
    const response = await fetch(`${apiUrl}/${id}`);
    return await response.json();
}


// ao clicar no botao editar
// ela vai preencher os campos dos inputs
// para montar o objeto para ser editado
const editFilme = async (id) => {
    // habilitando o modo de edicao e enviando o id para variavel global de edicao.
    edicao = true;
    idEdicao = id;

    //precismo buscar a informacao da filme por id para popular os campos
    // salva os dados da filme que vamos editar na variavel filme.
    const filme = await getFilmeById(id);

    //preencher os campos de acordo com a filme que vamos editar.
    imagem.value = filme.imagem;
    nome.value = filme.nome;
    ano.value = filme.ano;
    genero.value = filme.genero;
    diretor.value = filme.diretor;
    nota.value = filme.nota;
    assistido.value = filme.assistido;
}


const clearFields = () => {
    ''
    imagem.value = '';
    nome.value = '';
    ano.value = '';
    genero.value = '';
    diretor.value = '';
    nota.value = '';
    assistido.value = '';
}

getFilmes();