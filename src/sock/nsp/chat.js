 
var pubsub = require('../../modules/redis/pubsub')
var pub = pubsub.pub
var sub = pubsub.sub

module.exports = function (io) {
  var chatNsp = io.of('/chat')
  console.log('chatpub !!!!!!!!!!!!')
  sub.subscribe('chatPub');
  chatNsp.on('connect', (socket) => {
    console.log(`chat connection `);
    sub.on('message', function (channel, data) {
      if (channel === 'chatPub') {
        console.log(`redis message : ${channel}, data: ${data}`)
        chatNsp.emit('receive', JSON.parse(data));
      }
    });
    socket.on('send', ({ msg, uid }) => {
      console.log(`send ${msg}, ${uid}, ${socket.id}`);
      pub.publish('chatPub', JSON.stringify({
        msg: msg,
        uid: uid
      }));
    });
  });
}