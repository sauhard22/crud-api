const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'CRUDDatatBase'
}) 

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/api/get', (req,res) => {

    db.query("SELECT * FROM movie_reviews", (err,result) => {
        res.send(result)
    })
})

app.post('/api/insert', (req,res)=>{
    
    const movieName = req.body.movieName
    const movieReview = req.body.movieReview
    const sqlQuery = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)"
    
    db.query(sqlQuery, [movieName, movieReview], (err, result)=>{
        console.log(err)
    })
})

app.delete('/api/delete/:movieName', (req,res) => {
    const name = req.params.movieName
    db.query("DELETE FROM movie_reviews WHERE movieName = ?", name, (err, result)=>{
        if(err) console.log(err)
    })
})


app.listen(3001, ()=>{
    console.log('Server is up on port 3001')
})


