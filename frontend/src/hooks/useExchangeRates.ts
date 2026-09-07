import { useState, useEffect } from 'react';

export function useExchangeRates() {
  const [exchangeRates, setExchangeRates] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/EUR')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.rates) {
          setExchangeRates(data.rates);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Gabim gjatë marrjes së kursit të këmbimit:', err);
        setLoading(false);
      });
  }, []);

  return { exchangeRates, loading };
}