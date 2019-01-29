const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app = express();

app.get('/scrape', function(req, res) {
    url = 'https://www.imdb.com/title/tt0090605/';

    request(url, function(error, response, html){
        if(!error) {
            const $ = cheerio.load(html);
            let title, release, rating;
            var json = {title : "", release : "", rating : ""};
            $('.title_wrapper').filter(function() {
                let data = $(this);
                title = data.children().first().text().trim();
                release = data.children().children().first().text();
                json.title = title;
                json.release = release;
                //console.log(`This is the movie ${title}`);
                //console.log(`This is the title year ${release}`);
            })
            $('.ratingValue').filter(function() {
                let data =  $(this);
                rating = data.children().first().text();
                //console.log(`This is the movie rating ${rating}`);
                json.rating = rating;
            })
        }
        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
            console.log('File successfully written! - Check your project directory for the output.json file');
        })
        res.send('Check your console!')
    });
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;