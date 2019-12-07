const express = require("express");
const db = require("./data/db");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h2>Welcome to the Lambda posts API</h>");
});

server.get("/api/posts", (req, res) => {
  db.find(req.query)
    .then(db => {
      return res.status(200).json(db);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the posts"
      });
    });
});

// server.get("/:id", (req, res) => {
//     db.find()
//       .then(hub => {
//         if (db) {
//           res.status(200).json(db);
//         } else {
//           res.status(404).json({ message: "Hub not found" });
//         }
//       })
//       .catch(error => {
//         console.log(error);
//         res.status(500).json({
//           message: "Error retrieving the hub"
//         });
//       });
//   });

server.listen(8000, () => {
  console.log("\n*** Server Running on http://localhost:8000 ***\n");
});
