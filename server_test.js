const request = require('request')
const express = require('express')
const app = express()
const apiKey = 'ec2a8c3202f503524ea99b9adbc61f8d';
const baseURL = 'http://api.openweathermap.org/';

app.get('/weather', (req, res) => {
    if (!req.query.search) {
        return res.send('Please provide a search string...')
    }
    
        
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${req.query.search}&appid=ec2a8c3202f503524ea99b9adbc61f8d`;
    request( { url, json: true }, (error, {body}) => {
        if (error) {
            return res.send('Unable to connect.')
        }
        console.log(body);
        res.send(body)
    })
})
app.listen(3000, () => {
    console.log('Server is up!')
})