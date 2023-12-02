import { isNullOrUndefined } from './is-null-or-undefined';

describe('Testing isNullOrUndefined util', () => {
  test('Checking with params', () => {
    expect(isNullOrUndefined(null)).toBeTruthy();
    expect(isNullOrUndefined(1)).toBeFalsy();
    expect(isNullOrUndefined(undefined)).toBeTruthy();
    expect(isNullOrUndefined([])).toBeFalsy();
    expect(isNullOrUndefined({})).toBeFalsy();
  });
});
