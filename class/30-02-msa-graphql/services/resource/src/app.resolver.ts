// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';
import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  // constructor(private readonly appService) {}

  @Query(() => String)
  fetchBoards() {
    return '게시글 데이터 보내기';
  }
}
