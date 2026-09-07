export interface ExchangeRates {
  USD: number;
  EUR: number;
  ALL: number;
  [key: string]: number;
}

class ExchangeRateService {
  private baseUrl = 'https://open.er-api.com/v6/latest/EUR';

  async getLatestRates(baseCurrency: string = 'EUR'): Promise<ExchangeRates> {
    try {
      const response = await fetch(`${this.baseUrl}/latest?from=${baseCurrency}`);
      if (!response.ok) throw new Error('Error in taking the data.');
      const data = await response.json();
      return data.rates;
    } catch (error) {
      console.error('Error ExchangeRateService:', error);
      throw error;
    }
  }
}

export const exchangeRateService = new ExchangeRateService();