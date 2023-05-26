const path = require('path');
module.exports = {
	stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		{
			name: '@storybook/addon-storysource',
			options: {
				rule: {
					// test: [/\.stories\.jsx?$/], This is default
					include: [path.resolve(__dirname, '../src')], // You can specify directories
				},
				loaderOptions: {
					prettierConfig: { printWidth: 80, singleQuote: false },
				},
			},
		},
	],
	webpackFinal: async (config) => {
		config.module.rules.push({
			test: /\.scss$/,
			use: ['style-loader', 'css-loader', 'sass-loader'],
			include: path.resolve(__dirname, '../'),
		});
		config.module.rules.push({
			test: /\.(js|jsx)$/,
			loader: require.resolve('babel-loader'),
			options: {
				presets: [
					[
						'react-app',
						{
							flow: false,
							typescript: false,
						},
					],
				],
			},
		});
		config.module.rules.push({
			test: /\.(js|jsx)$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: require.resolve('babel-loader'),
				options: {
					presets: ['@babel/preset-env'],
					plugins: [
						'@babel/plugin-syntax-jsx',
						'@babel/plugin-transform-runtime',
					],
				},
			},
		});
		config.resolve.extensions.push('.js', '.jsx', '.ts', '.tsx');
		return config;
	},
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	core: {},
};
