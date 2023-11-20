import { Response } from 'express';
import { MarketService } from './market.service';
import { Market } from './market.entity';
export declare class MarketController {
    private service;
    constructor(service: MarketService);
    getAllMarketItems(): Promise<Market[]>;
    createMarketItem(marketItemData: any): Promise<Market>;
    addStock(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    removeStock(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    updateMarketItem(id: string, marketItemData: any): Promise<Market | null>;
    deleteMarketItemsByUsername(username: string): Promise<void>;
    deleteMarketItem(id: number): Promise<void>;
}
