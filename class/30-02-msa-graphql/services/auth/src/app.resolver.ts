// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';
import { Resolver, Mutation } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  // constructor(private readonly appService) {}

  @Mutation(() => String)
  login() {
    return 'accessToken!!!';
  }
}
