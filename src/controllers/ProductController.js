const connect = require('../data/conn')
const { ObjectId } = require('mongodb')

const COLLECTION_NAME = "products"

module.exports = class ProductController {

    static async insert(req, res) {

        const { name, price, description } = req.body;

        if (name == '' || price == '' || description == '') {
            return res.status(404).send('Preencha todos os campos!')
        }

        const db = await connect();
        await db.collection(COLLECTION_NAME).insertOne({
            name,
            price,
            description
        })

        res.redirect('/products')
    }

    static createView(req, res) {
        res.render('product/create')
    }

    static async listView(req, res) {
        const db = await connect();
        const products = await db.collection(COLLECTION_NAME).find({}).toArray();

        res.render('product/home', { products })
    }

    static async editView(req, res) {

        const productId = req.params.id;

        const db = await connect();
        const product = await db.collection(COLLECTION_NAME).findOne({_id:new ObjectId(productId)});


        res.render('product/edit', { product })
    }
    static async update(req,res){
        const { name, price, description,id } = req.body;
        if (name == '' || price == '' || description == '') {
            return res.status(404).send('Preencha todos os campos!')
        }

        const db = await connect();
        await db.collection(COLLECTION_NAME)
        .updateOne({
            _id:new ObjectId(id)
        },{$set:{
            name,
            price,
            description
        }
        })

        res.redirect('/products')
    }

    static async delete(req, res) {
        const { id } = req.body;

        if (id == '') {
            return res.status(500).send("Um erro ocorreu. Tente novamente mais tarde.")
        }
        const db = await connect();
        await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });

        res.redirect('/products')
    }
}