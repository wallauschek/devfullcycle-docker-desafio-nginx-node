const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Pedro Wallauschek')`
connection.query(sql)
connection.end()


app.get('/', (req,res) => {
    const connection1 = mysql.createConnection(config)
    const sql = `select name from people`
    connection1.query(sql, (err,rows) => {
        if(err) throw err;
        let html = ''
        rows.forEach(row => {
            html += `<li>${row.name}</li>`
        });
        res.send(`
        <h1>Full Cycle</h1>
        <ul>
        ${html}
        </ul>
        `)
    })
    connection1.end()

})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})