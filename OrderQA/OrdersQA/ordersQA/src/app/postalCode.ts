import { Qa } from './qa';
export const POSTALCODE: Qa[] = [
  {
    id: 1,
    question: 'What were the first two letters of the postcode where the package was sent?',
    choices: ['UK', 'US', 'NL', 'AU'],
    answerIndex: 0
  },
  {
    id: 2,
    question: "Were the materials payed for?",
    choices: ['Not yet', 'Yes'],
    answerIndex: 1
  },
  {
    id: 3,
    question: 'What time is the package supposed to be released?',
    choices: ['10AM', '13PM', '6AM', '15PM'],
    answerIndex: 2
  },
  {
    id: 4,
    question: 'Did the client want to send the package through fast delivery?',
    choices: ['Yes', 'No'],
    answerIndex: 1
  },
];
