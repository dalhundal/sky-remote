var net = require('net');

function SkyRemote(host, port) {

	var that = this;
	this.connectTimeout = 1000;

	function sendCommand(code, cb) {
		var commandBytes = [4,1,0,0,0,0, Math.floor(224 + (code/16)), code % 16];

		var client = net.connect({
			host: host,
			port: port || 49160
		});

		var l = 12;
		client.on('data', function(data) {
			clearTimeout(connectTimeoutTimer)
			// Clear timeout
			if (data.length < 24) {
				client.write(data.slice(0, l))
				l = 1;
			} else {
				client.write(new Buffer(commandBytes), function() {
					commandBytes[1]=0;
					client.write(new Buffer(commandBytes), function() {
						client.destroy();
						cb(null)
					});
				});
			}
		});

		client.on('error', function(err) {
			clearTimeout(connectTimeoutTimer)
			cb(err)
		})

		var connectTimeoutTimer = setTimeout(function() {
			client.end()
			var err = new Error('connect timeout '+host+':'+port)
			err.name = 'ECONNTIMEOUT'
			err.address = host
			err.port = port
			cb(err)
		}, that.connectTimeout)
	}

	this.press = function press(sequence, cb) {
		if (typeof sequence !== 'object' || !sequence.hasOwnProperty('length')) {
			return press(sequence.split(','), cb)
		};
		sendCommand(SkyRemote.commands[sequence.shift()],function(err) {
			if (sequence.length) {
				setTimeout(function() {
					press(sequence, cb);
				},500);
			} else {
				if (typeof cb === 'function') {
					cb(err);
				}
			}
		});
	}

}

SkyRemote.SKY_Q_LEGACY = 5900;
SkyRemote.SKY_Q = 49160; // Keeping for backwards compatability

SkyRemote.commands = {
	power: 0,
	select: 1,
	backup: 2,
	dismiss: 2,
	channelup: 6,
	channeldown: 7,
	interactive: 8,
	sidebar: 8,
	help: 9,
	services: 10,
	search: 10,
	tvguide: 11,
	home: 11,
	i: 14,
	text: 15, 
	up: 16,
	down: 17,
	left: 18,
	right: 19,
	red: 32,
	green: 33,
	yellow: 34,
	blue: 35,
	0: 48,
	1: 49,
	2: 50,
	3: 51,
	4: 52,
	5: 53,
	6: 54,
	7: 55,
	8: 56,
	9: 57,
	play: 64,
	pause: 65,
	stop: 66,
	record: 67,
	fastforward: 69,
	rewind: 71,
	boxoffice: 240,
	sky: 241
}

module.exports = SkyRemote;
