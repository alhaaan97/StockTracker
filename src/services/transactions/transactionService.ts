import { promises as fs } from 'fs';

class TransactionService {
  static async getTransactions(): Promise<{ sku: string; type: string; qty: number }[]> {
    try {
      const transactionsData = await fs.readFile('src/utils/data/transactions.json', 'utf-8');
      return JSON.parse(transactionsData) as { sku: string; type: string; qty: number }[];
    } catch (error) {
      throw new Error('Error reading transactions data');
    }
  }
}

export default TransactionService;