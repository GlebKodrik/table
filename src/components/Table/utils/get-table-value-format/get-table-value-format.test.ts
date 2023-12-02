import { getTableValueFormat } from './get-table-value-format';

describe('Testing getTableValueFormat util', () => {
  test('Checking with params', () => {
    expect('').toBe(getTableValueFormat({ value: '' }));
    expect('Нет').toBe(getTableValueFormat({ value: false }));
    expect('Да').toBe(getTableValueFormat({ value: true }));
    expect('').toBe(getTableValueFormat({ value: null }));
    expect('').toBe(getTableValueFormat({ value: undefined }));
    expect('2').toBe(getTableValueFormat({ value: 2 }));
    expect('Hello').toBe(getTableValueFormat({ value: 'Hello' }));
  });
});
