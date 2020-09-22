/* 
 *
 * Exercice Scrapping avec 'CasperJS' & 'PhantomJS'
 * 
 * Objectif :
 * 
 * Récupérer (GET) des datas sur un site pour pouvoir les exploitées
 * 
 * Lancer le script : casperjs articleObj.js
 *
 */
// Déclaration des variables
// Import de utils : https://www.npmjs.com/package/utils
// Import de casperJS : https://www.npmjs.com/package/casper
const fs = require('fs')
var
    casper = require("casper").create({
        pageSettings: {
            userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Gecko/20130404 Firefox/23.0"
        }
    }),
    url = 'https://www.senscritique.com/bd/actualite/manga';
arrayArticle = [];
// Script Dev
var
    logFinish = function() {
        this.echo('Script Terminé !').exit()
    }
var
    processPage = function() {
        arrayArticle = this.evaluate(getDataArticle)
            // on demande a utils de nous loguer arrayLinks
        require('utils').dump(arrayArticle)
    }

function pushDataJson() {
    const
        arrayArticle = this.evaluate(getDataArticle),
        valueArrayArticles = JSON.stringify(arrayArticle, null, 2)
    fs.write('../Json/6-articleObj.json', valueArrayArticles)
}

function getDataArticle() {
    var arrayArticle = [],
        articles = document.querySelectorAll("div.d-grid-main div.elpr ul.elpr-list li.elpr-item");
    for (var i = 0, article; article = articles[i]; i++) {
        var link = article.querySelector('div.elpr-content h2.d-heading2 a'),
            articleObj = {}
        articleObj['link'] = link.getAttribute('href')
        arrayArticle.push(articleObj)
    }
    return arrayArticle
}
casper.start(url)
casper.then(processPage, 5000)
casper.then(pushDataJson)
    // Et casper s'execute
casper.run(logFinish)