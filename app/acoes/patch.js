const PATCH = {
    versao: '7.06e',
    herois: [{
        nome: 'Alchemist',
        avatar: 'http://cdn.dota2.com/apps/dota2/images/heroes/alchemist_full.png',
        mudancas: [
            'Base Agility increased from 11 to 16',
            'Greevil\'s Greed Bounty Rune multiplier increased from 2x to 2.5x'
        ]
    }],
    itens: [{}],
    globais: [
        'Neutral small camps gold bounty increased by 10%',
    ]
}


exports.MudancasHeroi = (nome, callback) => {
    let heroi = FindValue(PATCH.herois, 'nome', nome)

    let mensagem = {
        color: 3447003,
        author: {
            name: `${PATCH.herois[heroi].nome}`,
            icon_url: `${PATCH.herois[heroi].avatar}`
        },
        fields: [],
        timestamp: new Date(),
        footer: {
            icon_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Aperture_Science.svg/1200px-Aperture_Science.svg.png',
            text: "© Aperture Laboratories"
        }
    }
    let resposta = {
        name: '**Mudanças**'
    }
    let changes = '\r\n'

    //PATCH.herois[heroi].nome
    console.log(PATCH.herois[heroi].mudancas.length)
    for (let i = 0; i < PATCH.herois[heroi].mudancas.length; i++) {
        changes = changes + PATCH.herois[heroi].mudancas[i] + '\r\n'
    }
    resposta.value = changes

    mensagem.fields.push(resposta)

    callback(mensagem)
}

var FindValue = (obj, key, value) => {
    for (var i = 0; i < Object.keys(obj).length; i++) {
        if (obj[i][key] == value) {
            return i
        }
    }
    return null
}