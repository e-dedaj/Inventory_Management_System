import { useState, useEffect } from 'react';
import API from '../api';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../hooks/useAuth';

export default function Customers() {
  const { user } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');

  const isAdmin = user?.role === 'admin';

  const fetchCustomers = async () => {
    try { 
      const res = await API.get('/customers'); 
      setCustomers(res.data); 
    } catch (err) { 
      console.error('Error fetching customers:', err); 
    }
  };

  useEffect(() => { 
    fetchCustomers(); 
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await API.post('/customers', { 
        fullName: name, 
        phone: phone, 
        initialAmount: Number(amount) 
      });
      setName(''); 
      setPhone(''); 
      setAmount('');
      fetchCustomers();
    } catch (err) { 
      alert('Failed to add customer!'); 
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try { 
        await API.delete(`/customers/${id}`); 
        fetchCustomers(); 
      } catch (err) { 
        alert('Failed to delete customer!'); 
      }
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '25px', fontWeight: '600', marginBottom: '20px' }}>
        Customers & Orders Management
      </h2>
      
      <form onSubmit={handleAdd} className="app-form">
        <Input 
          type="text" 
          placeholder="Full Name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required 
        />
        <Input 
          type="text" 
          placeholder="Phone Number" 
          value={phone} 
          onChange={e => setPhone(e.target.value)} 
          required 
        />
        <Input 
          type="number" 
          placeholder="Order Amount (€)" 
          value={amount} 
          onChange={e => setAmount(e.target.value)} 
          required 
        />
        <Button type="submit" variant="submit">Add Customer</Button>
      </form>
      
      <div className="table-container">
        <table className="app-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PHONE</th>
              <th>ORDERS</th>
              <th>TOTAL AMOUNT</th>
              {isAdmin && <th>ACTIONS</th>}
            </tr>
          </thead>
          <tbody>
            {customers.map(c => {
              const hasOrders = Number(c.initialAmount) > 0;
              const orderCount = hasOrders ? 1 : 0; 
              const totalAmount = Number(c.initialAmount || 0);

              return (
                <tr key={c.id}>
                  <td>#{c.id}</td>
                  <td style={{ fontWeight: '500' }}>{c.fullName}</td>
                  <td>{c.phone || 'No phone'}</td>
                  <td style={{ fontWeight: '500', color: hasOrders ? '#2563eb' : '#94a3b8' }}>
                    {orderCount} order{orderCount !== 1 ? 's' : ''}
                  </td>
                  <td style={{ color: hasOrders ? '#16a34a' : '#334155', fontWeight: '500' }}>
                    {totalAmount.toFixed(2)} €
                  </td>
                  {isAdmin && (
                    <td>
                      <Button variant="delete" onClick={() => handleDelete(c.id)}>Delete</Button>
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