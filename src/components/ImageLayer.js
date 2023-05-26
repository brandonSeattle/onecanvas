import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../Canvas/Canvas.css';
import { JsCanvasContext } from '../../util/useJsCanvas';

const ImageLayer = ({
	name,
	id,
	ratio,
	img,
	keyframes,
	style,
	playSpeed,
	delay,
	iteration,
}) => {
	const jsCanvas = useContext(JsCanvasContext);
	const baseName = name.replaceAll(' ', '_') + id;

	useEffect(() => {
		const newItem = jsCanvas.newItem(`.ImageLayer-${baseName}`, {
			selector: true,
			delay: delay,
			playSpeed: playSpeed,
		});
		newItem.set({
			...keyframes,
			options: {
				easing: 'ease-in-out',
				delay: delay,
				iteration: iteration,
				playSpeed: playSpeed,
			},
		});
	}, [name, keyframes, iteration]);

	return (
		<div
			data-testid={`ImageLayer-${baseName}`}
			className={`ImageLayer-${baseName}`}
			style={{
				...style,
				backgroundImage: 'url(' + img + ')',
				backgroundRepeat: 'no-repeat',
			}}
		/>
	);
};

ImageLayer.defaultProps = {
	name: 'imageAnimation',
	id: 1,
	ratio: {
		width: 1080,
		height: 720,
	},
	img: 'https://assets2.razerzone.com/images/pnx.assets/618c0b65424070a1017a7168ea1b6337/razer-wallpapers-page-hero-mobile.jpg',
	keyframes: {},
	style: {},
	playSpeed: 1,
	delay: 0,
	iteration: 'infinite',
};

ImageLayer.propTypes = {
	name: PropTypes.string,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	ratio: PropTypes.object,
	img: PropTypes.string,
	keyframes: PropTypes.object,
	style: PropTypes.object,
	layerStyle: PropTypes.object,
	playSpeed: PropTypes.number,
	delay: PropTypes.number || PropTypes.string,
	iteration: PropTypes.any,
};

export { ImageLayer };
