import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../Canvas/Canvas.css';
import { JsCanvasContext } from '../../util/useJsCanvas';

const TextLayer = ({
	text,
	name,
	id,
	ratio,
	keyframes,
	style,
	textLayerStyle,
	playSpeed,
	delay,
	iteration,
	textColor,
}) => {
	const jsCanvas = useContext(JsCanvasContext);
	const baseName = name.replaceAll(' ', '_') + id;

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
	}, [name, keyframes, iteration]);

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
				pointerEvents: 'auto',
				cursor: 'default',
				...style,
			}}
		>
			<div
				style={{
					fontSize: 30,
					position: 'absolute',
					...textLayerStyle,
				}}
			>
				<div style={{ color: textColor }}>{text}</div>
			</div>
		</div>
	);
};

TextLayer.defaultProps = {
	name: 'textAnimation',
	id: 1,
	ratio: {
		width: 1080,
		height: 720,
	},
	keyframes: {},
	style: {},
	playSpeed: 1,
	delay: 0,
	text: 'Hello Text . . .',
	iteration: 'infinite',
};

TextLayer.propTypes = {
	name: PropTypes.string,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	ratio: PropTypes.object,
	keyframes: PropTypes.object,
	style: PropTypes.object,
	layerStyle: PropTypes.object,
	textLayerStyle: PropTypes.object,
	playSpeed: PropTypes.number,
	delay: PropTypes.number || PropTypes.string,
	text: PropTypes.string,
	iteration: PropTypes.any,
	textColor: PropTypes.string,
};

export { TextLayer };
