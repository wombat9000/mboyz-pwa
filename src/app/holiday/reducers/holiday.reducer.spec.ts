import * as actions from '../actions/holiday.actions';
import {reducer} from './holiday.reducer';

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
});
