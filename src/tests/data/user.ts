import { Role, type User } from '@/models/user.js';

export const userMoke: User = {
  ldap: '10009628',
  firstname: 'Jérôme',
  lastname: 'Cnockaert',
  email: 'jerome.cnockaert@leroymerlin.fr',
  creationDate: new Date('2023-02-12'),
  login: {
    username: '10009628',
    password: 'ler123'
  },
  lastOrganizedBreakfastDate: null,
  nextOrganizedBreakfastDate: null,
  picture: 'src/assets/jc.jpeg',
  numberOfBreakFastOrganised: 3,
  roles: [Role.ADMIN]
};
