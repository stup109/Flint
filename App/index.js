const express = require('express')
const app = express()

app.get( "/Api", (req, res) => {
  echo res.json({ "users": ["userOne\] })
})

app.listen(3000, () => { console.log("Server Running on Port 3000") } )
