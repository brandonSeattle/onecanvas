import React, { useRef, useState } from 'react';
import { Canvas } from './Canvas';
import { Layer } from '../components/Layer';
import { AudioLayer } from '../components/AudioLayer';
import { VideoLayer } from '../components/VideoLayer';

export default {
	title: 'Canvas',
};

export const BaseInlineCanvas = () => {
	const [ratio, setRatio] = useState({
		width: 1920,
		height: 1080,
	});
	const canva = useRef();
	const canva2 = useRef();

	return (
		<>
			<div>
				<Canvas
					inline
					width={ratio.width}
					height={ratio.height}
					ref={canva}
					showTimer
				>
					<Layer
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
								opacity: 0,
								transform: 'translate(-50%, 0)',
							},
							9: {
								opacity: 1,
								transform: 'translate(-50%, 0)',
							},
							0.9: { opacity: 1, transform: 'translate(0, 0)' },
						}}
						iteration={1}
					>
						<img
							width="100%"
							src="https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928__480.jpg"
						/>
					</Layer>
					<AudioLayer
						play={false}
						id={3}
						delay={0}
						seekStart={3}
						seekEnd={13}
					/>
				</Canvas>

				<button
					onClick={() => {
						canva.current.duration();
					}}
				>
					Stop canvas
				</button>
			</div>
		</>
	);
};
