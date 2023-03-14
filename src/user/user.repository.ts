import { Injectable } from "@nestjs/common";
import { connectDb } from "../data-base/dataSource";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";



const userRepo = connectDb.getRepository(User);

@Injectable()
export class UserRepository {

    constructor(

    ) { }

    async showAll() {
        try {
            const users = await userRepo.find({ where: { deletedAt: null } });
            return users;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async findOneByEmail(email: string) {
        try {
            const user = await userRepo.findOne({ where: { deletedAt: null, email: email } });
            return user;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async create(data: CreateUserDto) {
        return await userRepo.save(data);
    }

    async remove(email: string) {
        return await userRepo.softDelete({ email: email });
    }

    async update(email: string, data: Partial<UpdateUserDto>, remove?: boolean) {
        const oldData = await userRepo.findOne({ where: { email: email } })
        await userRepo.update({ email: email }, data);
        return await userRepo.findOne({ where: { email: email } });
    }



    async count() {
        return await userRepo.count({
            where: {
                deletedAt: null
            }
        })
    }
}