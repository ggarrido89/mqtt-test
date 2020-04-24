import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDTO } from './dto/user.dto';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  hashPassword = async password => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  };

  async getUser(email): Promise<User> {
    const user = await this.userModel.findOne({email:email});
    return user;
  }

  async login(user): Promise<User> {
    const { email } = user;
    const userDB = await this.userModel.findOne({ email });
    return userDB;
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    createUserDTO.password = await this.hashPassword(createUserDTO.password);
    const newUser = new this.userModel(createUserDTO);
    return await newUser.save();
  }

  async deleteUser(id): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }

  async updateUser(id: string, body: CreateUserDTO): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, body, {
      new: true,
    });
  }
}
