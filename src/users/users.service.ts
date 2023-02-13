import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: '1',
      firstName: 'Name 1',
      lastName: 'Familia 1',
    },
    {
      id: '2',
      firstName: 'Name 2',
      lastName: 'Familia 2',
    },
  ];

  getAllUsers() {
    return this.users;
  }

  getTargetUser(id) {
    return this.users.find((user) => user.id === id);
  }
}
