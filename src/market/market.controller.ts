import { Response } from 'express';
import { Controller, Post, Body, Res, HttpStatus, Get, Delete, Param, Put, NotFoundException } from '@nestjs/common';
import { MarketService } from './market.service';
import { Market } from './market.entity';

@Controller('market')
export class MarketController {
  constructor(private service: MarketService) {}

  @Get()
  async getAllMarketItems(): Promise<Market[]> {
    return this.service.getAllMarketItems();
  }

  @Post()
  async createMarketItem(@Body() marketItemData: any): Promise<Market> {
    return this.service.createMarketItem(marketItemData);
  }

// Put the less basic put methods first, previous issues with :id method first.
@Put(':id/add-stock')
async addStock(@Param('id') id: number, @Res() res: Response) {
  try {
    const updatedItem = await this.service.addStock(Number(id));
    if (updatedItem) {
      return res.status(HttpStatus.OK).json({ stock: updatedItem.stock });
    }
    return res.status(HttpStatus.NOT_FOUND).send();
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
  }
}

@Put(':id/remove-stock')
async removeStock(@Param('id') id: number, @Res() res: Response) {
  try {
    const updatedItem = await this.service.removeStock(Number(id));
    if (updatedItem) {
      return res.status(HttpStatus.OK).json({ stock: updatedItem.stock });
    }
      return res.status(HttpStatus.NOT_FOUND).send();
    } 
    catch (error) 
    {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Put(':id')
  async updateMarketItem(@Param('id') id: string, @Body() marketItemData: any): Promise<Market | null> {
    return this.service.updateMarketItem(id, marketItemData);
  }

  @Delete('delete-by-username/:username')
  async deleteMarketItemsByUsername(@Param('username') username: string): Promise<void> {
    const result = await this.service.deleteMarketItemsByUsername(username);

    // Handle the result as needed
    if (result.affected === 0) {
      throw new NotFoundException(`Market items for username ${username} not found`);
    }
  }

  @Delete(':id')
  async deleteMarketItem(@Param('id') id: number): Promise<void> {
    const result = await this.service.deleteMarketItem(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Market item with ID ${id} not found`);
    }  
  }
}