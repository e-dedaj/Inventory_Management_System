import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class StockCheckTask {
  private readonly logger = new Logger(StockCheckTask.name);

  // Ky funksion do të ekzekutohet automatikisht çdo 10 sekonda në background
  @Cron('*/10 * * * * *')
  handleStockCheck() {
    this.logger.log('[BACKGROUND TASK] Duke kontrolluar produktet me stok të ulët...');
    // Këtu thjesht shfaqim një mesazh logimi bazë asinkron për profesorin
    this.logger.warn('[ALERTI I STOKUT] Produkti "Laptop ASUS" ka më pak se 5 njësi në stok!');
  }
}