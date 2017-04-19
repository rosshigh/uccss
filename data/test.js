var 	Iconv  = require('iconv-lite'),
		fs = require('fs');
	

	let filePath = './data/chico/People-semi.csv';
	var buffer = fs.readFile(filePath, function(err, data){

		result = Iconv.decode(data, "win1252");
		console.log(result)
		// var result = iconv.convert(buffer).toString("utf-8");
		array = result.split('\n');
		console.log(array[265])
	})
