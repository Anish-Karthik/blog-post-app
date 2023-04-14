//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "This Where the all the posts will be displayed.";
const aboutContent = "This is the about page."
const contactContent = "This Page is for contact.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const posts = [];
const postNames = {};
let idnum = 1;

app.get('/', (req, res) => {
  res.render('home', {homeStartingContent: homeStartingContent, posts: posts});
});

app.get('/about', (req, res) => {
  res.render('about', {aboutContent: aboutContent});
});

app.get('/contact', (req, res) => {
  res.render('contact', {contactContent: contactContent});
});

app.get('/compose', (req, res) => {
  res.render('compose');
});

app.get('/pageNotFound', (req, res) => {
  res.render('notFound');
});
app.post('/compose', (req, res) => {
  var post = {  
    title: req.body.postTitle,
    content: req.body.postBody,
    id: idnum++
  };
  posts.push(post);
  postNames[_.lowerCase(post.title)] = posts[posts.length - 1];
  res.redirect('/');
});

app.get('/posts/:postName', (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postName);
  if (requestedTitle in postNames) {
    res.render('post', {post: postNames[requestedTitle]});
  } else {
    res.render('notFound');
  }
});


app.get('*', function(req, res){
  res.render('notFound');
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Server started on port 3000");
});
