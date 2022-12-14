import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/create-board.input';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService, //

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => String)
  async fetchBoards(): Promise<string> {
    // 1. 캐시에서 조회하는 연습
    const mycache = await this.cacheManager.get('aaa');
    console.log(mycache);

    // 2. 조회완료 메시지 전달
    return '캐시에서 조회 완료!!';

    ////////////////////////////////////////////////////////////
    // 레디스 연습을 위해서 잠시 주석 걸기!!!
    // return this.boardsService.findAll();
  }

  @Mutation(() => String)
  async createBoard(
    // @Args('writer') writer: string,
    // @Args('title') title: string,
    // @Args({ name: 'contents', nullable: true }) contents: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): Promise<string> {
    // 1. 캐시에 등록하는 연습
    await this.cacheManager.set('aaa', createBoardInput, 0);

    // 2. 등록완료 메시지 전달
    return '캐시에 등록 완료!!';

    ////////////////////////////////////////////////////////////
    // 레디스 연습을 위해서 잠시 주석 걸기!!!
    // return this.boardsService.create({ createBoardInput });
  }
}

// 타입이 자동으로 만들어짐
// Query: {
//     fetchBoards: String
// }
