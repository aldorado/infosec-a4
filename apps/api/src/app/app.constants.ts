import { User, Message } from '@infosec/api-interfaces';

export const users: User[] = [
  { name: 'Peter0815', password: 'test123' },
  { name: 'Max115', password: 'wasser0' },
  { name: 'Michaela08', password: 'vielmerh312' },
  { name: 'Reinhard1515', password: 'wasichwaesii' },
  { name: 'Edna0415', password: 'mehrtests' },
  { name: 'Corinna3215', password: 'kool123' },
];

export const messages: Message[] = [
  { message: 'Welcome to api!', user: 'Peter0815' },
  { message: 'Welcome to api II!', user: 'Peter0815' },
  { message: 'Welcome to api III!', user: 'Michaela08' },
  { message: 'Welcome to api IV!', user: 'Reinhard1515' },
];
