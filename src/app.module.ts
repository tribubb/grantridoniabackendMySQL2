import { Module } from '@nestjs/common';
import { Users } from './users/users.entity';
import { Market } from './market/market.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/users.module';
import { MarketModule } from './market/market.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Formula: import entity AND module for each table.
@Module({
  imports: [
    UserModule,
    MarketModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.MYSQLCONNSTR_localdb,
      entities: [Users, Market],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}