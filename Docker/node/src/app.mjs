import { createServer } from 'http';
import mysql from 'mysql2/promise';


async function getMySQLConnection() {
 return  mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'database'
  })
}

(async function setupDatabase(){
  const conn = await getMySQLConnection()

  await conn.query('CREATE TABLE IF NOT EXISTS people (id int NOT NULL AUTO_INCREMENT, name VARCHAR(100) NOT NULL, PRIMARY KEY (id))')
})()

createServer(async function (req, res) {
  if(req.url === "/"){
    const conn = await getMySQLConnection()

    await conn.query('INSERT INTO people(name) values("Joao")')
  
    const [users] = await conn.query('SELECT * FROM people')
  
    const usersList = `<ol>${users.reduce((acc, curr) => { return acc + `<li>${curr.name}</li>`}, "")}</ol>`
  
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<h1>Full Cycle Rocks!</h1>` +  usersList);
    res.end();
  }

  res.writeHead(404)
  res.end();
  
}).listen(3000, () => console.log('Listening on port 3000!'));