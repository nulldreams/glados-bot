const cheerio = require('cheerio')
const rp = require('request-promise')

exports.LANES = (parametro, callback) => {
    parametro = parametro.replace(/\/lane/g, '').trim()
    console.log(`http://www.dotabuff.com/heroes/lanes?lane=${parametro}`) 
    rp.get(`http://www.dotabuff.com/heroes/lanes?lane=${parametro}`)
        .then((html) => {
            MontarRetorno(parametro, html, (mensagem) => {
                callback(mensagem)
            })
        })
        .catch((erro) => {
            console.log(`Ocorrer um erro: ${erro}`)
        })
}

var MontarRetorno = (parametro, html, callback) => {
    let lane = parametro
    let $ = cheerio.load(html)

    let mensagem = {
        color: 3447003,
        author: {
            name: `Melhores heróis para a ${lane} lane`
        },
        description: '-',
        fields: [],
        timestamp: new Date(),
        footer: {
            icon_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Aperture_Science.svg/1200px-Aperture_Science.svg.png',
            text: "© Aperture Laboratories"
        }
    }
    for (let i = 0; i < 5; i++) {
        let heroi = {}
        let status = {}
        heroi.name = $('.sortable').find('tbody').eq(0).find('tr').eq(i).find('td').eq(1).text().trim()
        status.winrate = $('.sortable').find('tbody').eq(0).find('tr').eq(i).find('td').eq(3).text().trim()
        status.kda = $('.sortable').find('tbody').eq(0).find('tr').eq(i).find('td').eq(4).text().trim()
        status.gpm = $('.sortable').find('tbody').eq(0).find('tr').eq(i).find('td').eq(5).text().trim()
        status.xpm = $('.sortable').find('tbody').eq(0).find('tr').eq(i).find('td').eq(6).text().trim()

        heroi.value = `Este herói possui uma taxa de ${status.winrate} de vitórias, um KDA de ${status.kda}, ele possui uma média de GPM de ${status.gpm} e de XP ${status.xpm}`

        mensagem.fields.push(heroi)
    }

   callback(mensagem)    
}

/*

{
            color: 3447003,
            author: {
                name: 'GLaDOS',
                icon_url: 'https://www.dotabuff.com/assets/heroes/kunkka-6cdf5afd83d2cc5a167771bbd2c12f4a9751bbcae22dbc629d6302e751ee2e43.jpg'
            },
            title: "This is an embed",
            url: "http://google.com",
            description: "This is a test embed to showcase what they look like and what they can do.",
            fields: [{
                    name: "Fields",
                    value: "They can have different fields with small headlines."
                },
                {
                    name: "Masked links",
                    value: "You can put [masked links](http://google.com) inside of rich embeds."
                },
                {
                    name: "Markdown",
                    value: "You can put all the *usual* **__Markdown__** inside of them."
                },
                {
                    name: "Markdown",
                    value: "You can put all the *usual* **__Markdown__** inside of them."
                },
                {
                    name: "Markdown",
                    value: "You can put all the *usual* **__Markdown__** inside of them."
                },
                {
                    name: "Markdown",
                    value: "You can put all the *usual* **__Markdown__** inside of them."
                }
            ],
            timestamp: new Date(),
            footer: {
                icon_url: 'https://www.dotabuff.com/assets/heroes/kunkka-6cdf5afd83d2cc5a167771bbd2c12f4a9751bbcae22dbc629d6302e751ee2e43.jpg',
                text: "© Example"
            }
        }

*/