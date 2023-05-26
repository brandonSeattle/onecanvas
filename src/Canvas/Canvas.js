import React, {
	forwardRef,
	useContext,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react';
import PropTypes from 'prop-types';
import './Canvas.css';
import Scene from 'scenejs';
import useWindowDimensions from '../../util/useWindowDimensions';
import { JsCanvasContext } from '../../util/useJsCanvas';

const CanvasContainer = forwardRef(
	(
		{
			children,
			width,
			height,
			controls,
			playing,
			fullWidth,
			animationDuration,
			inline,
			CanvasInnerStyle,
			CompositionStyle,
			playerWrapperStyle,
			playerStyle,
			playerButtonStyle,
			playerTrackStyle,
			showTimer,
		},
		ref
	) => {
		const jsCanvas = useContext(JsCanvasContext);
		const canvasRef = useRef(null);
		const [isPlaying, setIsPlaying] = useState(false);
		const [progress, setProgress] = useState(0);
		const [timer, setTimer] = useState('00:00');

		useImperativeHandle(ref, () => ({
			play() {
				jsCanvas.play();
			},
			pause() {
				jsCanvas.pause();
			},
			finish() {
				jsCanvas.finish();
			},
			duration() {
				return jsCanvas.getDuration();
			},
		}));

		const {
			height: windowHeight,
			width: windowWidth,
			scale,
		} = useWindowDimensions(canvasRef, width, height);

		useEffect(() => {
			let duration = jsCanvas.getDuration();
			animationDuration(duration);

			jsCanvas.on('play', (e) => {
				setIsPlaying(true);
			});
			jsCanvas.on('paused', (e) => {
				setIsPlaying(false);
			});
			jsCanvas.on('animate', (e) => {
				setProgress((100 * e.time) / duration);
				timeFormat(e.time);
			});
			if (playing) {
				playing({
					playing: isPlaying,
					progress: progress,
				});
			}
		}, [isPlaying, progress]);

		const numberFormat = (num, count, isRight) => {
			const length = `${num}`.length;
			const arr = [];

			if (isRight) {
				arr.push(num);
			}
			for (let i = length; i < count; ++i) {
				arr.push(0);
			}
			if (!isRight) {
				arr.push(num);
			}
			return arr.join('');
		};

		const timeFormat = (time) => {
			const minute = numberFormat(Math.floor(time / 60), 2);
			const second = numberFormat(Math.floor(time % 60), 2);
			const milisecond = numberFormat(Math.floor((time % 1) * 100), 3, true);

			setTimer(`${minute}:${second}`);
		};

		return (
			<div id="canvasContainer">
				<div
					className={inline ? '' : 'Canvas'}
					id="recorderCanvas"
					ref={canvasRef}
				>
					<div
						className="CanvasInner"
						style={
							fullWidth
								? {
										width: '100%',
										height: '100%',
										...CanvasInnerStyle,
								  }
								: {
										width: windowWidth,
										height: windowHeight,
										...CanvasInnerStyle,
								  }
						}
					>
						<div
							id="Composition"
							className="Composition"
							style={
								fullWidth
									? {
											width: width,
											height: height,
											...CompositionStyle,
									  }
									: {
											width: width,
											height: height,
											transform: `translate(-50%, -50%) scale(${
												scale ? scale : 1
											})`,
											...CompositionStyle,
									  }
							}
						>
							<div
								className="Layers"
								style={{
									width: width,
									height: height,
								}}
							>
								{children}
							</div>
						</div>
					</div>
				</div>
				{controls && (
					<div
						className={inline ? 'playerWrapperInline' : 'playerWrapper'}
						style={playerWrapperStyle}
					>
						<div
							className="player"
							style={{
								width: windowWidth,
								...playerStyle,
							}}
						>
							<div
								className={`${isPlaying ? 'pause' : 'play'}`}
								style={{ ...playerButtonStyle }}
								onClick={() => {
									jsCanvas.isPaused() ? jsCanvas.play() : jsCanvas.pause();
								}}
							/>
							<input
								className="progress"
								style={{ ...playerTrackStyle }}
								type="range"
								onChange={(e) => {
									jsCanvas.pause();
									jsCanvas.setTime(e.target.value + '%');
								}}
								value={progress.toString()}
								min="0"
								max="100"
							/>
							{showTimer && <span style={{ marginLeft: 10 }}>{timer}</span>}
						</div>
					</div>
				)}
			</div>
		);
	}
);

const Canvas = forwardRef(
	(
		{
			children,
			width,
			height,
			jsCanva,
			controls,
			playing,
			fullWidth,
			animationDuration,
			inline,
			CanvasInnerStyle,
			CompositionStyle,
			playerWrapperStyle,
			playerStyle,
			playerButtonStyle,
			playerTrackStyle,
			showTimer,
		},
		ref
	) => {
		return (
			<JsCanvasContext.Provider
				value={
					new Scene(
						{},
						{
							easing: Scene.EASE_IN_OUT,
							iterationCount: 1,
							selector: true,
						}
					)
				}
			>
				<CanvasContainer
					ref={ref}
					height={height}
					width={width}
					controls={controls}
					playing={playing}
					jsCanva={jsCanva}
					fullWidth={fullWidth}
					animationDuration={animationDuration}
					inline={inline}
					CanvasInnerStyle={CanvasInnerStyle}
					CompositionStyle={CompositionStyle}
					playerWrapperStyle={playerWrapperStyle}
					playerStyle={playerStyle}
					playerButtonStyle={playerButtonStyle}
					playerTrackStyle={playerTrackStyle}
					showTimer={showTimer}
				>
					{children}
				</CanvasContainer>
			</JsCanvasContext.Provider>
		);
	}
);

Canvas.defaultProps = {
	width: 1920,
	height: 1080,
	children: [],
	controls: true,
	playing: () => {},
	fullWidth: false,
	animationDuration: () => {},
	inline: false,
	showTimer: false,
};

Canvas.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	children: PropTypes.any,
	controls: PropTypes.bool,
	playing: PropTypes.func,
	fullWidth: PropTypes.bool,
	animationDuration: PropTypes.func,
	inline: PropTypes.bool,
	CanvasInnerStyle: PropTypes.object,
	CompositionStyle: PropTypes.object,
	playerWrapperStyle: PropTypes.object,
	playerStyle: PropTypes.object,
	playerButtonStyle: PropTypes.object,
	playerTrackStyle: PropTypes.object,
	showTimer: PropTypes.bool,
};

export { Canvas };
