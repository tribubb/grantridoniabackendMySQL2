"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const market_entity_1 = require("./market.entity");
let MarketService = class MarketService {
    constructor(marketRepository) {
        this.marketRepository = marketRepository;
    }
    async getAllMarketItems() {
        return this.marketRepository.find();
    }
    async createMarketItem(marketItemData) {
        const marketItem = this.marketRepository.create(marketItemData);
        return this.marketRepository.save(marketItem);
    }
    async updateMarketItem(id, marketItemData) {
        try {
            const existingMarketItem = await this.marketRepository.findOneOrFail(id);
            this.marketRepository.merge(existingMarketItem, marketItemData);
            return this.marketRepository.save(existingMarketItem);
        }
        catch (error) {
            return null;
        }
    }
    async addStock(id) {
        try {
            const existingMarketItem = await this.marketRepository
                .createQueryBuilder('market')
                .where('market.id = :id', { id })
                .getOne();
            if (!existingMarketItem) {
                return null;
            }
            existingMarketItem.stock += 1;
            const updatedItem = await this.marketRepository.save(existingMarketItem);
            return updatedItem;
        }
        catch (error) {
            return null;
        }
    }
    async removeStock(id) {
        try {
            const existingMarketItem = await this.marketRepository
                .createQueryBuilder('market')
                .where('market.id = :id', { id })
                .getOne();
            if (!existingMarketItem) {
                return null;
            }
            if (existingMarketItem.stock > 1) {
                existingMarketItem.stock -= 1;
            }
            const updatedItem = await this.marketRepository.save(existingMarketItem);
            return updatedItem;
        }
        catch (error) {
            return null;
        }
    }
    async deleteMarketItem(id) {
        return this.marketRepository
            .createQueryBuilder()
            .delete()
            .from(market_entity_1.Market)
            .where('id = :id', { id })
            .execute();
    }
    async deleteMarketItemsByUsername(username) {
        const existingItems = await this.marketRepository.find({ where: { vendor: username } });
        if (!existingItems || existingItems.length === 0) {
            return { affected: 0, raw: [] };
        }
        return this.marketRepository
            .createQueryBuilder()
            .delete()
            .from(market_entity_1.Market)
            .where('vendor = :username', { username })
            .execute();
    }
};
exports.MarketService = MarketService;
exports.MarketService = MarketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(market_entity_1.Market)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], MarketService);
//# sourceMappingURL=market.service.js.map