
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const navigate = useNavigate();

  const handleBuy = (product) => {
    navigate('/payment', { state: { product } });
  };

  if (status === 'loading') return <div>Cargando productos...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Productos Disponibles</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Precio: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={() => handleBuy(product)} disabled={product.stock <= 0}>
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
