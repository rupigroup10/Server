const express = require('express')
const router = express.Router()
const Technology = require('../models/Technology')
const TechArray = require('../models/TechArray')
const CombinedTech = require('../models/CombinedTech')
const BodyParser = require('body-parser')
router.use(BodyParser.json())
router.get('/', async (req, res) => {
    const technologies = await Technology.find()

    try {
        res.send(technologies)
    }
    catch (err) {
        res.json(err)
    }



})


var getRecommendation = (tech, combination) => {
    var highestCombination = {}
    var highest = 0
    var techName = tech[0].TagName
    var combinedWithTech = combination.filter(item => item.Combination.includes(techName))//filter combinations by input

    combinedWithTech.map(item => {//gets the highest combination
        if (item.counter >= highest) {
            highest = item.counter
            highestCombination = item
        }
    })
    var comb=highestCombination.Combination
    var Recommendation=comb.filter(item=>item!=techName)//get the new tech
    console.log(Recommendation)
    return Recommendation

}
router.post('/techchoosen', async (req, res) => {
    if (req.body.length === 1) {//first search
        const Combination = await CombinedTech.find()
        const Recommendation = getRecommendation(req.body, Combination)
        try {
            res.send(Recommendation)
           
        }
        catch (err) {
            res.json(err)
        }
    }
    const TechInput = new TechArray({
        TechInput: req.body
    })
    TechInput.save()
        .then(data => {
           // res.json(data)
        })
        .catch(err => {
            res.json({ message: err })
        })
})
module.exports = router