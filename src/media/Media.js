import Scene from 'scenejs';
import { isString } from '@daybrush/utils';

export default class Media extends Scene {
	constructor(url) {
		super();
		this.isPlayMedia = true;
		this.init(url);
	}
	getMediaItem() {
		return this.mediaItem;
	}
	getVolume() {
		return this.mediaItem.get(0, 'volume');
	}
	setVolume(volume) {
		this.mediaItem.set(0, 'volume', volume);
		return this;
	}
	setPlaySpeed(playSpeed) {
		this.mediaItem.setPlaySpeed(playSpeed);
		return this;
	}
	seek(fromTime, toTime) {
		const mediaItem = this.mediaItem;
		mediaItem.set(0, 'seek', fromTime);
		mediaItem.set('100%', 'seek', toTime);
		mediaItem.setDuration(toTime - fromTime);
		return this;
	}
	setElement(element) {
		this.mediaItem.setElement(element);
		return this;
	}
	getMediaElement() {
		return this.mediaItem.getElements()[0];
	}
	getInfo() {
		const mediaItem = this.mediaItem;
		const seek = [mediaItem.get(0, 'seek'), mediaItem.get('100%', 'seek')];
		const playSpeed = mediaItem.getPlaySpeed();
		const volume = this.getVolume();
		const delay = this.getDelay();
		const info = {
			url: this.url,
			seek,
			playSpeed,
			delay,
			volume,
		};
		return info;
	}
	init(url) {
		const mediaItem = this.newItem('media');
		mediaItem.newFrame(0);
		mediaItem.newFrame(1);
		mediaItem.set(0, 'volume', 1);
		mediaItem.set(0, 'seek', 0);
		mediaItem.set('100%', 'seek', 0);
		this.mediaItem = mediaItem;
		if (isString(url)) {
			const audio = new Audio();
			audio.src = url;
			this.setElement(audio);
			this.url = url;
		} else {
			if (url.src) {
				this.url = url.src;
			} else {
				const sourceElement = url.querySelector('[src]');
				this.url = sourceElement ? sourceElement.src : '';
			}
			this.setElement(url);
		}
		let prevTime = 0;
		this.on('paused', (e) => {
			var _a;
			this.isPlayMedia = false;
			(_a = this.getMediaElement()) === null || _a === void 0
				? void 0
				: _a.pause();
		});
		this.on('animate', (e) => {
			const mediaElement = this.getMediaElement();
			mediaElement.muted = false;
			const time = e.time;
			const isReversTime = prevTime > time;
			const isRunning = this.getPlayState() === 'running';
			const isReverse = this.getDirection().indexOf('reverse') > -1;
			const isPlayMedia = this.isPlayMedia;
			const frame = e.frames.media;
			const playSpeed = mediaItem.getPlaySpeed();
			const duration = this.getDuration();
			const volume = this.getVolume();
			const seek = frame.get('seek');
			prevTime = time;
			if (!isRunning || !isPlayMedia) {
				mediaElement.playbackRate = playSpeed * (isReverse ? -1 : 1);
				mediaElement.currentTime = seek;
			}
			if (isReversTime || time <= 0 || duration <= time) {
				// end play
				if (isRunning) {
					this.isPlayMedia = false;
					mediaElement.pause();
				}
			} else {
				mediaElement.volume = volume;
				if (!isPlayMedia && isRunning) {
					this.isPlayMedia = true;
					const result = mediaElement.play();
					if (result instanceof Promise) {
						result.catch(() => {
							mediaElement.muted = true;
							mediaElement.play();
						});
					}
				}
			}
		});
	}
}
