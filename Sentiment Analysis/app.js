const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const spawn = require("child_process").spawn;





const app = express();

class ExpressError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true }))



app.get('/sentAnalysis', (req, res) => {
    res.render('home')
})

app.get('/sentsent', async (req, res) => {
    const {query} = req.query;
    //console.log(query)
    const pythonProcess = await spawn('python3',["SentimentAnalysis.py",query]);
    const sentiment = new Promise ((resolve, reject) => {
        pythonProcess.stdout.on('data', (data) => {
        mystr = data.toString();
        myjson = JSON.parse(mystr);
        //console.log(myjson)
        resolve(myjson);
        })
    })
    sentiment.then((ans) => {
        //console.log(ans);
        res.render('sentsent', {ans})
    })
})

app.get('/getSentiment', async(req, res) =>{
    const {query} = req.query;
    //console.log(query)
    const pythonProcess = await spawn('python3',["Sentiment Analysis.py",query]);
    const sentiment = new Promise ((resolve, reject) => {
        pythonProcess.stdout.on('data', (data) => {
        mystr = data.toString();
        myjson = JSON.parse(mystr);
        //console.log(myjson)
        resolve(myjson);
        })
    })
    sentiment.then((ans) => {
        //console.log(ans);
        res.render('sentiment', {ans})
    })
})


app.all('*', ( req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = 'Oh No, Something Went Wrong!';
    res.status(statusCode).render('error', { err });
})

app.listen(3000, ()=> {
    console.log('LISTENING TO PORT 3000')
})