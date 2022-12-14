// const express = require('express') // 옛날방식 => commonjs
import express from 'express'         // 요즘방식 => module

import {checkEmail, getWelcomeTemplate, sendTemplateToEmail} from './email.js'
import {checkPhone, getToken, sendTokenToSMS} from './phone.js'// export 가져오기
// import express from 'express'                               // export default 가져오기
// import askjssdkl from 'express'                             // export default 이름 바꿔서 가져오기
// import askjssdkl, {checkPhone, getToken} from './phone.js'  // export default와 export 함께 가져오기

// import * as qqq from './phone.js'                           // export 한방에 다가져오기
// qqq.checkPhone                                              // export 한방에 다가져오기
// qqq.getToken                                                // export 한방에 다가져오기

import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import {options} from './swagger/config.js'
import cors from 'cors'

const app = express()
app.use(express.json()) // 옛날에는 bodyParser 사용
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options))); // app.get("/qqq", (req, res, next) => { 첫번째함수... next() }, () => { 두번째함수... })
app.get('/boards', (req, res) => {
  // 1. DB에 접속 후, 데이터를 조회 => 데이터 조회했다고 가정
  const result = [
    { number: 1, writer: "철수", title: "제목입니다~~", contents: "내용이에요!!!" },
    { number: 2, writer: "영희", title: "영희입니다~~", contents: "영희이에요!!!" },,
    { number: 3, writer: "훈이", title: "훈이입니다~~", contents: "훈이이에요!!!" },
  ]

  // 2. DB에서 꺼내온 결과를 브라우저에 응답(response) 주기
  res.send(result)
})

app.post("/boards", (req, res) => {
  // 1. 브라우저에서 보내준 데이터 확인하기
  console.log(req)
  console.log("=========================")
  console.log(req.body)

  // 2. DB에 접속 후, 데이터를 저장 => 데이터 저장했다고 가정


  // 3. DB에 저장된 결과를 브라우저에 응답(response) 주기
  res.send("게시물 등록에 성공하였습니다.")
})

app.post("/tokens/phone", (req, res) => {
    const myphone = req.body.qqq

   // 1. 휴대폰번호 자릿수 맞는지 확인하기(10~11자리)
   const isValid = checkPhone(myphone)
   if(isValid === false) return

   // 2. 핸드폰 토큰 6자리 만들기
   const mytoken = getToken()
   
   // 3. 핸드폰번호에 토큰 전송하기
   sendTokenToSMS(myphone, mytoken)
   res.send("인증완료!!!")
})

app.post("/users", (req, res) => {
  // const name = req.body.name
  // const age = req.body.age
  // const school = req.body.school
  // const email = req.body.email
  const { name, age, school, email } = req.body

  // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkEmail(email)
  if(isValid === false) return

  // 2. 가입환영 템플릿 만들기
  const myTemplate = getWelcomeTemplate({ name, age, school })

  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(email, myTemplate)
  res.send("가입완료!!!")
})

app.listen(4000, () => {
  console.log("백엔드 API 서버가 켜졌어요!!!")
})