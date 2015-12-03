var _ = require('lodash');
var config = require('./config.js');
var client = require('twilio')(config.twilio.sid, config.twilio.token);

var people = config.people;
var attempts = 5
var matches = false;

for (attempts; attempts >= 0; attempts--) {
  if (!matches) {
    matches = createPairs(people);
    attempts--;
  } else {
    break;
  }
}

if (matches) {
  var resultText = '';
  matches.forEach(match => {
    console.log('${match[0].name} -> ${match[1].name}');
    /*client.messages.create({
	body: 'Merry Christmas! You're being Santa for ${match[1].name}',
	from: config.twilio.number,
	to: match[0].number,
    }, function(err, message) {
	if (err) {
	    console.log(err);
        } else {
	    console.log('message sent');
	}
    });*/
  });
} else {
  console.log("Error: Could not create matches");
  process.exit();
}

function createPairs(people) {
  var retVal = false;

  if (people.length > 0) {
    var receivers = _.clone(people);
    var matches = [];

    for (var i in people) {
      var sender = people[i];

      if (receivers.length === 1 && receivers[0].number === sender.number) {
        return retVal;
      }

      do {
        var receiverIndex = _.random(0, receivers.length-1);
	receiver = receivers[receiverIndex];
      } while (receiver.number === sender.number || receiver.name === sender.so);

      matches.push([sender, receiver]);
      receivers.splice(receiverIndex, 1);
      
    }

    if (matches.length > 0) {
      retVal = matches;
    }
  }
 
  return retVal;
}
