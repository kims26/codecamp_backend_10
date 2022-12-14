import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { Payment } from './entities/payment.entity';
import { PaymentsService } from './payments.service';

@Resolver()
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}
  @Mutation(() => Payment)
  async createPayment(
    @Args('amount') amount: number, //
  ) {
    return await this.paymentsService.create({ amount });
  }

  @Query(() => [Payment])
  async fetchPayments() {
    return await this.paymentsService.findAll();
  }
}
