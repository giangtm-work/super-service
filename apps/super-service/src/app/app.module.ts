import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from '@super-service/orders';
import { ProductsModule } from '@super-service/products';
import { UsersModule } from '@super-service/users';

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
    UsersModule,
    ProductsModule,
    OrdersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
