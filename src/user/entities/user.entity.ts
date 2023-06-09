import { Column } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";
import { baseEntity } from "../../utility/baseEnitity";


export type Role = 'ADMIN' | 'CUSTOMER' | 'OWNER';
@Entity()
export class User extends baseEntity {

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    password: string

    @Column({ default: '' })
    image: string

    @Column({ unique: true })
    email: string

}
