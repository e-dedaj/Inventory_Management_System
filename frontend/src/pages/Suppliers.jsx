import { useState, useEffect } from 'react';
import API from '../api';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../hooks/useAuth';

export default function Suppliers() {
  const { user } = useAuth();
  const [suppliers, setSuppliers] = useState([]);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  const isAdmin = user?.role === 'admin';

  const fetchSuppliers = async () => {
    try {
      const res = await API.get('/suppliers');
      setSuppliers(res.data);
    } catch (err) { 
      console.error('Error fetching suppliers:', err); 
    }
  };

  useEffect(() => { 
    fetchSuppliers(); 
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await API.post('/suppliers', { name, contactInfo: contact });
      setName(''); 
      setContact('');
      fetchSuppliers();
    } catch (err) { 
      alert('Failed to add supplier!'); 
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        await API.delete(`/suppliers/${id}`);
        fetchSuppliers();
      } catch (err) { 
        alert('Failed to delete supplier!'); 
      }
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '25px', fontWeight: '600', marginBottom: '20px' }}>
        Suppliers Management
      </h2>
      
      <form onSubmit={handleAdd} className="app-form">
        <Input 
          type="text" 
          placeholder="Supplier Name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required 
        />
        <Input 
          type="text" 
          placeholder="Contact (Email / Phone)" 
          value={contact} 
          onChange={e => setContact(e.target.value)} 
          required 
        />
        <Button type="submit" variant="submit">Add Supplier</Button>
      </form>
      
      <div className="table-container">
        <table className="app-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>SUPPLIER</th>
              <th>CONTACT</th>
              {isAdmin && <th>ACTIONS</th>}
            </tr>
          </thead>
          <tbody>
            {suppliers.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 4 : 3} style={{ textAlign: 'center', color: '#94a3b8' }}>
                  No suppliers found in database.
                </td>
              </tr>
            ) : (
              suppliers.map(s => (
                <tr key={s.id}>
                  <td>#{s.id}</td>
                  <td style={{ fontWeight: '500' }}>{s.name}</td>
                  <td>{s.contactInfo}</td>
                  {isAdmin && (
                    <td>
                      <Button variant="delete" onClick={() => handleDelete(s.id)}>Delete</Button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}