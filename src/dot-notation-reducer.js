import { unflatten } from "./unflatten";

export function DotNotationReducer() {
  return {
    events: {
      update: function(state, _, newState) {
        return unflatten(state, newState);
      }
    }
  };
}
