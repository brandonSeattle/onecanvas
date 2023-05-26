import React, { useState } from 'react';
import { Layer } from './Layer';
import { JsCanvasContext } from '../../util/useJsCanvas';
import Scene from 'scenejs';

export default {
	title: 'Canvas Layer',
};

export const LayerStory = () => {
	return (
		<JsCanvasContext.Provider
			value={new Scene(
				{},
				{
					easing: 'ease-in-out',
					fillMode: 'forwards',
					selector: true,
				}
			).setTime(0)}
		>
			<Layer
				id={1}
				name="raindrop"
				width={300}
				height={300}
				delay={0.4}
				keyframes={{
					0: {
						'border-width': '150px',
						opacity: 1,
						transform: 'translate(0, 0) scale(0)',
					},
					1.5: { 'border-width': '0px', opacity: 0.3, transform: 'scale(0.7)' },
				}}
				style={{
					border: '100px solid black',
					borderRadius: '50%',
					boxSizing: 'border-box',
					transform: 'scale(0)',
				}}
				iteration="infinite"
			></Layer>
		</JsCanvasContext.Provider>
	);
};
