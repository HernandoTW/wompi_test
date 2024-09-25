
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createTransaction } from '../redux/slices/transactionSlice';
import '../styles/global.css';

const SummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, cardInfo, deliveryInfo } = location.state;

  const baseFee = 500;
  const deliveryFee = 1000;
  const totalAmount = Number(product.price) + baseFee + deliveryFee;

  const handlePayment = async () => {
    const transactionData = {
      productId: product.id,
      amount: totalAmount,
      baseFee,
      deliveryFee,
      name: deliveryInfo.name,
      email: deliveryInfo.email,
      address: deliveryInfo.address,
    };

    try {
      const result = await dispatch(createTransaction(transactionData)).unwrap();
      // Aquí deberías integrar con Wompi para obtener el token
      const token = 'tok_test_visa_4242'; // Token simulado
      // Procesar el pago
      // Navegar a la página de estado
      navigate('/status', { state: { transaction: result } });
    } catch (error) {
      console.error('Error en la transacción:', error);
    }
  };

  return (
    <div>
      <h1>Resumen de Pago</h1>
      <p>Producto: {product.name}</p>
      <p>Precio: ${product.price}</p>
      <p>Tarifa Base: ${baseFee}</p>
      <p>Tarifa de Entrega: ${deliveryFee}</p>
      <h2>Total: ${totalAmount}</h2>
      <button onClick={handlePayment}>Pagar</button>
    </div>
  );
};

export default SummaryPage;
