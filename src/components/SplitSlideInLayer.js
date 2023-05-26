import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../Canvas/Canvas.css';
import { ImageLayer } from './ImageLayer';
import { JsCanvasContext } from '../../util/useJsCanvas';

const SplitSlideInLayer = ({
	name,
	id,
	ratio,
	keyframes,
	style,
	playSpeed,
	delay,
	iteration,
	foreground,
	background,
	gridX,
}) => {
	const jsCanvas = useContext(JsCanvasContext);
	const baseName = name.replaceAll(' ', '_') + id;
	const [frontlayers, setFrontLayers] = useState([]);

	useEffect(() => {
		const newItem = jsCanvas.newItem(`.Layer-${baseName}`, {
			selector: true,
			delay: delay,
			playSpeed: playSpeed,
		});
		newItem.set({
			...keyframes,
			options: {
				delay: delay,
				iteration: iteration,
				playSpeed: playSpeed,
			},
		});
		setFrontLayers(generateSlices(foreground));
	}, [name, keyframes, iteration]);

	const generateSlices = (img) => {
		let theLayers = [];

		for (let x = 0; x < gridX; x++) {
			let width = ((ratio.width / gridX) * 100) / ratio.width + '%',
				left = ((ratio.width / gridX) * x * 100) / ratio.width + '%',
				bgPosX = -((ratio.width / gridX) * x) + 'px';

			theLayers.push(
				<ImageLayer
					key={x}
					img={img}
					name={'foreground' + baseName + x}
					delay={delay + x}
					id={x}
					keyframes={{
						0: {
							opacity: 0,
							transform: `translate(-100%, 0)`,
						},
						0.5: {
							opacity: 1,
							transform: `translate(0, 0)`,
						},
					}}
					iteration={1}
					style={{
						top: 0,
						left: left,
						width: width,
						height: ratio.height,
						position: 'absolute',
						zIndex: x,
						backgroundPosition: bgPosX + ' ' + 0,
						backgroundSize: ratio.width + 'px',
					}}
					ratio={ratio}
				/>
			);
		}

		return theLayers;
	};

	return (
		<div
			data-testid={`Layer-${baseName}`}
			className={`Layer-${baseName}`}
			id={`Layer-${baseName}`}
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
			{frontlayers}
		</div>
	);
};

SplitSlideInLayer.defaultProps = {
	name: 'splitSlideInAnimation',
	id: 1,
	ratio: {
		width: 1080,
		height: 720,
	},
	keyframes: {},
	style: {},
	playSpeed: 1,
	delay: 0,
	iteration: 'infinite',
	foreground: '',
	gridX: 5,
};

SplitSlideInLayer.propTypes = {
	name: PropTypes.string,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	ratio: PropTypes.object,
	keyframes: PropTypes.object,
	style: PropTypes.object,
	layerStyle: PropTypes.object,
	playSpeed: PropTypes.number,
	delay: PropTypes.number || PropTypes.string,
	iteration: PropTypes.any,
	foreground: PropTypes.string,
	gridX: PropTypes.number,
};

export { SplitSlideInLayer };
