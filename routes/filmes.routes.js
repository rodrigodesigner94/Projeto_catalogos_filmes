const express = require('express');
// inicializar as rotas do express
const router = express.Router();

const filmes = [
    {id: Date.now(),
        nome: "O iluminado",
        imagem:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.papodecinema.com.br%2Ffilmes%2Fo-iluminado%2F&psig=AOvVaw06ymZDTDqayV2flpWJpuTc&ust=1635550275101000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCOC6s_Wh7vMCFQAAAAAdAAAAABAD",
        genero:"Terror",
        ano: "1980",
        diretor: "Stanley Kubrick",
        nota:"",
        assistido: "sim"
    },
    
    {id: Date.now(),
        nome: "Interestelar",
        imagem:"https://www.google.com/url?sa=i&url=https%3A%2F%2Ffilmow.com%2Finterestelar-t27814%2F&psig=AOvVaw2s1JNJRDnpPTWX_G7qSIbc&ust=1635550412396000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPibs72i7vMCFQAAAAAdAAAAABAE",
        genero:"Ficção cientifica",
        ano: "2014",
        diretor: "Christopher Nolan",
        assistido: "sim"
    },
    
    {id: Date.now(),
        nome: "Kill Bil",
        imagem:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fpt.wikipedia.org%2Fwiki%2FKill_Bill&psig=AOvVaw3nxwj9KJHke593WlH0QcB3&ust=1635550520064000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNDD89Oi7vMCFQAAAAAdAAAAABAN",
        genero:"Ação",
        ano: "2003",
        diretor: "Quentin Tarantino",
        assistido: "sim"
    },
]

// [GET] /filmes - Retornar uma lista de filmes
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
    // recebi o objeto da vaga para cadastar vinda do cliente (via requisicao http POST)
    const filme = req.body;
    filme.id = Date.now();
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
        message: `Filme ${filmes[index].titulo} atualizado com sucesso`,
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
        message: `Filme ${nome.titulo} excluido com sucesso !`,
    })
})


module.exports = router;