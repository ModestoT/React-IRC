const { findChannelLeft, strSortFn } = require("./helpers/helperFunctions.js");
const { updateUsersList } = require("./helpers/ircHelperFunctions.js");

module.exports = class QuitBuffer {
	constructor(props) {
		this.quitBuffer = [];
		this.processing_buffer = false;

		this.socket = props.socket || null;
		this.userChannels = props.userChannels || null;
	}

	addQuitEvent = quitEvent => {
		this.quitBuffer.push(quitEvent);
		this.processQuitBuffer();
	};

	processQuitBuffer = coninue_process => {
		if (this.processing_buffer && !coninue_process) {
			return;
		}

		let current = this;
		let numOfEvents = 4;
		let processedEvents = 0;

		this.processing_buffer = true;

		while (processedEvents < numOfEvents && this.quitBuffer.length > 0) {
			let quitEvent = this.quitBuffer.shift();

			if (!quitEvent) {
				continue;
			}

			let channelsLeft = findChannelLeft(
				this.userChannels,
				quitEvent.nick.toLowerCase()
			);

			channelsLeft.forEach(channel => {
				this.socket.emit("left channel", {
					...quitEvent,
					channel: channel.name
				});
				updateUsersList(channel, this.socket);
			});

			processedEvents++;
		}

		if (this.quitBuffer.length > 0) {
			setTimeout(() => {
				current.processQuitBuffer(true);
			}, 5);
		} else {
			this.processing_buffer = false;
		}
	};
};
