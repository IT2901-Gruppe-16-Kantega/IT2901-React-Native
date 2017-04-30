/*import * as actions from '../actions/dataActions.js'


describe('actions', () => {
  it('should set a description', () => {
    const text = 'description'
    const expectedAction = {
      type: "SET_DESCRIPTION",
      payload: text,
    }
    expect(actions.setDescription(text)).toEqual(expectedAction)
  })
})
*/

import {setDescription} from '../actions/dataActions.js'

const input = 'New description'
const expectedOutput = {
  type: 'SET_DESCRIPTION',
  payload: input,
}
test('Sets a new description', () => {
  expect(setDescription(input)).toBe(expectedOutput);
});
