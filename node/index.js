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
    <!DOCTYPE html>
<html>
  <head>
    <title>Full Cycle - Docker</title>
    <link rel="shortcut icon" href="https://fullcycle.com.br/wp-content/themes/fullcycle/assets/images/favicon.ico" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  </head>
  <body>
    <div class="container">
    <h1>Full Cycle Rocks!</h1>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody id="people-table">
      </tbody>
    </table>
  </div>

  <script>
    var people = ${JSON.stringify(results)};

    var tbody = document.getElementById("people-table");
    for (var i = 0; i < people.length; i++) {
      var person = people[i];
      var tr = document.createElement("tr");
      var idTd = document.createElement("td");
      idTd.textContent = person.id;
      tr.appendChild(idTd);
      var nameTd = document.createElement("td");
      nameTd.textContent = person.name;
      tr.appendChild(nameTd);
      tbody.appendChild(tr);
    }
  </script>

  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  </body>
</html>
    `)
  })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))