import { upsert } from "./upsert";

export function unflatten(state, newState) {
  var intermediateNewState = Object.assign({}, newState);
  for (var property in newState) {
    if (property.split(".").length > 1) {
      intermediateNewState = upsert(
        Object.assign({}, state),
        property,
        newState[property]
      );
      delete intermediateNewState[property];
    }
  }
  return intermediateNewState;
}
