import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from "../../user/entities/user.entity";
import { jwtConstants } from "../constant";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey:jwtConstants.secret,
                logging: true
            }
        )
    }

    async validate(payload: any) {
        return {
            firstName: payload.firstName,
            lastName: payload.lastName,
            emailId: payload.email,
        }
    }
}