import { EMPTY_LABEL } from '@/constant/empty-label';

import { getLabel } from './get-label';

describe('Testing getLabel util', () => {
  test('Checking with params', () => {
    expect('').toBe(getLabel({ label: '' }));
    expect('Нет').toBe(getLabel({ label: false }));
    expect('Да').toBe(getLabel({ label: true }));
    expect(EMPTY_LABEL).toBe(getLabel({ label: null }));
    expect(EMPTY_LABEL).toBe(getLabel({ label: undefined }));
    expect('2').toBe(getLabel({ label: 2 }));
    expect('Hello').toBe(getLabel({ label: 'Hello' }));
  });
});
