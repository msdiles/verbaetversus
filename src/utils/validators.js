export const mustHaveUppercase = (value) => /[A-Z]/.test(value)
export const mustHaveLowercase = (value) => /[a-z]/.test(value)
export const mustHaveDigit = (value) => /[\d]/.test(value)
export const mustHaveOnlyLettersAndDigits = (value) =>
  !/(?![A-Za-z0-9])./.test(value)
