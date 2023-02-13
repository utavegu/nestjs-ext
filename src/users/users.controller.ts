import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public findAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  public findTargetUser(@Param('id') id) {
    return this.usersService.getTargetUser(id);
  }
}
