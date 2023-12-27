import StockTracker from './services/tracker/stockTracker';

async function testStockTracker(sku: string) {
  try {
    const currentStock = await StockTracker.getCurrentStock(sku);
    console.log(`Current stock for ${sku}: ${currentStock.qty}`);
  } catch (error: any) {
    console.error(error.message);
  }
}

testStockTracker('KED089097/68/09');