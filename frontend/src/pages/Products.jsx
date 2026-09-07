import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import Button from '../components/Button';
import Input from '../components/Input';

export default function Products() {
  const { user } = useAuth();
  const { products, addProduct, deleteProduct, updateStock } = useProducts();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('Electronics'); 
  const [search, setSearch] = useState('');

  const isAdmin = user?.role === 'admin';

  const handleAdd = async (e) => {
    e.preventDefault();
    const success = await addProduct({ 
      name, 
      price: Number(price), 
      stockQuantity: Number(stock),
      categoryName: category 
    });

    if (success) {
      setName(''); 
      setPrice(''); 
      setStock('');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
    }
  };

  const handleEditStock = async (id, currentStock, productName) => {
    const newStock = prompt(`Enter new stock quantity for "${productName}":`, currentStock);
    
    if (newStock === null || newStock.trim() === '') return;
    
    if (isNaN(newStock) || Number(newStock) < 0) {
      alert("Please enter a valid non-negative number!");
      return;
    }

    await updateStock(id, Number(newStock));
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 style={{ fontSize: '25px', fontWeight: '600', marginBottom: '20px' }}>Products Management</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <Input 
          type="text" 
          placeholder="Search product..." 
          style={{ maxWidth: '300px' }}
          value={search} 
          onChange={e => setSearch(e.target.value)} 
        />
      </div>

      <form onSubmit={handleAdd} className="app-form">
        <Input 
          type="text" 
          placeholder="Product Name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required 
        />
        <Input 
          type="number" 
          placeholder="Price (€)" 
          value={price} 
          onChange={e => setPrice(e.target.value)} 
          required 
        />
        <Input 
          type="number" 
          placeholder="Stock Quantity" 
          value={stock} 
          onChange={e => setStock(e.target.value)} 
          required 
        />
        
        <select 
          className="app-input" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          style={{ backgroundColor: 'white' }}
        >
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
          <option value="Office Equipment">Office Equipment</option>
          <option value="Clothing">Clothing</option>
        </select>

        <Button type="submit" variant="submit">Add Product</Button>
      </form>
      
      <div className="table-container">
        <table className="app-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>PRODUCT</th>
              <th>CATEGORY</th>
              <th>PRICE</th>
              <th>STOCK</th>
              {isAdmin && <th>ACTIONS</th>}
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(p => {
              const categoryName = p.category ? p.category.name : "Electronics";

              return (
                <tr key={p.id}>
                  <td>#{p.id}</td>
                  <td style={{ fontWeight: '500' }}>{p.name}</td>
                  <td>
                    <span style={{ 
                      backgroundColor: '#eff6ff', 
                      color: '#1e40af', 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '12px', 
                      fontWeight: '500' 
                    }}>
                      {categoryName}
                    </span>
                  </td>
                  <td>{Number(p.price).toFixed(2)} €</td>
                  <td style={{ color: p.stockQuantity < 5 ? '#dc2626' : '#334155', fontWeight: p.stockQuantity < 5 ? '600' : '400' }}>
                    {p.stockQuantity} pcs
                  </td>
                  {isAdmin && (
                    <td style={{ display: 'flex', gap: '8px' }}>
                      <Button variant="secondary" onClick={() => handleEditStock(p.id, p.stockQuantity, p.name)}>
                        Edit
                      </Button>
                      <Button variant="delete" onClick={() => handleDelete(p.id)}>
                        Delete
                      </Button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}