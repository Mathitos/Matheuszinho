module.exports = function(args){
	const Invalid_Command = 'Você é burro ou só idiota?' + '\n' +
													'O comando tem que ser !roll <numero de dados>d<numero de faces dos dados>';
	var outputs = [];
	if (args.length < 1){
		outputs.push(Invalid_Command);
		return;
	}
	for(text of args){
		if((text.length < 2) || text == null){
			outputs.push(Invalid_Command);
		}
		var i = 0;
		if(!isNaN(text.charAt(i))){
			var number_of_rolls = 0;
			while(!isNaN(text.charAt(i))){
				number_of_rolls = number_of_rolls * 10;
				number_of_rolls += parseInt(text.charAt(i));
				i++;
			}

		}else{
			var number_of_rolls = 1;
		}
		if(text.charAt(i) != 'd'){
			return [Invalid_Command];
		}else{
			i ++;
		}
		var number_of_faces = 0;
		while(i < text.length){
			if(isNaN(text.charAt(i))){
				outputs.push(Invalid_Command);
			}else{
				number_of_faces = number_of_faces * 10;
				number_of_faces += parseInt(text.charAt(i));
			}
			i++;
		}
		var rolls = [];
		for(var dice = 1; dice <= number_of_rolls; dice ++){
			var result = Math.floor(Math.random() * (number_of_faces));
			rolls.push(result + 1);
		}
		var output = "Resultado(s) de " + number_of_rolls + 'd' + number_of_faces + ': ';
		for(roll of rolls){
			output += roll + ', '
		}
		output = output.slice(0, -2);//retirar a ultima virgula
		output += ' = ' + rolls.reduce(function(a, b) { return a + b; }, 0);
		outputs.push(output);
	}
	return outputs;
}
