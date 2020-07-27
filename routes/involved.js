const express = require('express')
const router = express.Router()
const Countries = require('../countries.json')
const Involved = require('../models/Involved')
const BodyParser = require('body-parser')
router.use(BodyParser.json())
router.get('/:tech', async (req, res) => {
    const invovled = await Involved.find({ Technology: req.params.tech })
    try {
        var GeoJson = makeGeoFile(invovled, req.params.tech)

        res.send(GeoJson)
    }
    catch (err) {
        res.json(err)
    }



})

router.get('/:tech/all', async (req, res) => {
    const invovled = await Involved.find({ Technology: req.params.tech })
    try {
       

        res.send(invovled)
    }
    catch (err) {
        res.json(err)
    }



})


router.get('/country/:country/:tech', async (req, res) => {
    const country = await Involved.find({
        uniq_name: req.params.country,
        Technology: req.params.tech
    })
    try {
        res.send(country)
    }
    catch (err) {
        res.json(err)
    }
})
module.exports = router



var makeGeoFile = (res, tech) => {



    var FeatureCollections = [];
    this.c = JSON.parse(JSON.stringify(Countries))

    for (var year = 2008; year <= 2020; year++) {
        this.c.features.map(feature => {
            res.map(item => {


                if (item.UsageYear == year && feature.properties.name.toLowerCase() == item.uniq_name) {
                    feature.properties.counter = item.Counter
                    feature.properties.totalusers = item.TotalUsers
                    feature.properties.question = item.CountQuestion
                    feature.properties.answer = item.CountAnswer
                    feature.properties.year = year
                    feature.properties.technology = tech

                }
            })


        })
        var { maxValue, minValue, maxValue2, minValue2, } = getMinMax(this.c)
        this.c.features.map(feature => {
            feature.properties.color1 = (feature.properties.counter - minValue) / (maxValue - minValue) //normalize for specific tech 
            feature.properties.color2 = (feature.properties.color2 - minValue2) / (maxValue2 - minValue2) //normalize for specific tech out of total users


        })




        FeatureCollections.push(JSON.parse(JSON.stringify(this.c)))

    }
    return FeatureCollections

}

getMinMax = (countries) => {  //getting the the min max value for normalization


    var array = []
    var array2 = []

    countries.features.map(item => {
        array.push(item.properties.counter)
        array2.push(isNaN((item.properties.counter / (item.properties.totalusers))) == true ? 0 : item.properties.counter / (item.properties.totalusers))
        item.properties.color2 = (isNaN((item.properties.counter / (item.properties.totalusers))) == true ? 0 : item.properties.counter / (item.properties.totalusers))


    })


    return {
        maxValue: Math.max.apply(Math, array),
        minValue: Math.min.apply(Math, array),
        maxValue2: Math.max.apply(Math, array2),
        minValue2: Math.min.apply(Math, array2),


    }

}
