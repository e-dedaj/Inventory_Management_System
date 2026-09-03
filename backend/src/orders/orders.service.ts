import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class OrdersService {
  
  async createOrder(orderData: any) {
    // 1. Logjika e Biznesit (Simulim i thjeshtë pa mbingarkesë kodi)
    if (orderData.quantity <= 0) {
      throw new BadRequestException('Sasia e porosisë duhet të jetë më e madhe se 0!');
    }

    // 2. Integrimi me API të palës së tretë (Kursi i këmbimit EUR)
    // Për thjeshtësi maksimale, simulojmë vlerën e marrë nga API i kursit të këmbimit
    const exchangeRateEUR = 103.5; // Supozojmë se 1 EUR = 103.5 Lekë
    const totalInLek = orderData.price * orderData.quantity;
    const totalInEUR = totalInLek / exchangeRateEUR;

    return {
      message: 'Porosia u krijua dhe u logua me sukses!',
      totalAmountLek: totalInLek,
      totalAmountEUR: parseFloat(totalInEUR.toFixed(2)), // Kthyer në Euro
      status: 'Te kryera'
    };
  }
}