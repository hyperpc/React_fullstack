//import fetch from 'node-fetch';
//import express from 'express';
//import initSqlJs from 'sql.js';
//import fs from 'fs';
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const fs = require('fs');
const initSqlJs = require('sql.js');
//const sqlite = require('sqlite3');
//const fetch = require('node-fetch');

const filebuffer = fs.readFileSync('./db/usda-nnd.sqlite3');

//const db = new sqlite.Database(filebuffer);
initSqlJs().then(function(SQL){
  const db = new SQL.Database(filebuffer);
//});


//const fetch = require('node-fetch');
//const initSqlJs = require('sql.js');
//const sqlPromise = initSqlJs({ locateFile: file => `./db/usda-nnd.sqlite3` });
//const dataPromise = fetch("/Part_01/ch07_Webpack/food-lookup/db/usda-nnd.sqlite3").then(res => res.arrayBuffer());
//const [SQL, buf] = await Promise.all([sqlPromise, dataPromise]);
//const db = new SQL.Database(new Uint8Array(buf));

const app = express();


app.set('port', (process.env.API_PORT || 3001));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const COLUMNS = [
  'carbohydrate_g',
  'protein_g',
  'fa_sat_g',
  'fa_mono_g',
  'fa_poly_g',
  'kcal',
  'description',
];
// create a GET route for testing
app.get('/express_backend', (req, res) => {
  //res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
  res.json("YOUR EXPRESS BACKEND IS CONNECTED TO REACT");
});

app.get('/api/food', (req, res) => {
  const param = req.query.q;

  if (!param) {
    res.json({
      error: 'Missing required parameter `q`',
    });
    return;
  }

  // WARNING: Not for production use! The following statement
  // is not protected against SQL injections.
  const r = db.exec(`
    select ${COLUMNS.join(', ')} from entries
    where description like '%${param}%'
    limit 100
  `);

  if (r[0]) {
    res.json(
      r[0].values.map((entry) => {
        const e = {};
        COLUMNS.forEach((c, idx) => {
          // combine fat columns
          if (c.match(/^fa_/)) {
            e.fat_g = e.fat_g || 0.0;
            e.fat_g = parseFloat((
              parseFloat(e.fat_g, 10) + parseFloat(entry[idx], 10)
            ).toFixed(2), 10);
          } else {
            e[c] = entry[idx];
          }
        });
        return e;
      }),
    );
  } else {
    res.json([]);
  }
});

//export default app;


app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

});