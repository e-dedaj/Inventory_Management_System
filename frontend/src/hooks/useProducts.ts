import { useState, useEffect, useCallback } from 'react';
import API from '../api';

export const useProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const responce = await API.get('/products');
      setProducts(responce.data);
    } catch (err: any) {
      setError(err.message || 'Nuk u ngarkuan produktet.');
    } finally {
      setLoading(false);
    }
  }, []);

  const addProduct = async (productData: any) => {
    try {
      const response = await API.post('/products', productData);
      setProducts((prev) => [...prev, response.data]);
    } catch (err: any) {
      console.error('Gabim gjatë shtimit të produktit:', err);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await API.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      console.error('Gabim gjatë fshirjes së produktit:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, fetchProducts, addProduct, deleteProduct };
};