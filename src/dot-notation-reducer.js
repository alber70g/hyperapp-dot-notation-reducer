import { upsert } from './upsert';

export function DotNotationReducer() {
	return {
		events: {
			update: function(state, _, newState) {
				var intermediateNewState = Object.assign({}, newState);
				for (var property in newState) {
					if (property.split('.').length > 1) {
						intermediateNewState = upsert(Object.assign({}, state), property, newState[property]);
						delete intermediateNewState[property];
					}
				}
				return intermediateNewState;
			}
		}
	};
}
