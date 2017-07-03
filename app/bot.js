/*const PICKS = require('./acoes/picks')
const VIDEOS = require('./acoes/videos')*/
const BOT = {
    PICKS: require('./acoes/picks'),
    VIDEOS: require('./acoes/videos'),
    PATCH: require('./acoes/patch')
}

module.exports = (client) => {

    client.login('--bot-id')

    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });
    //BOT.PATCH.MudancasHeroi('')
    Monitorar(client)
 //   PICKS.LANES()

}



var Monitorar = (client) => {
    client.on('message', msg => {
        if (msg.content.indexOf('/lane') > -1) {
            BOT.PICKS.LANES(msg.content, (mensagem) => {
                EnviarMensagem(msg, '', mensagem)
            })
        }
        if (msg.content.indexOf('/video') > -1) {
            BOT.VIDEOS.FindVideo(msg.content, (video_url) => {
                EnviarMensagem(msg, video_url, '')
            })
        }
        if (msg.content.indexOf('/dota-wtf') > -1) {
            BOT.VIDEOS.DotaWTF(msg.content.replace('/dota-wtf', '').trim(), (mensagem) => {
                EnviarMensagem(msg, mensagem, '')
            })
        }
        if (msg.content.indexOf('/patch') > -1) {
            BOT.PATCH.MudancasHeroi(msg.content.replace('/patch', '').trim(), (mensagem) => {
                EnviarMensagem(msg, '', mensagem)
            })
        }
    });
}

var EnviarMensagem = (msg, mensagem, embed) => {
    msg.reply(mensagem, {
        embed: embed,
    })
     .then(top => {
         console.log(top)
     })
     .catch(erro => {
         console.log(erro)
     })
}

var VerificarMensagem = (mensagem) => {

}