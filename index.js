console.log("Oi, estou pronto para ajudar meus amiguinhos!!!");

const Discord = require('discord.js');
const ytdl = require("ytdl-core");
const Config = require('./config.js');
const Matheuszinho = new Discord.Client();
const command_key = Config.command_key;

const roll = require('./modules/roll.js')

//empty obj to create server queues, dont need to use in a single server
var servers = {};

function play(connection, message){
	var server = servers[message.guild.id];
	message.channel.send('tocando: ' + server.queue[0]);
	server.dispatcher = connection.playStream(ytdl(server.queue[0], {
		filter: "audioonly"
	}),
	{
		seek : 0,
		volume : 0.1
	});

	connection.on('error', (err) =>{
		console.log("err : ", err);
	});

	server.queue.shift();

	server.dispatcher.on("end", function(){
		if (server.queue[0])play(connection, message);
		else connection.disconnect();
	});
}

// Inicializa os atributos do Matheuszinho
Matheuszinho.on('ready', () => {
	Matheuszinho.user.setActivity('Quero Ajudar')
})
Matheuszinho.on('message', (message) => {
	//Para o bot não usar os próprios comandos
	if(message.author.equals(Matheuszinho.user)) return;

	//Comandos
	if(!(message.content.substring(0,command_key.length) == command_key)) return;
	var args = message.content.substring(command_key.length).split(" ");

	switch(args[0].toLowerCase()){
		case 'ping':
		message.channel.send('pong!');
			break;

		case 'roll':
			var outputs = roll(args.slice(1));
			message.channel.send(outputs);
			break;

		case 'play':
			if(!args[1])message.channel.send('Vou tocar oque, se você não me deu um link? Idiota ...');
			if(!message.member.voiceChannel)message.channel.send('Vou tocar aonde se você não está num canal? Estou cercado de idiotas ...');
			if(!servers[message.guild.id]) servers[message.guild.id] = {queue: [] };
			var server = servers[message.guild.id];
			server.queue.push(args[1]);
			if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
				play(connection, message);
			});
			break;

		case 'skip':
			var server = servers[message.guild.id];
			if(server.dispatcher) server.dispatcher.end();
			break;

		case 'stop':
			var server = servers[message.guild.id];
			server.queue = [];
			if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
			break;

		default:
			message.channel.send('Oque você queria dizer com essa merda?');

  }
});

Matheuszinho.login(Config.botKey);
