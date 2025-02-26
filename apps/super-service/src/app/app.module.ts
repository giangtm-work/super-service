import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@super-service/auth';
import { OrdersModule } from '@super-service/orders';
import { ProductsModule } from '@super-service/products';
import { RolesModule } from '@super-service/roles';
import { JwtAuthGuard, RolesGuard } from '@super-service/super-guards';
import { UsersModule } from '@super-service/users';
import { UsersRolesModule } from '@super-service/users-roles';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '123456',
      username: 'postgres',
      entities: [__dirname + '/modules/**/*.entity.ts'],
      database: 'super-database',
      synchronize: true,
      logging: true,
      autoLoadEntities: true
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    UsersRolesModule,
    ProductsModule,
    OrdersModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {}
