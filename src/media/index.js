import Scene from 'scenejs';
import Media from './Media';
export default class MediaScene extends Scene {
	constructor() {
		super();
		this.playInfos = {};
	}
	/**
	 * add video or audio mediaInfo
	 * @param id
	 * @param url
	 */
	addMedia(id, url = id) {
		const media = new Media(url);
		this.setItem(id, media);
		return media;
	}
	getInfo() {
		const info = {
			duration: 0,
			medias: [],
		};
		this.forEach((media) => {
			info.medias.push(media.getInfo());
		});
		info.duration = this.getDuration();
		return info;
	}
}
