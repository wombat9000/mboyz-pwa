import {initialState, reducer} from './app-bar.reducer';
import {SetTitle} from '../actions/app-bar.actions';


describe('app bar reducer', () => {
  it('should set new title', () => {
    const state = reducer(initialState, new SetTitle({newTitle: 'someTitle'}));
    expect(state.title).toBe('someTitle');
  });
});
