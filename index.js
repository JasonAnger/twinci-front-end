const express = require('express')
const path = require('path')
const app = express()

const port = process.env.PORT || 3000

app.use(express.static('public'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', async (req,res) => {
    res.render('index', {isHome: false})
})

app.listen(port, async () => {
    console.log('Running on port ' + port)
})