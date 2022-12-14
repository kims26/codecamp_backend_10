// const express = require('express') // 옛날방식 => commonjs
import express from "express"; // 요즘방식 => module
import { CouponController } from "./mvc/controllers/coupon.controller.js";
import { ProductController } from "./mvc/controllers/product.controller.js";
import { CashService } from "./mvc/controllers/services/cash.service.js";
import { PointService } from "./mvc/controllers/services/point.service.js";
import { ProductService } from "./mvc/controllers/services/product.service.js";

const app = express();

const productService = new ProductService();
const cashService = new CashService(); // 1. new 한번으로 모든 곳에서 재사용 가능(싱글톤패턴)
const pointService = new PointService(); // 2. 쿠폰 구매 방식이 포인트결제로 변경됨(의존성주입)

// 상품 API
const productController = new ProductController(cashService, productService);
app.post("/products/buy", productController.buyProduct); // 상품 구매하기 API
app.post("/products/refund", productController.refundProduct); // 상품 환불하기 API

// 쿠폰(상품권) API
const couponController = new CouponController(pointService);
app.post("/coupons/buy", couponController.buyCoupon); // 쿠폰 구매하기 API

// 만약!! 싱글톤이 아니고, 요청(Request)마다 매번 new 해서 쓰고 싶다면..???
// app.post("/coupons/buy", (req, res) => {
//   const pointService = new PointService();
//   const couponController = new CouponController(pointService);
//   couponController.buyCoupon(req, res);
// });

// 게시판 API
// app.get("/boards/...")

app.listen(3000, () => {
  console.log("백엔드 API 서버가 켜졌어요!!!");
});

//
// 1. ProductController가 CashServic에 의존하고 있음(CashService => 의존성)
//    => 이 상황을 "강하게 결합되어있다" 라고 표현 => tight-coupling

// 2. 개선하기 위해서 "느슨한 결합"으로 변경할 필요가 있음 => loose-coupling
//    => 이러한 변경을 위해서 밖에서 "의존성주입" 해줌 => Dependency-Injection(DI)
//    => 이 역할을 대신 해주는 Nestjs 도구 => IoC 컨테이너 (DI 해주는 애) => Inversion-Of-Control

// 3. "의존성주입"으로 new를 2번 이상 할 필요가 없어짐. 또한, 하나의 의존성을 여러곳에서 재사용 => "싱글톤패턴"
//    => 대상 class의 소스코드를 직접 수정하지 않고 변경 가능(cashService => pointService 바꿔치기) => 핵심!!!

// 4. "의존성주입"이면, "싱글톤패턴"인가?! => 아님!! (단지, 디폴트가 "싱글톤"이었을 뿐!)
