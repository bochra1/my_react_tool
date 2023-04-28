const express = require('express');
const request = require('request');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 3001;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.get('/iframe', (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('Missing url parameter');
  }
  request(url, (error, response, body) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    const baseTag = '<base href="' + url + '">';
    const htmlWithBaseTag = body.replace(/<head>/i, '<head>' + baseTag);
    res.send(htmlWithBaseTag);
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
