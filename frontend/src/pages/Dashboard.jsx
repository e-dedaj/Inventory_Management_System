import { useState, useEffect } from 'react';
import API from '../api';
import { useExchangeRates } from '../hooks/useExchangeRates';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalItems: 0,
    totalValue: 0,
    customers: 0,
    suppliers: 0,
  });
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { exchangeRates } = useExchangeRates();
  const { user } = useAuth();
  const userRole = user?.role?.toLowerCase();
console.log('Objekti user është:', user);
  console.log('Të dhënat në localStorage:', localStorage.getItem('user'));
  console.log('Roli në localStorage:', localStorage.getItem('role'));

  useEffect(() => {
    Promise.all([
      API.get('/products/stats'),
      API.get('/products/low-stock')
    ])
      .then(([statsRes, lowStockRes]) => {
        setStats(statsRes.data);
        setLowStock(lowStockRes.data);
      })
      .catch((err) => {
        console.error('Gabim në ngarkimin e të dhënave:', err);
        setError('Dështoi ngarkimi i të dhënave nga servisi.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={{ padding: '20px', fontSize: '16px' }}>Duke ngarkuar Dashboard-in...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', color: '#dc2626' }}>{error}</div>;
  }

  return (
    <div>
      <h2 style={{ fontSize: '25px', fontWeight: '600', marginBottom: '20px' }}>Dashboard Overview</h2>

      <div className="dashboard-grid">
        <div className="stat-card">
          <h3>Total Inventory Value</h3>
          <div className="value">{Number(stats.totalValue || 0).toFixed(2)} €</div>
        </div>
        <div className="stat-card">
          <h3>Total Items in Stock</h3>
          <div className="value">{stats.totalItems} pcs</div>
        </div>
        <div className="stat-card">
          <h3>Live Rate (EUR / ALL)</h3>
          <div className="value">
            1 € = {exchangeRates?.ALL ? Number(exchangeRates.ALL).toFixed(2) : '---'} ALL
          </div>
        </div>
      </div>

      <div className="dashboard-grid" style={{ marginTop: '20px' }}>
        <div className="stat-card">
          <h3>Clients</h3>
          <div className="value">{stats.customers}</div>
        </div>
        <div className="stat-card">
          <h3>Suppliers</h3>
          <div className="value">{stats.suppliers}</div>
        </div>
        <div className="stat-card">
          <h3>User status</h3>
          <div
            className="value"
            style={{
              textTransform: 'capitalize',
              color: userRole === 'admin' ? '#4f83f2' : '#8cf4d3',
            }}
          >
            {userRole === 'admin' ? 'Admin' : 'Staf'}
          </div>
        </div>
      </div>

      <div className="table-container" style={{ padding: '20px', marginTop: '20px' }}>
        <h3 style={{ fontSize: '16px', color: '#f27272', fontWeight: '600', marginBottom: '12px' }}>
          Low Stock Alert (Under 5 pcs)
        </h3>
        {lowStock.length === 0 ? (
          <p style={{ color: '#46a96a', fontSize: '15px' }}>All products are sufficiently stocked.</p>
        ) : (
          <ul style={{ paddingLeft: '20px', color: '#334155', fontSize: '13px' }}>
            {lowStock.map((p) => (
              <li key={p.id} style={{ marginBottom: '6px' }}>
                <strong>{p.name}</strong> — Aktual stock: <span style={{ color: '#dc2626', fontWeight: '600' }}>{p.stockQuantity} pcs</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}