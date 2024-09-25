
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WompiService {
  private readonly baseUrl = process.env.WOMPI_BASE_URL;
  private readonly publicKey = process.env.WOMPI_PUBLIC_KEY;
  private readonly privateKey = process.env.WOMPI_PRIVATE_KEY;

  async createPayment(token: string, amount: number, currency: string = 'COP'): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/transactions`,
        {
          currency,
          amount,
          payment_method: {
            type: 'CARD',
            token,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.privateKey}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error creating payment:', error.response?.data || error.message);
      throw new HttpException(error.response?.data || 'Payment error', error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR);      
      //throw new HttpException(error.response.data, error.response.status);
    }
  }
}