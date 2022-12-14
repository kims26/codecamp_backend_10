import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productsSaleslocations/entities/productSaleslocation.entity';
import { ProductTag } from '../productsTags/entities/productTag.entity';
import { Product } from './entities/product.entity';
import {
  IProductsServiceCheckSoldout,
  IProductsServiceCreate,
  IProductsServiceDelete,
  IProductsServiceFindOne,
  IProductsServiceUpdate,
} from './interfaces/products-service.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, //

    @InjectRepository(ProductSaleslocation)
    private readonly productsSaleslocationsRepository: Repository<ProductSaleslocation>,

    @InjectRepository(ProductTag)
    private readonly productsTagsRepository: Repository<ProductTag>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  async create({
    createProductInput,
  }: IProductsServiceCreate): Promise<Product> {
    // 1. 상품만 등록하는 경우
    // const result = this.productsRepository.save({
    //   ...createProductInput,

    //   // 하나하나 직접 나열하는 방식
    //   //   name: '마우스',
    //   //   description: '좋은 마우스',
    //   //   price: 3000,
    // });

    // 2. 상품과 상품거래위치를 같이 등록하는 경우
    const { productSaleslocation, productCategoryId, productTags, ...product } =
      createProductInput;

    // 2-1) 상품거래위치 등록
    const result = await this.productsSaleslocationsRepository.save({
      ...productSaleslocation,

      // 하나하나 직접 나열하는 방식
      // address: productSaleslocation.address,
      // addressDetail: productSaleslocation.addressDetail,
      // lat: ...
    });

    // 2-2) 상품태그 등록
    //      => 상품태그 예시? productTags = ["#전자제품", "#영등포", "#컴퓨터"]
    const temp = [];
    for (let i = 0; i < productTags.length; i++) {
      const tagname = productTags[i].replace('#', ''); // "전자제품"

      const prevTag = await this.productsTagsRepository.findOne({
        where: { name: tagname },
      });

      // 기존에 태그가 존재한다면
      if (prevTag) {
        temp.push(prevTag); // { id: aslkdfasjk-asjk, name: "전자제품" }

        // 기존에 태그가 없었다면
      } else {
        const newTag = await this.productsTagsRepository.save({
          name: tagname,
        });
        console.log(newTag); // { id: aslkdfasjk-asjk, name: "전자제품" }
        temp.push(newTag);
      }
    }
    // 1. 실무에서 반드시 for문 써야하는 경우가 아니면, for문 잘 안 씀 => map, forEach 사용
    // 2. for안에서 await를 사용하지 않음 => 안티패턴 => Promise.all 사용
    // 3. DB에 동일한 패턴 데이터를 반복적으로 등록하지 않음(네트워크 왔다갔다 비효율) => bulk-insert 사용

    console.log(temp); // [{id: adskja-adkj, name: "전자제품"}, {id: akjas-129, name: "영등포"}, ...]

    // 2-3) 상품 등록
    const result2 = await this.productsRepository.save({
      ...product,
      productSaleslocation: result, // result 통째로 넣기 vs id만 빼서 넣기
      productCategory: {
        id: productCategoryId,
        // 만약에, name 까지 받고싶으면 2가지 방법?
        //   1) createProductInput에서 카테고리 name도 받아오기
        //   2) productCategoryId를 사용해서 카테고리 name을 조회하기
      },
      productTags: temp,

      // 하나하나 직접 나열하는 방식
      // name: product.name,
      // description: product.description,
      // price: product.price,
      // productSaleslocation: {
      //   id: result.id,
      // },
    });

    // 최종 결과 돌려주기
    return result2;
  }

  update({ product, updateProductInput }: IProductsServiceUpdate): void {
    // this.productsRepository.create() // DB 접속이랑 관련 없음. 등록을 위해서 빈 껍데기 객체 만들기 위함
    // this.productsRepository.insert() // 결과를 객체로 못 돌려받는 등록 방법
    // this.productsRepository.update() // 결과를 객체로 못 돌려받는 수정 방법
    // 숙제:
    //   1) 왜 아래 에러가 발생하는지 고민해보기
    //   2) 아래 에러 고쳐보기
    // const result = this.productsRepository.save({
    //   ...product, // 수정 후 수정되지 않은 다른 결과값까지 모두 받고 싶을 때 사용
    //   ...updateProductInput,
    // });
    // return result;
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

  async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
    // 1. 실제 삭제
    // const result = await this.productsRepository.delete({ id: productId });
    // return result.affected ? true : false;

    // 2. 소프트 삭제(직접 구현) - isDeleted
    // this.productsRepository.update({ id: productId }, { isDeleted: true })

    // 3. 소프트 삭제(직접 구현) - deletedAt
    // this.productsRepository.update({ id: productId }, { deletedAt: new Date() });

    // 4. 소프트 삭제(TypeORM 제공) - softRemove
    // this.productsRepository.softRemove({ id: productId }); // 단점: id로만 삭제 가능
    //                                                        // 장점: 여러ID 한번에 지우기도 가능 => .softRemove([{id: qqq}, {id: aaa}])

    // 5. 소프트 삭제(TypeORM 제공) - softDelete
    const result2 = await this.productsRepository.softDelete({ id: productId }); // 장점: 다른 컬럼으로도 삭제 가능
    return result2.affected ? true : false; //                                   // 단점: 여러ID 한번에 지우기 불가능
  }
}
