import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../styles/global.css';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state;
  
  const formik = useFormik({
    initialValues: {
      cardNumber: '',
      expiry: '',
      cvv: '',
      name: '',
      email: '',
      address: '',
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .matches(/^[0-9]{16}$/, 'Número de tarjeta inválido')
        .required('Requerido'),
      expiry: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Formato MM/AA')
        .required('Requerido'),
      cvv: Yup.string()
        .matches(/^[0-9]{3,4}$/, 'CVV inválido')
        .required('Requerido'),
      name: Yup.string().required('Requerido'),
      email: Yup.string().email('Correo inválido').required('Requerido'),
      address: Yup.string().required('Requerido'),
    }),


onSubmit: async (values) => {
  try {
    const tokenResponse = await axios.post('https://sandbox.wompi.co/v1/tokens/cards', {
      number: values.cardNumber,
      exp_month: values.expiry.split('/')[0],
      exp_year: `20${values.expiry.split('/')[1]}`,
      cvc: values.cvv,
      card_holder: values.name,
    });

    const token = tokenResponse.data.data.id;

    const paymentData = {
      token: token,
      amount: product.price * 100,
      currency: 'COP',
    };

    const response = await axios.post('http://localhost:3000/payments', paymentData);

    console.log('Respuesta del backend:', response);

    if (response.status === 200) {
      navigate('/summary', {
        state: {
          product,
          cardInfo: values,
          paymentResult: response.data,
        },
      });
    }
  } catch (error) {
    console.error('Error en el proceso de pago:', error.message);
    alert('Hubo un error procesando el pago. Intenta de nuevo.');
  }
}



  });

  return (
    <div>
      <h1>Información de Pago</h1>
      <form onSubmit={formik.handleSubmit}>
        <h2>Tarjeta de Crédito</h2>
        <input
          type="text"
          name="cardNumber"
          placeholder="Número de Tarjeta"
          value={formik.values.cardNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.cardNumber && formik.errors.cardNumber ? (
          <div>{formik.errors.cardNumber}</div>
        ) : null}

        <input
          type="text"
          name="expiry"
          placeholder="MM/AA"
          value={formik.values.expiry}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.expiry && formik.errors.expiry ? (
          <div>{formik.errors.expiry}</div>
        ) : null}

        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          value={formik.values.cvv}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.cvv && formik.errors.cvv ? (
          <div>{formik.errors.cvv}</div>
        ) : null}

        <h2>Información de Entrega</h2>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}

        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}

        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.address && formik.errors.address ? <div>{formik.errors.address}</div> : null}

        <button type="submit">Continuar al Resumen</button>
      </form>
    </div>
  );
};

export default PaymentPage;
