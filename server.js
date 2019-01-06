const express = require("express");
const morgan = require('morgan');

const app= express();

const blogPost= require('./blog-post');

app.use(morgan('common'));
app.use(express.json());

app.use('/blog-posts', blogPost);

let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app
      .listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
      })
      .on('error', err => {
        reject(err);
      });
  });
}

function closeSever() {
  return new Promise((resolve, reject) => {
    console.log(`Closing server`);
    server.close(err => {
      if(err) {
        reject(err);
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeSever};

/*app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is running on port ${process.env.PORT || 8080}`);
})*/