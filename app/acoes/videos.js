const rp = require('request-promise')

exports.FindVideo = (consulta, callback) => {
    MontarConsulta(consulta, (nome) => {
        rp.get(`https://www.googleapis.com/youtube/v3/search?part=id&q=${nome}&type=video&key=AIzaSyCTtHl4lR5FLSjNjydyczcSK26OilsTnPM`)
            .then((html) => {
                MontarUrlVideo(html, (video) => {
                    callback(video)
                })
            })
            .catch((erro) => {
                console.log(`Erro: ${erro}`)
            })
    })
}

exports.DotaWTF = (quantidade, callback) => {
    rp.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTtHl4lR5FLSjNjydyczcSK26OilsTnPM&channelId=UC18NaGQLruOEw65eQE3bNbg&part=snippet,id&order=date&maxResults=${quantidade}`)
        .then(html => {
            DotaWTFVideos(html, (videos) => {
                callback(videos)
            })
        })
        .catch(erro => {

        })
}

var DotaWTFVideos = (html, callback) => {
    let videos = JSON.parse(html.toString())
    let resposta = '\r\n'

    for (let i = 0; i < videos['items'].length; i++) {
        resposta = resposta + `https://www.youtube.com/watch?v=${videos['items'][i].id.videoId}` + '\r\n'
    }
    callback(resposta)
}

var MontarUrlVideo = (html, callback) => {
    let videos = JSON.parse(html.toString())

    callback(`https://www.youtube.com/watch?v=${videos['items'][0].id.videoId}`)
}

var MontarConsulta = (consulta, callback) => {
    let query = consulta.replace(/\/video/g, '').trim()

    callback(query)
}

//https://www.googleapis.com/youtube/v3/search?part=id&q=Dota%202%20WTF%20Moments%20236&type=video&key=AIzaSyCTtHl4lR5FLSjNjydyczcSK26OilsTnPM