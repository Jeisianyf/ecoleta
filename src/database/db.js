//Criar banco de dados

//Importar a depensencia do SQLite3
const sqlite3 = require("sqlite3").verbose() //Verbose -> sempre que acontecer algo eu qro ver no terminal

//Criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db") //Criando um objeto a partir de uma classe ou contructor, cria um arquivo nesse destino

module.exports = db

// Utilizar o obejto de banco de dados para nossas operações 
/*db.serialize(() => {
    //Criar uma tabela com somandos SQL
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            adress TEXT,
            num NUMERIC,
            complement TEXT,
            state TEXT,
            city TEXT,
            itens TEXT
        );
    `)

    //Inserir dados na tabelar com somandos SQL
    const query = `
        INSERT INTO places (
            name,
            image,
            adress,
            num,
            complement,
            uf,
            city,
            itens
        ) VALUES (?,?,?,?,?,?,?,?);`

    const values = [
        "Papersider",
        "https://images.unsplash.com/photo-1560543899-58ce3bc3c8fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        "Guilherme Gemballa, Jardim América",
        "Nº260",
        "nenhum",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e papelão"
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }

        console.log("cadastrado com sucesso")
        console.log(this)
    }

    db.run(query, values, afterInsertData)

    // Consultar os dados da tabela com somandos SQL
    db.all(`SELECT * FROM places`, function(err, rows) {
        if (err) {
            return console.log(err)
        }

        console.log("Aqui está os seus registros")
        console.log(rows)
    }) */

    //Deletar um dado da tabela com somandos SQL
    /*db.run(`DELETE FROM places WHERE id = ?`, [8], function(err) {
        if (err) {
            return console.log(err)
        }

        console.log("Registro deletado")
    }) 
})*/