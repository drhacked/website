//--------------------- 

const fs = require('fs')

const casper = require("casper").create({
        pageSettings: {
            userAgent: "./Casperjs/website/index.html"
        }
    }),
    url = 'https://www.senscritique.com/bd/actualite/manga';
arrayData = [];


//fonction de fin
const logFinish = function() {
    this.echo('Script terminée').exit()
}

//
const processPage = function() {
    arrayData = this.evaluate(getData)
        // on demande a utils de nous loguer arrayLinks
    require('utils').dump(arrayData)
}


function pushDataJson() {
    const
        arrayData = this.evaluate(getData),
        valueArrayData = JSON.stringify(arrayData, null, 2)
    fs.write('../Json/manganews.json', valueArrayData)
}

function getData() {
    //ok
    const arrayData = [],
        articles = document.querySelectorAll("div.d-grid-main div.elpr ul.elpr-list li.elpr-item");

    for (var i = 0, article; article = articles[i]; i++) {
        const link = article.querySelector(' div.elpr-content h2.d-heading2 a'),
            img = article.querySelector('figure div img'),
            articleObj = {}

        articleObj['link'] = link.getAttribute('href'),
            articleObj['title'] = link.innerText,
            articleObj['img'] = img.getAttribute('src'),
            arrayData.push(articleObj)
    }

    return arrayData;

}

//
casper.start(url)

casper.then(processPage, 5000)

casper.then(pushDataJson)

// Et casper s'execute
casper.run(logFinish)