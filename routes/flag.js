const express = require('express')
const router = express.Router()
const Flag = require('../models/Flag')
const BodyParser = require('body-parser')
router.use(BodyParser.json())
router.get('/', async (req, res) => {
    const flags = await Flag.find()
  
    try {
           res.send(flags)
    }
    catch (err) {
        res.json(err)
    }



})
module.exports = router