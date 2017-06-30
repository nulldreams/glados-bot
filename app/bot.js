module.exports = (client) => {

    client.connect({
        token: 'TXpNd05EUTNNRE14TnpFeE5UWXpOemM1LkREaElUdy56RXN2YXl0N0t6U2hYWHBxY3B4czZkdnIxVkk=' //Será que é esse o token?
    })

    client.Dispatcher.on(Events.GATEWAY_READY, e => {
        console.log("Connected as: " + client.User.username);
    });

    client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
        if (e.message.content == "Bot, quem é o mais noob do dota?")
            e.message.channel.sendMessage("@requena#0406");
    });
}