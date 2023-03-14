import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceOptions } from './dataSource';

@Module({
    imports: [TypeOrmModule.forRootAsync(
        {
            useFactory: () => (datasourceOptions)
        }
    )]
})
export class DataBaseModule { }
