import type {Config} from 'jest';

const config: Config = {
	moduleNameMapper: {
		'^axios$': require.resolve('axios'),
	},
};

export default config;