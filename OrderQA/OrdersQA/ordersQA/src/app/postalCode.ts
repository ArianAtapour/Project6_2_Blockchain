import { Qa } from './qa';
export const POSTALCODE: Qa[] = [
  {
    id: 1,
    question: 'What were the first two letters of the Postal Code where the package was headed?',
    choices: ['GB', 'UK', 'GR', 'US'],
    answerIndex: 0
  },
  {
    id: 2,
    question: 'The package arrived but the first two letters of the Postal Code on the cover are unreadable, what were they?',
    choices: ['AZ', 'NL', 'AU', 'GE'],
    answerIndex: 1
  },
  {
    id: 3,
    question: 'David',
    choices: ['is a BOSS', 'is the BEST', 'is so COOL', 'is a fucking JEW'],
    answerIndex: 3
  },
  {
    id: 4,
    question: 'Hi',
    choices: ['Yo', 'No', 'Yes', 'LOL'],
    answerIndex: 1
  },
];
