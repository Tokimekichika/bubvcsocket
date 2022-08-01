const ws = require('ws');

const wss = new ws.Server({
    port: 5000,
}, () => console.log(`Server started on 5000`))


wss.on('connection', function connection(ws) {
    const clientRooms = new Map()
    ws.on('message', function (message) {
        message = JSON.parse(message)
        console.log (message)
        switch (message.event) {
            case 'message':
                // console.log (message.message)
                broadcastMessage(message)
                break;
            case 'connection':
                console.log ('ETO CONNECTION=>>>',message)
                break;
            case 'test':
                // console.log ('eto tst', message)
                broadcastMessage(message)
                break;
            case 'ROOM_CREATED':
                clientRooms.set(message.roomId,{player1:message.username})
                console.log(clientRooms)
                break;
            case 'JOIN_ROOM':
                const roomWithUsers = clientRooms.get(message.roomId)
                // console.log (roomWithUsers)
                if(roomWithUsers){
                    roomWithUsers.player2 = message.username
                broadcastMessage({event:'2_PLAYERS_CONNECTED'})
                }
                break;

        }
        ws.emit('isReady', () => {
            console.log ('qqqqqqqqqqqqqqq')
        })
    })
    // ws.on('ready', function (message) {
    //     message = JSON.parse(ready)
    //     switch (message.event) {
    //         case 'ready':
    //             console.log ('qweqweqwe')
    //            isReady(message.ready)
    //
    //     }
    // })
})

function broadcastMessage(message, id) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}


// function isReady(message,id) {
//     wss.clients.forEach(client => {
//         client.send(JSON.stringify(message))
//     })
// }
