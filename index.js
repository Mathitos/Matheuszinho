console.log("oi");
const Discord = require('discord.js');
const Matheuszinho = new Discord.Client();

Matheuszinho.on('message', (message) => {

  if(message.content == 'ping'){
    message.channel.send('pong!');
  }
});

Matheuszinho.login('NDA4MTIxODQyMzUyNjUyMjg4.DVLcpg.P1z8jTA0RNTNrApMDZgaYGuZ5WE');
