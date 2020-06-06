const express = require("express") //Estou solicitando o express e ele será armazenado nessa const
const server = express() //Executando o express
const db = require("./database/db") // pegar o banco de dados



//Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Configurar pasta publica para que esteja disponivel no projeto
server.use(express.static("public"))

// Habilitar o uso do re.body na aplicação
server.use(express.urlencoded({ extended: true }))

//Configurar caminhos da minha aplicação
//Pagina incial
//Req: Requisição
//Res: Resposta
server.get("/", (req, res) => { //GET -> Pedindo 
    return res.render("index.html") //dirname -> Devolve em qual diretório estou, nesse caso src
})

server.get("/register", (req, res) => {

    // req.query: Query String da nossa url
    //console.log(req.query)

    return res.render("register.html")
})

server.post("/savepoint", (req, res) => {

    //req.body: O corpo do formulário

    // inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            name,
            image,
            adress,
            num,
            complement,
            state,
            city,
            itens
        ) VALUES (?,?,?,?,?,?,?,?);`

    const values = [
        req.body.name,
        req.body.image,
        req.body.adress,
        req.body.num,
        req.body.complement,
        req.body.state,
        req.body.city,
        req.body.itens
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro")
        }

        console.log("cadastrado com sucesso")
        console.log(this)

        return res.render("register.html", { saved: true })
    }

    db.run(query, values, afterInsertData)    
})

server.get("/result", (req, res) => {

    const search = req.query.search

    

    // pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length

        // Mostrar a pagina html com os dados do banco de dados
        return res.render("results.html", { places: rows, total: total })
    })
})

// Ligar o servidor
server.listen(3000)