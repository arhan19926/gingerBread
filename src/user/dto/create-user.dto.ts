import { IsAlpha } from 'class-validator';
export class CreateUserDto {

    @IsAlpha()
    firstName: string;

    @IsAlpha()
    lastName: string;

    email: string;
}
