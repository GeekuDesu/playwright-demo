const express = require('express')
const app = express()
const port = 3000

app.get('/geeku', (req, res) => {
  res.send('fukken squid err lamitri')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
