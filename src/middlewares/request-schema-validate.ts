import { check } from 'express-validator';

export const requestValidate = [
  check('userEmail').trim().normalizeEmail().isEmail().withMessage('Invalid email'),
  check('levelOfExperience', 'Level of experience must be BASIC INTERMIDIATE or ADVANCED').isIn([
    'BASIC',
    'INTERMIDIATE',
    'ADVANCED',
  ]),
  check('yearOfExperience').custom((value) => {
    if (value >= 0 && value <= 30) return true;
  }),
];
