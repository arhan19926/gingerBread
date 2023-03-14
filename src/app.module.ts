import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DataBaseModule } from './data-base/data-base.module';

@Module({
  imports: [AuthModule, UserModule, DataBaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
