const { findChannelLeft, strSortFn } = require("./helperFunctions.js");

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
		let quitEvent;
		let channelsLeft;

		this.processing_buffer = true;

		while (processedEvents < numOfEvents && this.quitBuffer.length > 0) {
			quitEvent = this.quitBuffer.shift();

			if (!quitEvent) {
				continue;
			}

			channelsLeft = findChannelLeft(
				this.userChannels,
				quitEvent.nick.toLowerCase()
			);

			channelsLeft.forEach(channel => {
				this.socket.emit("left channel", {
					...quitEvent,
					channel: channel.name
				});
				this.socket.emit("users list", {
					channelName: channel.name,
					users: channel.users.sort(strSortFn)
				});
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
