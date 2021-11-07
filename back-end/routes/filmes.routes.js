const express = require('express');
// inicializar as rotas do express
const router = express.Router();

const filmes = [
    {id: Math.random(),
        imagem:"https://musicimage.xboxlive.com/catalog/video.movie.8D6KGWZL58P8/image?locale=pt-br&purposes=BoxArt&mode=scale&q=90&w=162",
        nome: "O iluminado",
        genero:"Terror",
        ano: "1980",
        diretor: "Stanley Kubrick",
        nota:"8",
        assistido: "sim"
    },
    
    {id: Math.random(),
        imagem:"https://media.fstatic.com/A4eWDHBdYWan2NJGIIBIH1yAMYw=/290x478/smart/media/movies/covers/2015/02/interestelar_t27814.jpg",
        nome: "Interestelar",
        genero:"Ficção cientifica",
        ano: "2014",
        diretor: "Christopher Nolan",
        nota:"10",
        assistido: "sim"
    },
    
    {id: Math.random(),
        imagem:"https://upload.wikimedia.org/wikipedia/pt/6/6d/Kill_Bill_poster.jpg",
        nome: "Kill Bil",
        genero:"Ação",
        ano: "2003",
        diretor: "Quentin Tarantino",
        nota:"10",
        assistido: "sim"
    },
]

// [GET] /filmes - Retorna uma lista de filmes
router.get('/', (req, res) => {
    res.send(filmes);
})

// [GET] /filmes/{id} - Retornar um unico fime por id.
router.get('/:id', (req, res) => {
    const idParam = req.params.id;
    const filme = filmes.find(filme => filme.id == idParam);
    res.send(filme);
})

// [POST] /filmes/add - Cadastro de um novo filme
router.post('/add', (req, res) => {
    // recebi o objeto do filme para cadastar vinda do cliente (via requisicao http POST)
    const filme = req.body;
    filme.id = Math.random();
    filmes.push(filme);
    res.status(201).send({
        message: 'Filme cadastrado com sucesso',
        data: filme
    });
})

// [PUT] /filmes/edit/{id} - Edita um fime de acordo com o seu id e objeto recebido
router.put('/edit/:id', (req, res) => {
    // o objeto que veio do front para atualizar o filme com o id recebido
    const filmeEdit = req.body;
    // o id recebido via parametro
    const idParam = req.params.id;
    // procura o indice do filme pre cadastrado na lista de acordo com o id recebido para atualiza-la
    let index = filmes.findIndex(filme => filme.id == idParam);

    // spread operator ...
    // faz um espelho do item na lista e um espelho do objeto atualizado e junta os 2
    filmes[index] = {
        ...filmes[index],
        ...filmeEdit
    }

    res.send({
        message: `Filme ${filmes[index].nome} atualizado com sucesso`,
        data: filmes[index]
    })
})

// [DELETE] /filmes/delete/{id} = exclui um item da lista de acordo com o seu id

router.delete('/delete/:id', (req, res) => {
    // acessa o id recebido via parametro
    const idParam = req.params.id;

    const index = filmes.findIndex(filme => filme.id == idParam);
    const nome = filmes[index];
    filmes.splice(index, 1);
    res.send({
        message: `Filme ${nome.nome} excluido com sucesso !`,
    })
})


module.exports = router;