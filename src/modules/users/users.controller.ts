import { Body, Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }


  @Get('all')
  getAll(@Query() query: any) {
    return this.userService.getAll(query)
  }


  @Get('one/:id')
  getOne(@Param('id') id: string) {
    return this.userService.getOne(id)
  }


  @Put('update')
  update(@Body() payload: any) {
    return this.userService.update(payload)
  }


  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id)
  }
}
