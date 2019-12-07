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

server.get("/posts/:id", (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "specifin=c ID not found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the post"
      });
    });
});

server.get("/posts/:id/comments", (req, res) => {
  const commentsById = req.params.id;
  db.findPostComments(commentsById)
    .then(post => {
      if (commentsById.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
      if (post.length === 0) {
        res.status(400).json({ errorMessage: "No comments here." });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the post"
      });
    });
});

server.post("/api/posts", (req, res) => {
  const newPost = req.body;
  if (!newPost.title || !newPost.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents."
    });
  } else {
    db.insert(newPost)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the post to the database."
        });
      });
  }
});

server.delete("/posts/:id", (req, res) => {
  db.remove(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json({ message: "the post was deleted" });
      } else {
        res.status(404).json({ message: "specifin=c ID not found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the post"
      });
    });
});

server.listen(8000, () => {
  console.log("\n*** Server Running on http://localhost:8000 ***\n");
});
