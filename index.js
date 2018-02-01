console.log("Oi, estou pronto para ajudar meus amiguinhos!!!");

const Discord = require('discord.js');
const Config = require('./config.js');
const Matheuszinho = new Discord.Client();
const comand_key = Config.command_key;

const roll = require('./modules/roll.js')

//empty obj to create server queues, dont need to use in a single server
var servers = {};

Matheuszinho.on('message', (message) => {

  if(message.content[0] == comand_key){
    text_content = message.content.substring(1,message.content.lenght);
    if(text_content == 'ping'){
      message.channel.send('pong!');
    }else if(text_content.substring(0, 4) == 'roll'){
			message.channel.send('Vou rolar: ' + text_content.substring(4, text_content.length));
			var rolls = roll(text_content.substring(4, text_content.length));
			message.channel.send('Resultado: ' + rolls);
			for(var i = 0; i < rolls.length; i++){
				if(isNaN(rolls[i])){
					message.channel.send(rolls[i]);
				} else{
					message.channel.send('Dado ' + i + ': ' + rolls[i]);
					if(rolls[i] == 1){
						message.channel.send('\nSe fudeu!' + '\n' + ' hahahahahahahha')
					}
				}
			}
    }



  }
});

Matheuszinho.login(Config.botKey);
