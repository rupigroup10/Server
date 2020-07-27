const express = require('express')
const app = express();
const router = express.Router()
var handlebars = require('express-handlebars')
  .create({ defaultLayout:'main' });
const mongoose = require('mongoose')
// const port = 5000;
const port=process.env.PORT||5000
const cors=require('cors')
const bodyParser = require('body-parser')
const InvolvedRoute=require('./routes/involved')
const TechnologyRoute=require('./routes/technology')
const FlagRoute=require('./routes/flag')

require('dotenv/config')
app.use(cors())
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://orbb92:e8949881@cluster0-jihpp.mongodb.net/DB?retryWrites=true&w=majority', { useNewUrlParser: true,useUnifiedTopology: true }, () => {
   
})

var db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function callback () {
  console.log("connected to db");
});



app.use('/involved',InvolvedRoute)
app.use('/technology',TechnologyRoute)
app.use('/flags',FlagRoute)

app.get('/',  (req, res) => {
  
  try {
      res.send('ServerUp')
  }
  catch (err) {
      res.json(err)
  }
})
app.listen(port, () => console.log('server start on port ' + port))