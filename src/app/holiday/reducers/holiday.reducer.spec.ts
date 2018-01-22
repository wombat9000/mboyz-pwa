import * as actions from '../actions/holiday.actions';
import {reducer, State} from './holiday.reducer';

describe('holiday reducer', () => {
  describe('create', () => {
    it('should add holiday to state', () => {
      const createdHoliday = {
        id: 'someId',
        name: 'someName'
      };

      const action = new actions.Create(createdHoliday);
      const result = reducer(undefined, action);

      expect(result.ids).toContain('someId');
      expect(result.entities.someId).toBe(createdHoliday);
    });
  });

  describe('added', () => {
    it('should add holiday to state', () => {
      const addedHoliday = {
        id: 'someId',
        name: 'someName'
      };

      const action = new actions.Added(addedHoliday);
      const result = reducer(undefined, action);

      expect(result.ids).toContain('someId');
      expect(result.entities.someId).toBe(addedHoliday);
    });
  });

  describe('updated', () => {
    it('should modify existing holiday', () => {
      const modifiedHoliday = {
        id: 'someId',
        name: 'someName'
      };

      const state: State = {
        ids: ['someId'],
        entities: {someId: modifiedHoliday}
      };

      const modifications = {
        id: 'someId',
        name: 'modifiedName'
      };

      const action = new actions.Modified(modifications);
      const result = reducer(state, action);

      expect(result.ids).toContain('someId');
      expect(result.entities.someId.name).toBe(modifications.name);
    });
  });

  describe('removed', () => {
    it('should remove existing hoiday', () => {
      const removedHoliday = {
        id: 'someId',
        name: 'someName'
      };

      const anotherHoliday = {
        id: 'anotherId',
        name: 'anotherName'
      };

      const state: State = {
        ids: ['someId', 'anotherId'],
        entities: {someId: removedHoliday, anotherId: anotherHoliday}
      };

      const action = new actions.Removed(removedHoliday);
      const result = reducer(state, action);

      expect(result.ids).toContain('anotherId');
      expect(result.ids).not.toContain('someId');
    });
  });
});