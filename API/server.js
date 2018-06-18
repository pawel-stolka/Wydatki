var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    Bill = require('./models/Bill')

mongoose.Promise = Promise

var app = express(),
    port = process.env.PORT || 7000,
    mongoString = //'mongodb://localhost:27017/Wydatki'
    'mongodb://user12:pass12@ds161520.mlab.com:61520/wydatki10'

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))

app.get('/dbinfo', (req, res) => {
    try {
        var info = mongoString
        // console.log(`secretString: ${consts.secretString}`)
        return res.status(200)
            .send({
                info
            })
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

app.get('/', (req, res) => {
    res.send('hi! everything is working great!')
})

app.get('/bills', async (req, res) => {
    try {
        var bills = await Bill.find({}, '-__v')
        // var users = await User.find({}, '-pass -__v')
        res.send(bills)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

app.post('/bill', (req, res) => {
    var billData = req.body;

    var bill = new Bill(billData)

    bill.save((err, result) => {
        if (err) {
            console.error(`ERROR: ${err}`)
            return res.status(401)
                .send({
                    message: 'Could not save the bill...'
                })
        }
        return res.status(200)
            .send(billData)
    })
})

mongoose.connect(mongoString, (err) => {
    let _name = mongoString.split('/'),
        dbName = _name[_name.length - 1]
    if (!err)
        console.log(` ===> connected to db: ${dbName} <===`)
})

app.listen(port, () => {
    console.log(` ===> server is listening at =====> port ${port}`)
});