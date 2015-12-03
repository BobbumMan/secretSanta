"use strict";
const _ = require('lodash');
const config = require('./config.js');
const client = require('twilio')(config.twilio.sid, config.twilio.token);

const people = config.people;
let attempts = 5
let matches = false;

for (attempts; attempts >= 0; attempts--) {
  if (!matches) {
    matches = createPairs(people);
    attempts--;
  } else {
    break;
  }
}

if (matches) {
  let resultText = '';
  matches.forEach(match => {
    console.log(`${match[0].name} -> ${match[1].name}`);
    /*client.messages.create({
	body: `Merry Christmas! You're being Santa for ${match[1].name}`,
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
  console.log('Error: Could not create matches');
  process.exit();
}

function createPairs(people) {
  let retVal = false;

  if (people.length > 0) {
    let receivers = _.clone(people);
    let matches = [];

    for (var i in people) {
      const sender = people[i];

      if (receivers.length === 1 && receivers[0].number === sender.number) {
        return retVal;
      }

      do {
        const receiverIndex = _.random(0, receivers.length-1);
	const receiver = receivers[receiverIndex];
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
