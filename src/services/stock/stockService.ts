import { promises as fs } from 'fs';
class StockService {
  static async getStock(sku: string): Promise<number> {
    try {
      const stockData = await fs.readFile('src/utils/data/stock.json', 'utf-8');
      const stock = JSON.parse(stockData) as { sku: string; stock: number }[];
      const stockEntry = stock.find(entry => entry.sku === sku) || { stock: 0 };
      return stockEntry.stock;
    } catch (error) {
      throw new Error('Error reading stock data');
    }
  }
}

export default StockService;
