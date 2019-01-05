const express = require("express");
const morgan = require('morgan');

const app= express();

const blogPost= require('./blog-post');

app.use(morgan('common'));
app.use(express.json());

app.use('/blog-posts', blogPost);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is running on port ${process.env.PORT || 8080}`);
})