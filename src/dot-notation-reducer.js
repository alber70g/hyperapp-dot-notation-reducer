import { upsert } from './upsert';

export default () => ({
	events: {
		update
	}
});

const update = (state, _, newState) => {
	let intermediateNewState = { ...newState };
	for (const property in newState) {
		if (property.split('.').length > 1) {
			intermediateNewState = upsert({ ...state }, property, newState[property]);
			delete intermediateNewState[property];
		}
	}
	return intermediateNewState;
};
