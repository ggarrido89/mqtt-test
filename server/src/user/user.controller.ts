import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { AuthGuard } from 'src/shared/auth.guard';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  //@UseGuards(new AuthGuard())
  async createUser(@Res() res, @Body() body: CreateUserDTO) {
    const newUser = await this.userService.createUser(body);
    newUser.password = '';
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
      data: newUser,
    });
  }

  private getToken(user) {
    const { id, username, email, roleId } = user;
    return jwt.sign({ id, username, email, roleId }, 'ULTRASMEGAECRETO', {
      expiresIn: 60,
    });
  }
  
  @Post('/login')
  async login(@Res() res, @Body() body) {
    const userDB:any = await this.userService.login(body);
    if (!userDB || !(await bcrypt.compare(body.password, userDB.password))) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Not authorized',
      });
    }

    // userDB.lastConnection = new Date();
    // const userUpdated = await userDB.save();

    const token = this.getToken(userDB);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'User loged in successfuly',
      data: {
        _id: userDB._id,
        email: userDB.email,
        user: userDB.name,
        token: token,
        expiresIn:  60 * 1000,
      },
    });
  }


  @Put('/:userId')
  //@UseGuards(new AuthGuard())
  async updateUser(
    @Res() res,
    @Body() body: CreateUserDTO,
    @Param('userId') userId,
  ) {
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Id is not a valid  ObjectId');
    }
    const updatedUser = await this.userService.updateUser(userId, body);
    if (!updatedUser) {
      throw new NotFoundException('User not updated');
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'User updated',
      data: updatedUser,
    });
  }
}
