import { Repository, DeleteResult } from 'typeorm';
import { Market } from './market.entity';
export declare class MarketService {
    private marketRepository;
    constructor(marketRepository: Repository<Market>);
    getAllMarketItems(): Promise<Market[]>;
    createMarketItem(marketItemData: any): Promise<Market>;
    updateMarketItem(id: string, marketItemData: any): Promise<Market | null>;
    addStock(id: number): Promise<Market | null>;
    removeStock(id: number): Promise<Market | null>;
    deleteMarketItem(id: number): Promise<DeleteResult>;
    deleteMarketItemsByUsername(username: string): Promise<DeleteResult>;
}
