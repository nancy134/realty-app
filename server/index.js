require('ignore-styles');
import path from 'path';
import fs from 'fs';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import SSRProvider from 'react-bootstrap/SSRProvider';

import express from 'express';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import App from '../src/App';
import {Helmet} from "react-helmet";

const PORT = process.env.PORT || 3008;
const app = express();
app.use(express.static('./build'));

app.get('/listing/:id', (req, res) => {

    console.log("/listing/:id");
    const app = ReactDOMServer.renderToString(
        <SSRProvider>
            <StaticRouter location={req.url}>
                <App url={req.url}/>
            </StaticRouter>
        </SSRProvider>
    );

    const helmet = Helmet.renderStatic();
    const indexFile = path.resolve('./build/index.html');

    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }

        const helmetTitle = helmet.title.toString();
        const helmetMeta = helmet.meta.toString();
        console.log("helmetMeta:");
        console.log(helmetMeta);
        data = data.replace('<div id="root"></div>', `<div id="root">${app}</div>`);
        data = data.replace('<style></style>', helmetMeta);
        return res.send(data);
    });

});

app.get('/*', (req, res) => {

  console.log("req.url: "+req.url);
  const css = new Set();
  const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()))
  const app = ReactDOMServer.renderToString(
  <SSRProvider>
  <StaticRouter location={req.url}>
      <App url={req.url}/>
  </StaticRouter>
  </SSRProvider>
  );
  const helmet = Helmet.renderStatic();
  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    const html = `<!doctype html>
    <html>
    <head>
    <style>${[...css].join('')}</style>
    <body>
        <p>got here</p>
    </body>
    </html>`

    const helmetTitle = helmet.title.toString();
    const helmetMeta = helmet.meta.toString();
    console.log("helmetMeta:");
    console.log(helmetMeta);
    data = data.replace('<div id="root"></div>', `<div id="root">${app}</div>`);
    data = data.replace('<style></style>', helmetMeta);
    //data.replace('<style></style', `<style>${[...css].join('')}</style>`);
    return res.send(data);
  });
});



app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
