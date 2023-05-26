import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../Canvas/Canvas.css';
import { ImageLayer } from './ImageLayer';
import { v4 as uuidv4 } from 'uuid';
import { Layer } from './Layer';
import { JsCanvasContext } from '../../util/useJsCanvas';

const SplitOutLayer = ({
	name,
	id,
	ratio,
	keyframes,
	keyframesImage,
	keyframesText,
	style,
	textLayerStyle,
	text,
	playSpeed,
	delay,
	splitDelay,
	iteration,
	foreground,
}) => {
	const jsCanvas = useContext(JsCanvasContext);
	const baseName = name.replaceAll(' ', '_') + id;
	const [frontlayers, setFrontLayers] = useState([]);
	const gridX = 4;
	const gridY = 3;

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

		let afterTop = 0;
		let afterLeft = 0;
		let afterWidth = 0;
		let afterHeight = 0;

		for (let x = 0; x < gridX; x++) {
			for (let y = 0; y < gridY; y++) {
				let width = ((ratio.width / gridX) * 100) / ratio.width + '%',
					height = ((ratio.height / gridY) * 100) / ratio.height + '%',
					top = ((ratio.height / gridY) * y * 100) / ratio.height + '%',
					left = ((ratio.width / gridX) * x * 100) / ratio.width + '%',
					bgPosX = -((ratio.width / gridX) * x) + 'px',
					bgPosY = -((ratio.height / gridY) * y) + 'px';

				const newId = uuidv4().replaceAll('-', '');

				let centerTransitions =
					(x === 1 && y === 1) || (x === 2 && y === 1)
						? {
								2: {
									opacity: 0,
								},
						  }
						: {};

				if (x === 1 && y === 1) {
					afterTop = top;
					afterLeft = left;
					afterHeight = height;
				}
				if (x === 2 && y === 1) {
					afterWidth = parseInt(width) * 2 + '%';
				}
				theLayers.push(
					<ImageLayer
						key={newId}
						img={img}
						name={'foreground' + baseName + x + y}
						delay={splitDelay}
						id={x + y}
						keyframes={{ ...keyframesImage, ...centerTransitions }}
						iteration={1}
						style={{
							top: top,
							left: left,
							width: width,
							height: height,
							position: 'absolute',
							backgroundPosition: bgPosX + ' ' + bgPosY,
							backgroundSize: `center center`,
						}}
						ratio={{ width: width, height: height }}
					/>
				);
			}
		}

		const newExtraId = uuidv4().replaceAll('-', '');
		theLayers.push(
			<Layer
				key={newExtraId}
				ratio={ratio}
				id={newExtraId}
				name={`fade in text`}
				delay={splitDelay * 2}
				style={{
					margin: 0,
					top: afterTop,
					left: afterLeft,
					width: afterWidth,
					height: afterHeight,
					position: 'absolute',
					transform: `scale(75%)`,
				}}
				keyframes={keyframesText}
				iteration={1}
			>
				<div
					style={{
						fontSize: 30,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100%',
						width: '100%',
						...textLayerStyle,
					}}
				>
					{text}
				</div>
			</Layer>
		);

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

SplitOutLayer.defaultProps = {
	name: 'splitOutAnimation',
	id: 1,
	ratio: {
		width: 1080,
		height: 720,
	},
	keyframes: {},
	keyframesImage: {},
	keyframesText: {},
	style: {},
	textLayerStyle: {},
	text: 'Hello There .....',
	playSpeed: 1,
	delay: 0,
	splitDelay: 0,
	iteration: 'infinite',
	foreground: '',
};

SplitOutLayer.propTypes = {
	name: PropTypes.string,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	ratio: PropTypes.object,
	keyframes: PropTypes.object,
	keyframesImage: PropTypes.object,
	keyframesText: PropTypes.object,
	style: PropTypes.object,
	textLayerStyle: PropTypes.object,
	text: PropTypes.string,
	playSpeed: PropTypes.number,
	delay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	splitDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	iteration: PropTypes.any,
	foreground: PropTypes.string,
};

export { SplitOutLayer };
