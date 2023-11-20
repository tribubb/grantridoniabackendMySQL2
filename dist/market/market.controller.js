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
exports.MarketController = void 0;
const common_1 = require("@nestjs/common");
const market_service_1 = require("./market.service");
let MarketController = class MarketController {
    constructor(service) {
        this.service = service;
    }
    async getAllMarketItems() {
        return this.service.getAllMarketItems();
    }
    async createMarketItem(marketItemData) {
        return this.service.createMarketItem(marketItemData);
    }
    async addStock(id, res) {
        try {
            const updatedItem = await this.service.addStock(Number(id));
            if (updatedItem) {
                return res.status(common_1.HttpStatus.OK).json({ stock: updatedItem.stock });
            }
            return res.status(common_1.HttpStatus.NOT_FOUND).send();
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }
    async removeStock(id, res) {
        try {
            const updatedItem = await this.service.removeStock(Number(id));
            if (updatedItem) {
                return res.status(common_1.HttpStatus.OK).json({ stock: updatedItem.stock });
            }
            return res.status(common_1.HttpStatus.NOT_FOUND).send();
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }
    async updateMarketItem(id, marketItemData) {
        return this.service.updateMarketItem(id, marketItemData);
    }
    async deleteMarketItemsByUsername(username) {
        const result = await this.service.deleteMarketItemsByUsername(username);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Market items for username ${username} not found`);
        }
    }
    async deleteMarketItem(id) {
        const result = await this.service.deleteMarketItem(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Market item with ID ${id} not found`);
        }
    }
};
exports.MarketController = MarketController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MarketController.prototype, "getAllMarketItems", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MarketController.prototype, "createMarketItem", null);
__decorate([
    (0, common_1.Put)(':id/add-stock'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MarketController.prototype, "addStock", null);
__decorate([
    (0, common_1.Put)(':id/remove-stock'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MarketController.prototype, "removeStock", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MarketController.prototype, "updateMarketItem", null);
__decorate([
    (0, common_1.Delete)('delete-by-username/:username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MarketController.prototype, "deleteMarketItemsByUsername", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MarketController.prototype, "deleteMarketItem", null);
exports.MarketController = MarketController = __decorate([
    (0, common_1.Controller)('market'),
    __metadata("design:paramtypes", [market_service_1.MarketService])
], MarketController);
//# sourceMappingURL=market.controller.js.map