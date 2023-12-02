import { getIsFoundValueInWord } from './get-is-found-value-in-word';

describe('Testing of get found value in word util', () => {
  test('Checking with params', () => {
    expect(getIsFoundValueInWord(['привет'], 'пр')).toBeTruthy();
    expect(getIsFoundValueInWord(['привет'], 'прак')).toBeFalsy();
    expect(getIsFoundValueInWord(['привет', '001'], 'прак')).toBeFalsy();
    expect(getIsFoundValueInWord(['привет', '002'], '002 прак')).toBeFalsy();
    expect(getIsFoundValueInWord(['привет', '002'], '002')).toBeTruthy();
  });
});
