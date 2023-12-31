"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_entity_1 = require("./users/users.entity");
const market_entity_1 = require("./market/market.entity");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const users_module_1 = require("./users/users.module");
const market_module_1 = require("./market/market.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UserModule,
            market_module_1.MarketModule,
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    const connectionString = configService.get('MYSQLCONNSTR_localdb');
                    const hostAndPortMatch = connectionString.match(/Data Source=([^;]+)/);
                    const [host, port] = hostAndPortMatch ? hostAndPortMatch[1].split(':') : ['localhost', '3306'];
                    return {
                        type: 'mysql',
                        host,
                        port: parseInt(port, 10),
                        username: configService.get('MYSQLCONNSTR_localdb').match(/User Id=([^;]+)/)[1],
                        password: configService.get('MYSQLCONNSTR_localdb').match(/Password=([^;]+)/)[1],
                        database: configService.get('MYSQLCONNSTR_localdb').match(/Database=([^;]+)/)[1],
                        entities: [users_entity_1.Users, market_entity_1.Market],
                        synchronize: true,
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map