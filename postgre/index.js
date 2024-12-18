const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "39.104.63.231",
  database: "sitedb",
  password: "yy3699",
  port: 5432
});

function postgreStart() {
  client.connect((err) => {
    if (err) {
      return;
    }
    console.log("postgre connect success", "sitedb:5432");
  });
}

module.exports = {
  client,
  postgreStart
};
