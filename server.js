const Discordie = require('discordie')
const Events = Discordie.Events

let client = new Discordie()

require('./app/bot')(client)