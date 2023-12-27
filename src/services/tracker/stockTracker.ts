import StockService from '../stock/stockService';
import TransactionService from '../transactions/transactionService';

class StockTracker {
  static async getCurrentStock(sku: string): Promise<{ sku: string; qty: number }> {
    try {
      const stock = await StockService.getStock(sku);
      const transactions = await TransactionService.getTransactions();

      // Check if there are transactions for the given SKU
      if (!transactions.some((transaction: { sku: string }) => transaction.sku === sku)) {
        throw new Error(`No transactions found for SKU ${sku}`);
      }

      const skuTransactions = transactions.filter((transaction: { sku: string }) => transaction.sku === sku);
      const totalQty = skuTransactions.reduce((acc: number, transaction: { type: string; qty: number }) => {
        return transaction.type === 'order' ? acc + transaction.qty : acc - transaction.qty;
      }, 0);

      return { sku, qty: stock + totalQty };
    } catch (error) {
      throw new Error(`Error getting current stock for SKU ${sku}`);
    }
  }
}


export default StockTracker;
