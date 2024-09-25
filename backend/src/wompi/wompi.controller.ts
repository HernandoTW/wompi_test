/*
import { Controller, Post, Body } from '@nestjs/common';
import { WompiService } from './wompi.service';

@Controller('payments')
export class WompiController {
  constructor(private readonly wompiService: WompiService) {}

  @Post()
  async createPayment(@Body() paymentDto: { token: string, amount: number, currency: string }) {
    const { token, amount, currency } = paymentDto;
    return await this.wompiService.createPayment(token, amount, currency);
  }
}
*/

import { Controller, Post, Body } from '@nestjs/common';
import { WompiService } from './wompi.service';

@Controller('payments')
export class WompiController {
  constructor(private readonly wompiService: WompiService) {}

  @Post()
  async createPayment(
    @Body() paymentData: { token: string; amount: number; currency: string }
  ) {
    return await this.wompiService.createPayment(paymentData.token, paymentData.amount, paymentData.currency);
  }
}
