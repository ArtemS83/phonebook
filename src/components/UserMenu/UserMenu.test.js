import { render } from '@testing-library/react';
import UserMenu from './UserMenu';
import { testSum } from './test';

//=============testSum==============

describe('sumFn test', () => {
  test('(1+2)', () => {
    const result = testSum(1, 2);
    expect(result).toEqual(3);
  });

  // it()===test()  !!!!
  it('(10+2)', () => {
    expect(testSum(10, 2)).toEqual(12);
  });

  test('(-1+0)', () => {
    expect(testSum(-1, 0)).toBe(-1); // toBe()===toEqual()  !!!!
  });

  it('(-1+-5)', () => {
    expect(testSum(-1, -5)).toBe(-6);
  });
});

// test('sumFn test1', () => {
//   const result = testSum(1, 2);
//   expect(result).toEqual(3);
//   //   expect(testSum(11, 20)).toEqual(31);
//   //   expect(testSum(-1, -2)).toEqual(-3);
// });

// test('sumFn test2 (10+2)', () => {
//   expect(testSum(10, 2)).toEqual(12);
// });

// test('sumFn test3 (-1+0)', () => {
//   expect(testSum(-1, 0)).toEqual(-1);
// });
