Dot.notation reducer mixin
==========================

[![Greenkeeper badge](https://badges.greenkeeper.io/Alber70g/hyperapp-dot-notation-reducer.svg)](https://greenkeeper.io/)

This mixin allows Hyperapp-actions to return an object with a path as property: `{ '...deep.path': { deep: 'variable' } }`.

The mixin is uses `update` event to modify the `newState`.
Make sure you include this as the first mixin, as other mixins might want to use the 'normalized' state.

An example can be found here:  https://codepen.io/alber70g/pen/dzKvYB?editors=0010


[![Travis CI](https://img.shields.io/travis/Alber70g/hyperapp-dot-notation-reducer.svg)](https://travis-ci.org/Alber70g/hyperapp-dot-notation-reducer)
[![Codecov](https://img.shields.io/codecov/c/github/Alber70g/hyperapp-dot-notation-reducer/master.svg)](https://codecov.io/gh/hyperapp/hyperapp)
[![npm](https://img.shields.io/npm/v/hyperapp-dot-notation-reducer.svg)](https://www.npmjs.org/package/hyperapp-dot-notation-reducer)



Installation
------------

You can import the mixin and use it in the app like so:

```javascript
import { DotNotationReducer } from 'hyperapp-dot-notation-reducer';
// umd
// const { DotNotationReducer } = hyperappDotNotationReducer;
// pre es6
// var DotNotationReducer = hyperappDotNotationReducer.DotNotationReducer;

app({
  state: { something: { counter: 0 } },
  view: (state, actions) =>
    <main>
      {state.something.counter}
      <button onclick={actions.up}>up</button>
    </main>,
  actions: {
    up: (state, actions) =>
      ({ 'something.counter': state.something.counter + 1 })
  }
  mixins: [DotNotationReducer],
  events: {}
})
```

Usage
-----

### Setting a deep property

```javascript
actions: {
  setName: (state, actions, value) =>
    ({ 'login.name': value })
}
```
```json
{ "login": { "name": "value" } }
```

### Deep object with spread
Set an the properties of a deep path, while retaining the other properties.
This means that you can send an object, and it's properties will be set instead of the new object replaces the existing one

```javascript
actions: {
  setName: (state, actions, { name, email }) =>
    ({ '...login': { name, email })
}
```

before
```json
{ "login": { "prop": "value"  } }
```

after
```json
{ "login": { "prop": "value", "name": "name", "email": "email" } }
```

### Replacing the state
Since you cannot replace the full state in Hyperapp (it's always a merge of existing properties overwriting the new ones in the root of the state),
you can now do so using the spread `...` operator without a property.

```javascript
actions: {
  setState: (state, actions, newState) =>
    ({ '...': { prop: 'value' } })
}
```

before
```json
{ "login": { "prop": "value"  } }
```

after
```json
{ "prop": "value" }
```

Author notes
------------

This is my first official contribution to anything public. Any comments are welcome.

Further improvements:

- array index manipulation through path `{ 'app.counters[0].value': 10 } `
