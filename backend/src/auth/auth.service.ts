import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
//import { UsersService } from "src/users/users.service";
import bcrypt from 'bcrypt';
import { Users } from "src/entities/Users";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: {email},
      select: ['id', 'email', 'password', 'nickname']
    });
    console.log(email, password, user);

    if(!user) {
      return null;

    }

    const result = await bcrypt.compare(password, user.password);

    if(result) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }
}