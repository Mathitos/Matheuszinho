console.log("Oi, estou pronto para ajudar meus amiguinhos!!!");

const Discord = require('discord.js');
const Config = require('./config.js');
const Matheuszinho = new Discord.Client();
const command_key = Config.command_key;

const roll = require('./modules/roll.js')

//empty obj to create server queues, dont need to use in a single server
var servers = {};


// Inicializa os atributos do Matheuszinho
Matheuszinho.on('ready', () => {
  Matheuszinho.user.setActivity('Quero Ajudar')
})
Matheuszinho.on('message', (message) => {
  //Para o bot não usar os próprios comandos
  if(message.author.equals(Matheuszinho.user)) return;

  //Comandos
  if(message.content[0] == command_key){
    var args = message.content.substring(command_key.length).split(" ");

    switch(args[0].toLowerCase()){
      case 'ping':
        message.channel.send('pong!');
        break;
      case 'roll':
        var outputs = roll(args.slice(1));
  			message.channel.send(outputs);
        break;
      default:
        message.channel.send('Invalid Command');

    }
  }
});

Matheuszinho.login(Config.botKey);
