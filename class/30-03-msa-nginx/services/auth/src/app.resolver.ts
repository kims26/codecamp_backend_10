import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Resolver, Mutation, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  // @Get('/products/buy')
  // buyProduct(): string {
  //   return this.appService.getHello();
  // }
  @Mutation(() => String)
  login() {
    return 'login 성공!!';
  }

  @Query(() => String)
  aaa() {
    return 'aaa';
  }
}
