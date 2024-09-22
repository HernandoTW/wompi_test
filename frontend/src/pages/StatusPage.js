
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StatusPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { transaction } = location.state;

  useEffect(() => {
    const processPayment = async () => {
      try {
        // Aquí deberías obtener el token de Wompi desde el frontend
        const token = 'tok_test_visa_4242'; // Token simulado
        const response = await axios.post(`http://localhost:3000/transactions/${transaction.id}/process-payment`, {
          token,
        });

        if (response.data.status === 'COMPLETED') {
          alert('Pago completado exitosamente');
        } else {
          alert('Pago fallido');
        }

        navigate('/', { replace: true });
      } catch (error) {
        console.error('Error procesando el pago:', error);
        alert('Error procesando el pago');
        navigate('/', { replace: true });
      }
    };

    processPayment();
  }, [transaction, navigate]);

  return (
    <div>
      <h1>Procesando Pago...</h1>
    </div>
  );
};

export default StatusPage;
