import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../Canvas/Canvas.css';
import MediaScene from '../media';
import { JsCanvasContext } from '../../util/useJsCanvas';

const VideoLayer = ({
	name,
	id,
	video,
	ratio,
	keyframes,
	style,
	volume,
	playSpeed,
	delay,
	iteration,
	seekStart,
	seekEnd,
}) => {
	const jsCanvas = useContext(JsCanvasContext);
	console.log('jsCanvas', jsCanvas);
	const baseName = name.replaceAll(' ', '_') + id;
	let media = new MediaScene();
	useEffect(() => {
		let videoObj = document.getElementById(`#${name + id}`);

		let theDuration = jsCanvas.getDuration();
		let newMedia = media.addMedia(name + id, videoObj);

		newMedia
			.seek(seekStart, seekEnd ? seekEnd : theDuration)
			.setVolume(volume)
			.setPlaySpeed(playSpeed)
			.setDelay(delay);
		jsCanvas.setItem('video', newMedia);
	}, []);

	return (
		<div
			data-testid={`Layer-${baseName}`}
			className={`Layer-${baseName}`}
			style={{
				position: 'absolute',
				width: ratio.width,
				height: ratio.height,
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
				margin: 'auto',
				...style,
			}}
		>
			<video
				id={`#${name + id}`}
				src={video}
				width={ratio.width}
				height={ratio.height}
			/>
		</div>
	);
};

VideoLayer.defaultProps = {
	name: 'video',
	id: 1,
	video:
		'https://one-minute-video.s3.us-west-2.amazonaws.com/development/default_video/4ad0ea88c77db8fe4242775d2389ac1e.mp4',
	ratio: {
		width: 1080,
		height: 720,
	},
	keyframes: {},
	style: {},
	volume: 1,
	playSpeed: 1,
	delay: 0,
	seekStart: 0,
	seekEnd: 0.452,
	iteration: 'infinite',
};

VideoLayer.propTypes = {
	name: PropTypes.string,
	id: PropTypes.number,
	ratio: PropTypes.object,
	volume: PropTypes.number,
	keyframes: PropTypes.object,
	style: PropTypes.object,
	video: PropTypes.string,
	playSpeed: PropTypes.number,
	delay: PropTypes.number || PropTypes.string,
	seekStart: PropTypes.number,
	seekEnd: PropTypes.number,
	iteration: PropTypes.any,
};

export { VideoLayer };
