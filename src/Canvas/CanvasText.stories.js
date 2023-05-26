import React, { useRef, useState } from 'react';
import { Canvas, TextLayer } from '../index';

export default {
	title: 'Canvas',
};

export const CanvasText = () => {
	const [ratio, setRatio] = useState({
		width: 1920,
		height: 1080,
	});
	const canva = useRef();

	return (
		<>
			<div>
				<Canvas
					inline
					width={ratio.width}
					height={ratio.height}
					ref={canva}
					CompositionStyle={{
						backgroundColor: 'black',
					}}
				>
					<TextLayer
						ratio={ratio}
						id={1}
						name={
							`fade in`.replaceAll(' ', '_') +
							Math.floor(Math.random() * 1000 + 1)
						}
						delay={0}
						style={{
							opacity: 0,
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
						textColor="#00FFFF"
					/>
				</Canvas>
			</div>
		</>
	);
};
