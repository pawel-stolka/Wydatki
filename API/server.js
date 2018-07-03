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

app.post('/bill', async (req, res) => {
    var billData = req.body;
    console.log(billData)
    if (billData.name == '' ||
        billData.type == '' ||
        billData.price == '' ||
        billData.date == '' ||
        billData.name == null ||
        billData.type == null ||
        billData.price == null ||
        billData.date == null)
        return res.status(400)
            .send({
                message: 'not enough data...',
                details: billData
            })

    var exist = await Bill.find({
        name: billData.name,
        price: billData.price,
        date: billData.date
    }, '-__v')
    console.log(exist)

    if (exist.length > 0) {
        console.log('exists', exist)
        return res.status(400)
            .send({
                message: 'Already in database!',
                exist
            })
    }

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


// to change category by postman
app.put('/changetype', async (req, res) => {
    try {
        let typeData = req.body
        console.log(typeData)
        var bills = await Bill.find({
            name: typeData.name
        })
        if (!bills)
            return res.status(401)
                .send({
                    message: 'type not found'
                })

        console.log('bills.length', bills.length)

        for (var i = 0; i < bills.length; i++) {
            var element = bills[i];
            element.type = typeData.type
            element.save((err, newType) => {
                console.log(i, element.type)
            })
        }

        console.log('ok!')
        return res.status(200)
            .send({
                message: 'updated.',
                value: bills.type
            })

    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})


// ----- get by name --------------
app.get('/name', async (req, res) => {
    let groups = await Bill.aggregate([{
        $group: {
            _id: '$name',
            count: {
                $sum: 1
            },
            entry: {
                $push: {
                    name: "$name",
                    price: "$price"
                }
            }
        }
    }])
    return res.status(200)
        .send(
            groups
        )
})

app.get('/name/:name', async (req, res) => {
    let name = req.params.name
    if (name == 'sniadanie')
        name = 'śniadanie'
    let names = await Bill.aggregate([
        {
            $match: {
                "name": name
            }
        },
        {
            $group: {
                _id: '$name',
                count: {
                    $sum: 1
                },
                entry: {
                    $push: {
                        name: "$name",
                        price: "$price",
                        extra: "$extra"
                    }
                }
            }
        }
    ])
    return res.status(200)
        .send(names)
})

// ----- group by type --------------


app.get('/type', async (req, res) => {
    let types = await Bill.aggregate([{
        $group: {
            _id: '$type',
            count: {
                $sum: 1
            },
            entry: {
                $push: {
                    name: "$name",
                    price: "$price"
                }
            }
        }
    }])
    return res.status(200)
        .send(types)
})

app.get('/type/:type', async (req, res) => {
    let type = req.params.type
    // var rules = {"name": "kawa"}
    if (type == 'sniadanie')
        type = 'śniadanie'
    if (type == 'spozywka')
        type = 'spożywka'
    let types = await Bill.aggregate([{
            $match: {
                "type": type
            }
        },
        // $project: {
        //     _id: 0,
        //     price: 1,
        //     name: '$name'
        // },
        {
            $group: {
                _id: '$type',
                count: {
                    $sum: 1
                },
                entry: {
                    $push: {
                        name: "$name",
                        price: "$price",
                        extra: "$extra"
                    }
                }
            }
        }
    ])
    return res.status(200)
        .send(types)
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