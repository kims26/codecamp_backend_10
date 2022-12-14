// const { ApolloServer, gql } = require('apollo-server');
import { ApolloServer, gql } from 'apollo-server'

const typeDefs = gql`
  input CreateBoardInput {
    writer: String
    title: String
    contents: String
  }

  type MyReturn {
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    # fetchBoards: MyReturn # 객체 1개를 의미!
    fetchBoards: [MyReturn] # 배열 안에 객체 1개 이상을 의미!
  }

  type Mutation {
    # createBoard(writer: String, title: String, contents: String): String
    createBoard(createBoardInput: CreateBoardInput!): String
  }
`;

const resolvers = {
  Query: {
    fetchBoards: (parent, args, context, info) => {
       // 1. DB에 접속 후, 데이터를 조회 => 데이터 조회했다고 가정
      const result = [
        { number: 1, writer: "철수", title: "제목입니다~~", contents: "내용이에요!!!" },
        { number: 2, writer: "영희", title: "영희입니다~~", contents: "영희이에요!!!" },,
        { number: 3, writer: "훈이", title: "훈이입니다~~", contents: "훈이이에요!!!" },
      ]

      // 2. DB에서 꺼내온 결과를 브라우저에 응답(response) 주기
      return result
    },
  },

  Mutation: {
    createBoard: (_, args) => {
      // 1. 브라우저에서 보내준 데이터 확인하기
      console.log(args)
      console.log("=========================")
      console.log(args.createBoardInput.writer)
      console.log(args.createBoardInput.title)
      console.log(args.createBoardInput.contents)

      // 2. DB에 접속 후, 데이터를 저장 => 데이터 저장했다고 가정


      // 3. DB에 저장된 결과를 브라우저에 응답(response) 주기
      return "게시물 등록에 성공하였습니다."
    },

    // 과제) 아래 API가 작동되도록 만들기 - [ 힌트: 1) phone.js , 2) res.send , 3) 타입 작성하기 ]
    // createTokenOfPhone: (_, args) => {
    //   const myphone = req.body.qqq

    //   // 1. 휴대폰번호 자릿수 맞는지 확인하기(10~11자리)
    //   const isValid = checkPhone(myphone)
    //   if(isValid === false) return
   
    //   // 2. 핸드폰 토큰 6자리 만들기
    //   const mytoken = getToken()
      
    //   // 3. 핸드폰번호에 토큰 전송하기
    //   sendTokenToSMS(myphone, mytoken)
    //   res.send("인증완료!!!")
    // }
  }
};

const app = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  cors: true,                                                    // 모든 사이트 허용하고 싶을 때
  // cors: { origin: ["https://naver.com", "https://daum.net"] } // 특정 사이트만 지정하고 싶을 때
});

app.listen(3000).then(() => {
  console.log("백엔드 API 서버가 켜졌어요!!!");
});