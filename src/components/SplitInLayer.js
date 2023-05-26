import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../Canvas/Canvas.css';
import { ImageLayer } from './ImageLayer';
import { v4 as uuidv4 } from 'uuid';
import { Layer } from './Layer';
import { JsCanvasContext } from '../../util/useJsCanvas';

const SplitInLayer = ({
	name,
	id,
	ratio,
	keyframes,
	style,
	textLayerStyle,
	text,
	playSpeed,
	delay,
	sliceDelay,
	iteration,
	foreground,
	gridX,
	gridY,
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
		let afterTop = 0;
		let afterLeft = 0;
		let afterWidth = 0;
		let afterHeight = 0;

		for (let x = 0; x < gridX; x++) {
			let cropRatio = x % 2 === 0 ? 98 : 100;
			for (let y = 0; y < gridY; y++) {
				let width = ((ratio.width / gridX) * cropRatio) / ratio.width + '%',
					height = ((ratio.height / gridY) * 95) / ratio.height + '%',
					top = ((ratio.height / gridY) * y * 100) / ratio.height + '%',
					left = ((ratio.width / gridX) * x * 100) / ratio.width + '%',
					bgPosX = -((ratio.width / gridX) * x) + 'px',
					bgPosY = -((ratio.height / gridY) * y) + 'px';

				const newId = uuidv4().replaceAll('-', '');

				let translate = y % 2 === 0 ? '200%' : '-200%';

				theLayers.push(
					<ImageLayer
						key={newId}
						img={img}
						name={'foreground' + baseName + x + y}
						delay={delay * y}
						id={x + y}
						keyframes={{
							0: {
								opacity: 1,
								transform: `translate(${translate}, 0)`,
							},
							2: {
								opacity: 1,
								transform: `translate(0, 0)`,
							},
							4: {
								opacity: 1,
							},
							4.5: {
								opacity: 0,
							},
						}}
						iteration={1}
						style={{
							top: top,
							left: left,
							width: width,
							height: height,
							position: 'absolute',
							backgroundPosition: bgPosX + ' ' + bgPosY,
							backgroundSize: ratio.width + 'px',
						}}
						ratio={{ width: width, height: height }}
					/>
				);

				if (gridY - 2 === y) {
					afterTop = top;
					afterLeft = left;
					afterWidth = width;
					afterHeight = height;
				}
			}
		}

		const newExtraId = uuidv4().replaceAll('-', '');
		theLayers.push(
			<Layer
				key={newExtraId}
				ratio={ratio}
				id={newExtraId}
				name={`fade out text`}
				delay={delay + sliceDelay}
				style={{
					margin: 0,
					top: afterTop,
					left: afterLeft,
					width: afterWidth,
					height: afterHeight,
					position: 'absolute',
					backgroundColor: '#000',
				}}
				keyframes={{
					0: {
						opacity: 1,
						transform: 'translate(200%, 0)',
					},
					1: {
						opacity: 1,
						transform: 'translate(0, 0)',
					},
					2.8: {
						opacity: 1,
					},
					3: {
						opacity: 0,
					},
				}}
				iteration={1}
			>
				<div
					style={{
						color: '#fff',
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
				// backgroundColor: '#000',
				...style,
			}}
		>
			{frontlayers}
		</div>
	);
};

SplitInLayer.defaultProps = {
	name: 'splitInAnimation',
	id: 1,
	ratio: {
		width: 1080,
		height: 720,
	},
	keyframes: {},
	style: {},
	textLayerStyle: {},
	text: 'Hello There .....',
	playSpeed: 1,
	delay: 0,
	sliceDelay: 0,
	iteration: 'infinite',
	foreground: '',
	gridX: 5,
	gridY: 1,
};

SplitInLayer.propTypes = {
	name: PropTypes.string,
	id: PropTypes.number,
	ratio: PropTypes.object,
	keyframes: PropTypes.object,
	style: PropTypes.object,
	textLayerStyle: PropTypes.object,
	text: PropTypes.string,
	layerStyle: PropTypes.object,
	playSpeed: PropTypes.number,
	delay: PropTypes.number || PropTypes.string,
	sliceDelay: PropTypes.number || PropTypes.string,
	iteration: PropTypes.any,
	foreground: PropTypes.string,
	gridX: PropTypes.number,
	gridY: PropTypes.number,
};

export { SplitInLayer };
