import * as express from 'express'
import * as sqlite3 from 'sqlite3';
import * as bodyParser from 'body-parser'

const Config = {
  dbPath: __dirname + "/../resources/db.sqlite",
  port: process.env.PORT || 1234
}

const app: express.Application = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log(`[index.js] Connecting to database located at ${Config.dbPath} ...`)
const db: sqlite3.Database = new sqlite3.Database(Config.dbPath)

app.route('/api/users')
  .get((req, res) => {
    db.all('select first_name, last_name from users', (err, rows) => {
      res.send(rows)
    })
  })
  .post((req, res) => {  
    const firstName = req.body.firstName;
    const secondName = req.body.secondName;
    const email = req.body.email;

    const stmt = `insert into users(first_name, last_name, email) values('${firstName}', '${secondName}', '${email}')`;

    db.run(stmt, function (err) {
      console.log(this.lastID);
      res.json({ userId: this.lastID });
    });
  })


app.listen(Config.port)
console.log(`[index.js] Server is now listening to port ${Config.port}`)
