const request = require('request')


const getNews = (url, callback) => {

    request({ url, json: true }, (error, response) => {

        //handel errors
        if (error) {
            callback(" ERROR is happened ", undefined)
        } else if (response.body.message) {
            callback(response.body.message, undefined)
        } else if (response.body.articles.length === 0) {
            callback("Check your api url", undefined)
        } else {

            callback(undefined, response.body)
        }
    })
}

module.exports = getNews