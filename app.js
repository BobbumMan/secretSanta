var _ = require('lodash');
var config = require('./config.js');
var client = require('twilio')(config.twilio.sid, config.twilio.token);

var people = config.people;
var attempts = 5
var matches = false;

do {
  matches = createPairs(people);
  attempts--;
} while (!matches && attempts >= 0);

if (matches) {
  var resultText = '';
  for (var i in matches) {
    resultText += matches[i][0].name + ' -> ' + matches[i][1].name + '\n';
    client.messages.create({
	body: "Merry Christmas! You're being Santa for "+matches[i][1].name,
	from: config.twilio.number,
	to: matches[i][0].number,
    }, function(err, message) {
	if (err) {
	    console.log(err);
        } else {
	    console.log("message sent");
	}
    });
  }
} else {
  console.log("Error: Could not create matches");
  process.exit();
}

function createPairs(people) {
  var retVal = false;

  if (people.length > 0) {
    var receivers = _.clone(people),
      matches = [];

    for (var i in people) {
      var sender = people[i];

      if (receivers.length === 1 && receivers[0].number === sender.number) {
        return retVal;
      }

      do {
        var receiverId = _.random(0, receivers.length - 1);
        receiver = receivers[receiverId];
      } while (receiver.number === sender.number || reciever.name === sender.so);

      matches.push([sender, receiver]);
      receivers.splice(receiverId, 1);
      
    }

    if (matches.length > 0) {
      retVal = matches;
    }
  }
 
  return retVal;
}
