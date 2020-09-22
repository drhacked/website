const
    articleMedia = document.getElementById('articleMedia')

const
    myJson = function() {
        const
            urlJSON = '/assets/Json/manganewsid.json',
            req = new XMLHttpRequest()

        req.open('GET', urlJSON)
        req.responseType = 'json'
        req.send()
        req.onload = function() {
            const
                articleMedia = req.response
            showArticle(articleMedia)
        }
        console.log(req)
    },
    showArticle = function(jsonObj) {
        const article = jsonObj
            // Boucle de récupération du Json pour l'affichage dans le html
        for (var i = 0; i < article.length; i++) {

            console.log(article[i].id);
            //CREATION DES BALISE HTML
            const myArticle = document.createElement('article');
            // Récupération des Clef / Valeur | (key / value)
            myArticle.id = article[i].id
                // Affichage des Elements avec leur variable (Parent => Enfant)
                //deuieme boucle
            for (var x = 0; x < article[i].array.length; x++) {

                console.log(article[i].array[x].title);
                //CREATION DES BALISE HTML
                const mydiv = document.createElement('div');
                const myTitle = document.createElement('h5');
                const classTextc = document.createAttribute('class');
                const classColMd12 = document.createAttribute('class');
                // Récupération des Clef / Valeur | (key / value)
                console.log(classTextc);
                myTitle.textContent = article[i].array[x].title
                    //Attribution de class
                classColMd12.value = "col-md-12"
                classTextc.value = "text-center"

                // Affichage des Elements avec leur variable (Parent => Enfant)

                articleMedia.appendChild(myArticle)
                myArticle.appendChild(mydiv)
                myArticle.setAttributeNode(classColMd12)
                mydiv.appendChild(myTitle)
                mydiv.setAttributeNode(classTextc)
            }
        }
    }
    /*
     * 
     * Execution des Functions
     * 
     */
myJson()
showArticle()