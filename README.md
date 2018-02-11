#sky-remote

A NodeJS module for sending remote control commands to a Sky TV box. Works with Sky+HD and SkyQ.

## Usage

#### Installation

```
npm install sky-remote
```

#### Simple example

```javascript

var SkyRemote = require('sky-remote');

var remoteControl = new SkyRemote('192.168.0.40');

// Simple - just send a command
remoteControl.press('power');

// Cool - send sequences of commands
remoteControl.press(['channelup', 'record', 'select']);

// Nice - send commands with a callback
remoteControl.press('channelup', function(err) {
	if (err) {
		console.log("Woah! Something went wrong. Cry time.");
	} else {
		console.log("I just pressed the Channel Up command.");
	};
});

```
### Sky Q (if firmware < 060)

```
var remoteControl = new SkyRemote('192.168.0.40', SkyRemote.SKY_Q_LEGACY);
```

## Remote control commands

`sky` `power`

`tvguide` or `home` `boxoffice` `services` or `search` `interactive` or `sidebar`

`up` `down` `left` `right` `select`

`channelup` `channeldown` `i`

`backup` or `dismiss` `text` `help`

`play` `pause` `rewind` `fastforward` `stop` `record`

`red` `green` `yellow` `blue`

`0` `1` `2` `3` `4` `5` `6` `7` `8` `9`

## See also

- http://github.com/dalhundal/sky-remote-cli - command line app to send remote control commands
- http://github.com/dalhundal/sky-remote-web - web ui to send remote control commands
