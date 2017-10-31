const express = require('express');
const elasticsearch = require('elasticsearch');
const app = express();
const PORT = 9200;

const client = new elasticsearch.Client({
  host: 'kibana:changeme@localhost:9200',
  log: 'trace'
});

client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

app.put('schools/school', (req, res) => {
 res.send('sent back');
})

app.get('/', (req, res) => {
    res.send('send something back');
})


app.listen(PORT, () => {
  console.log(`listening on port ${PORT} for Elastic Search and Kibana Dashboard`);
});