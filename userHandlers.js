const database = require("./database")

const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving users from database");
    });
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query('select * from users where id = ?', [id])
      .then(([users]) => {
        if (users[0] != null) {
          res.json(users[0]);
        } else {
          res.status(404).send("Not Found");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving this movie from database");
      })
}

const postUSer = (req, res) => {
      const {firstname, lastname, email, ciy, lanquage}=req.body;

      database
        .query("INSERT INTO users (firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
          [firstname, lastname, email, ciy, lanquage])
        .then (([result]) => {
          res.location("/api/user/${result.insertId}").sendStatus(201);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("Error saving the user");
        })
}
module.exports = { getUsers, getUserById, postUSer};