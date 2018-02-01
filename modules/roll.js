module.exports = function(text){
	const Invalid_Command = 'Você é burro ou só idiota?' + '\n' + 'O comando tem que ser !roll <numero de dados>d<numero de faces dos dados>';
	if((text.length < 2) || text == null){
		return [Invalid_Command];
	}
	var i = 1;
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
			return [Invalid_Command];
		}else{
			number_of_faces = number_of_faces * 10;
			number_of_faces += parseInt(text.charAt(i));
		}
		i++;
	}
	var rolls = [];
	for(var dice = 1; dice <= number_of_rolls; dice ++){
		var result = Math.floor(Math.random() * number_of_faces);
		rolls.push(result);
	}
	return rolls;
}
