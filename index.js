console.log("Oi, estou pronto para ajudar meus amiguinhos!!!");

const Discord = require('discord.js');
const ytdl = require("ytdl-core");
const Config = require('./config.js');
const Matheuszinho = new Discord.Client();
const command_key = Config.command_key;

const roll = require('./modules/roll.js');
const playlists = require('./playlists.js')

//empty obj to create server queues, dont need to use in a single server
var servers = {};

function isyoutubevideo(url){
	if (url.startsWith("https://www.youtube.com/watch?v=") || url.startsWith("www.youtube.com/watch?v=")) return true;
	else return false;
}

function shufflePlaylist(playlist) {
    for (let i = playlist.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
    }
}

function play(connection, message){
	var server = servers[message.guild.id];
	server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}),server.musicconfig);

	connection.on('error', (err) =>{
		console.log("err : ", err);
	});
	Matheuszinho.user.setActivity('Tocando uma somzera!! uhuuul!!');

	server.dispatcher.on("end", function(){
		server.queue.shift();
		if (server.queue[0])play(connection, message);
		else {
			Matheuszinho.user.setActivity('Quero Ajudar');
			connection.disconnect();
		}
	});
}

// Inicializa os atributos do Matheuszinho
Matheuszinho.on('ready', () => {
	Matheuszinho.user.setActivity('Quero Ajudar');
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
			args.slice(1).forEach(
				function(arg){
					if (isyoutubevideo(arg)) server.queue.push(arg);
				}
			);
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

		case 'songinfo':
			var server = servers[message.guild.id];
			if (server.queue[0]) message.channel.send('tocando: ' + server.queue[0]);
			else message.channel.send('Não tá tocando nda, você é surdo por acaso?');
			break;

		case 'playlist':
		if(!servers[message.guild.id]) servers[message.guild.id] = {queue: [], musicconfig: {seek : 0, volume : 0.25}};
		var server = servers[message.guild.id];
		if (playlists.hasOwnProperty(args[1])) server.queue = playlists[args[1]].slice();
		if(args[2] == 'suffle') shufflePlaylist(server.queue);
		if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
			play(connection, message);
		});
			break;

		case 'volumeup':
			var server = servers[message.guild.id];
			if(server.musicconfig.volume <= 0.75) server.musicconfig.volume += 0.25;
			else message.channel.send('Vai estorar teus ouvidos guri(a)');
			break;

		case 'volumedown':
			var server = servers[message.guild.id];
			if(server.musicconfig.volume > 0.25) server.musicconfig.volume -= 0.25;
			else message.channel.send('Quer que eu fique mudo? ಥ_ಥ');
			break;

		case 'volume':
			message.channel.send('volume atual: ' + server.musicconfig.volume);
		default:
			message.channel.send('Oque você queria dizer com essa merda? \n\n(╯°□°）╯︵ ┻━┻');

  }
});

Matheuszinho.login(Config.botKey);
