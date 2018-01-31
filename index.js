console.log("Oi, estou pronto para ajudar meus amiguinhos!!!");
const Discord = require('discord.js');
const Matheuszinho = new Discord.Client();
const comand_key = '!';

Matheuszinho.on('message', (message) => {

  if(message.content[0] == comand_key){
    text_content = message.content.substring(1,message.content.lenght);
    if(text_content == 'ping'){
      message.channel.send('pong!');
    } else
    if(text_content == 'roll d20'){
      message.channel.send(Math.floor(Math.random() * 20));
    }



  }
});

Matheuszinho.login('NDA4MTIxODQyMzUyNjUyMjg4.DVLcpg.P1z8jTA0RNTNrApMDZgaYGuZ5WE');
