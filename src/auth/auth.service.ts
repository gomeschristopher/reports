import { BadRequestException, Injectable } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { JwtService } from '@nestjs/jwt';
import { UsersService } from "src/users/users.service";
import { UserDto } from "src/users/dtos/user.dto";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string) {

    const [user] = await this.usersService.find(email);


    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('invalid credentials');
    }

    return user;
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.id };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(email: string, password: string) {
    const users = await this.usersService.find(email);

    if(users.length) {
        throw new BadRequestException('email in use');
    }

    const saltHash = randomBytes(8).toString('hex');

    const hashPassword = (await scrypt(password, saltHash, 32)) as Buffer;

    const resultPassword = saltHash + '.' + hashPassword.toString('hex');

    const user = await this.usersService.create(email, resultPassword);

    return user;
}
}
