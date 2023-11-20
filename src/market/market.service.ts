// market.service.ts
import { Injectable } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Market } from './market.entity';

@Injectable()
export class MarketService {
  constructor(
    @InjectRepository(Market)
    private marketRepository: Repository<Market>,
  ) {}

  async getAllMarketItems(): Promise<Market[]> {
    return this.marketRepository.find();
  }

  async createMarketItem(marketItemData: any): Promise<Market> {
    const marketItem = this.marketRepository.create(marketItemData as Market);
    return this.marketRepository.save(marketItem);
  }

  async updateMarketItem(id: string, marketItemData: any): Promise<Market | null> {
    try 
    {
      const existingMarketItem = await this.marketRepository.findOneOrFail(id as any);
      this.marketRepository.merge(existingMarketItem, marketItemData);
      return this.marketRepository.save(existingMarketItem);
    } 
    catch (error) 
    {
      return null;
    }
  }
  async addStock(id: number): Promise<Market | null> {
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
    } catch (error) {
      return null;
    }
  }

  // findOne just will not work here, createQueryBuilder functioning much better. 
  async removeStock(id: number): Promise<Market | null> {
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
    } catch (error) {
      return null;
    }
  }
  
  // findOne just will not work here, createQueryBuilder functioning much better.  
  async deleteMarketItem(id: number): Promise<DeleteResult> {
    return this.marketRepository
      .createQueryBuilder()
      .delete()
      .from(Market)
      .where('id = :id', { id })
      .execute();
  }

  // Vendor and Username share values, but are different in User and Market. Very Effective
  async deleteMarketItemsByUsername(username: string): Promise<DeleteResult> {
    const existingItems = await this.marketRepository.find({ where: { vendor: username } });

    if (!existingItems || existingItems.length === 0) {
      return { affected: 0, raw: [] };
    }

    return this.marketRepository
      .createQueryBuilder()
      .delete()
      .from(Market)
      .where('vendor = :username', { username })
      .execute();
  }
}