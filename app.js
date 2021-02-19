const data = require("./data.json");
const express = require("express");
const pug = require("pug");

const app = express();
const port = 3000;

app.set("view engine", "pug");
app.use("/public/", express.static("public"));

app.locals.name = "Paul Heading";
app.locals.intro = "I am Paul Heading and I am awesome for figuring this out!";
app.locals.description =
  "This site is meant to showcase my treehouse projects. It's providing really good practice working with the pug templating system.";
app.locals.data = data.projects;

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));

app.get(`/project/:id`, function (req, res) {
  res.render("project", { id: req.params.id });
});

app.use((req, res, next) => {
  const err = new Error("page not found :(");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render("error");
});
