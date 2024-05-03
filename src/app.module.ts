import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';


@Module({
  imports: [ ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }), PrismaModule, AuthModule, AdminModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
