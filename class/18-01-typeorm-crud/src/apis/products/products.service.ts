import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import {
  IProductsServiceCheckSoldout,
  IProductsServiceCreate,
  IProductsServiceFindOne,
  IProductsServiceUpdate,
} from './interfaces/products-service.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, //
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({ where: { id: productId } });
  }

  create({ createProductInput }: IProductsServiceCreate): Promise<Product> {
    const result = this.productsRepository.save({
      ...createProductInput,

      // 하나하나 직접 나열하는 방식
      //   name: '마우스',
      //   description: '좋은 마우스',
      //   price: 3000,
    });

    return result;

    // result 안에는 무엇이 있을까??
    // result = {
    //   id: 'qlkwjer - qwklakj',
    //   name: '마우스',
    //   description: '좋은 마우스',
    //   price: 3000,
    // };
  }

  update({
    product,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product> {
    // this.productsRepository.create() // DB 접속이랑 관련 없음. 등록을 위해서 빈 껍데기 객체 만들기 위함
    // this.productsRepository.insert() // 결과를 객체로 못 돌려받는 등록 방법
    // this.productsRepository.update() // 결과를 객체로 못 돌려받는 수정 방법

    const result = this.productsRepository.save({
      ...product, // 수정 후 수정되지 않은 다른 결과값까지 모두 받고 싶을 때 사용
      ...updateProductInput,
    });
    return result;
  }

  checkSoldout({ product }: IProductsServiceCheckSoldout): void {
    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다');

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }
}
