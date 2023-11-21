import { Module } from '@nestjs/common';
import { Users } from './users/users.entity';
import { Market } from './market/market.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get<string>('MYSQLCONNSTR_localdb');

        const hostAndPortMatch = connectionString.match(/Data Source=([^;]+)/);
        const [host, port] = hostAndPortMatch ? hostAndPortMatch[1].split(':') : ['localhost', '3306'];

        return {
          type: 'mysql',
          host,
          port: parseInt(port, 10),
          username: configService.get<string>('MYSQLCONNSTR_localdb').match(/User Id=([^;]+)/)[1],
          password: configService.get<string>('MYSQLCONNSTR_localdb').match(/Password=([^;]+)/)[1],
          database: configService.get<string>('MYSQLCONNSTR_localdb').match(/Database=([^;]+)/)[1],
          entities: [Users, Market],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}