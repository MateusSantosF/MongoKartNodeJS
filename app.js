const express = require('express')
const exphbs = require('express-handlebars')

// Routes
const productRoutes = require('./src/routes/product.routes')

// Configs
const PORT = 3000;

const hbs = exphbs.create()
const app = express()

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', './src/views')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('./src/public'))

app.use('/products', productRoutes);

app.get('/', (req,res)=>{
    res.redirect('/products')
})

app.listen(PORT, ()=>{
    console.log(`Server iniciado na porta ${PORT}`)
})



