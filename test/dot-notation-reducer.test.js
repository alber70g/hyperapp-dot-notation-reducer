import { DotNotationReducer } from '../src/dot-notation-reducer';

beforeEach(() => {});

const update = DotNotationReducer().events.update;

test('should update state regulary', done => {
	const state = {};
	const newState = { name: 'name' };
	const expectedState = { name: 'name' };
	const actualState = update(state, null, newState);
	expect(actualState).toEqual(expectedState);
	done();
});

test('should be inserting deep property', done => {
	const state = {};
	const newState = { 'login.name': 'name' };
	const expectedState = { login: { name: 'name' } };
	const actualState = update(state, null, newState);
	expect(actualState).toEqual(expectedState);
	done();
});

test('should updating deep property', done => {
	const state = { login: { name: 'name' } };
	const newState = { 'login.name': 'another' };
	const expectedState = { login: { name: 'another' } };
	const actualState = update(state, null, newState);
	expect(actualState).toEqual(expectedState);
	done();
});

test("should throw error when trying to use spread '...' on non-object", done => {
	const state = {};
	const newState = { '...login.name': 'another' };
	expect(() => update(state, null, newState)).toThrow();
	done();
});

test('should update state with spread operator', done => {
	const state = {};
	const newState = { '...login.name': { deep: 'another' } };
	const expectedState = { login: { name: { deep: 'another' } } };
	const actualState = update(state, null, newState);
	expect(actualState).toEqual(expectedState);
	done();
});

test('should update state with spread operator without removing the other properties', done => {
	const state = { login: { name: { second: 'keep' } } };
	const newState = { '...login.name': { deep: 'another' } };
	const expectedState = { login: { name: { deep: 'another', second: 'keep' } } };
	const actualState = update(state, null, newState);
	expect(actualState).toEqual(expectedState);
	done();
});

test("should replace the full state when using spread '...' without variable name", done => {
	const state = { login: { name: { second: 'keep' } } };
	const newState = { '...': { replace: 'state' } };
	const expectedState = { replace: 'state' };
	const actualState = update(state, null, newState);
	expect(actualState).toEqual(expectedState);
	done();
});
