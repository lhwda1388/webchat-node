 
var pubsub = require('../../modules/redis/pubsub')
var pub = pubsub.pub
var sub = pubsub.sub
var chatPub = {
  name: 'chatPub',
  isSub: false
}
module.exports = function (io) {
  var chatNsp = io.of('/chat')
  sub.on('message', function (channel, data) {
    if (channel === chatPub.name) {
      var parseData = JSON.parse(data)
      console.log(`redis message : ${channel}, data: ${data}`)
      // chatNsp.emit('receive', parseData);
      chatNsp.to(parseData.room).emit('receive', parseData);
    }
  });
  chatNsp.on('connection', (cliSocket) => {
    console.log(`chat connection `);

    cliSocket.on('roomJoin', (room) => {
      sub.subscribe(chatPub.name)
      cliSocket.join(room)
    })

    cliSocket.on('send', ({ msg, uid, room}) => {
      console.log(`send ${msg}, ${uid}, ${room}`);
      pub.publish(chatPub.name, JSON.stringify({
        msg: msg,
        uid: uid,
        room: room
      }));
    });
    cliSocket.on('disconnect', function () {
      console.log('disconnect')
      // sub.quit();
    })
  });
}