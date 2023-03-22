const express = require('express')
const mysql = require('mysql2')

const app = express()
let conn = null

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'node'
}

const getConnection = () => {
  if (conn) return conn
  conn = mysql.createConnection(config)
  return conn;
}

app.get('/status', (req, res) => {
  res.send(`
    <h1>Hello World!</h1>
    <p>Try <a href="/">/</a>
  `)
})

app.get('/', (req, res) => {
  const connection = getConnection()
  const query = 'SELECT * FROM people'
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching records:', err)
      res.status(500).send('Error fetching records')
      return
    }

    res.status(200).send(`
      <h1>Full Cycle Rocks!</h1>
      <ul id="people-list"></ul>
      <script>
        const people = ${JSON.stringify(results)};
        const list = document.getElementById('people-list');
        people.forEach(person => {
          const li = document.createElement('li');
          li.innerHTML = person.name;
          list.appendChild(li);
        });
      </script>
    `)
  })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))