import StockTracker from '../../src/services/tracker/stockTracker';
import StockService from '../../src/services/stock/stockService';
import TransactionService from '../../src/services/transactions/transactionService';

jest.mock('../../src/services/stock/stockService');
jest.mock('../../src/services/transactions/transactionService');

describe('StockTracker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get current stock for a SKU with orders and refunds', async () => {
    const mockStock: number = 100;
    const mockTransactions: Array<{ sku: string; type: string; qty: number }> = [
      { sku: 'ABC123', type: 'order', qty: 5 },
      { sku: 'ABC123', type: 'refund', qty: 2 },
      { sku: 'ABC123', type: 'order', qty: 3 },
    ];

    (StockService.getStock as jest.Mock).mockResolvedValue(mockStock);
    (TransactionService.getTransactions as jest.Mock).mockResolvedValue(mockTransactions);

    const result = await StockTracker.getCurrentStock('ABC123');

    expect(result).toEqual({ sku: 'ABC123', qty: mockStock + 5 - 2 + 3 });
  });

  it('should handle SKU not found in transactions', async () => {
    const mockStock = 50;
    const mockTransactions = [
      { sku: 'XYZ789', type: 'order', qty: 8 },
      { sku: 'XYZ789', type: 'refund', qty: 2 },
    ];

    (StockService.getStock as jest.Mock).mockResolvedValue(mockStock);

    (TransactionService.getTransactions as jest.Mock).mockResolvedValue(mockTransactions);

    await expect(StockTracker.getCurrentStock('ABC123')).rejects.toThrowError(
      'Error getting current stock for SKU ABC123'
    );
  });
});
