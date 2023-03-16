import { Injectable } from '@nestjs/common';
import { sendEmail } from '../utility/email';
import { createPassword } from '../utility/password';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    public userRepo: UserRepository
  ) { }
  async create(createUserDto: CreateUserDto) {
    try {
      const { password, hashedPassword } = await createPassword()
      const userPayload = {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: hashedPassword
      }
      const result = await this.userRepo.create(userPayload);
      if (result) {
        await sendEmail(`${userPayload.email}`, `Your Account Password`,
          '', `
            <h2>Hello!<h2><br/>
            <p> ${userPayload.firstName} ${userPayload.lastName} ,your autogenerated password for 
            your newly created account is "${password}". Please change the password to your liking as soon as possible 
            bearing in mind to keep it strong enough to not be making your account vulnerable to any sort of threats.
            <p>
            <h3>Regards , Team GingerBread<h3>
        `)
      }
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findAll() {
    return await this.userRepo.showAll();
  }

  async findOne(email: string) {
    return await this.userRepo.findOneByEmail(email);
  }

  async getCount() {
    return await this.userRepo.count();
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update(email, updateUserDto);
  }

  async remove(email: string) {
    return await this.userRepo.remove(email);
  }
}
