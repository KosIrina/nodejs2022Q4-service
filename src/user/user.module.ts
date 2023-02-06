import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DBModule } from 'src/db/db.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [DBModule],
})
export class UserModule {}
