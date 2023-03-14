import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './loginDto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
