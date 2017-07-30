var schedule = require('node-schedule');
 
var j = schedule.scheduleJob('* * 10 0  * *', function(){
  console.log('The answer to life, the universe, and everything!');

  console.log(new Date())
});