import {getToday} from './utils.js'
import nodemailer from 'nodemailer'

export function checkEmail(myemail){
    if(myemail === undefined || myemail.includes("@") === false){
        console.log("에러 발생!!! 이메일 주소를 제대로 입력해 주세요!!!")
        return false
    } else {
        return true
    }
}

export function getWelcomeTemplate({ name, age, school }){
    const mytemplate = `
        <html>
            <body>
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 500px;">
                        <h1>${name}님 가입을 환영합니다!!!</h1>
                        <hr />
                        <div style="color: red;">이름: ${name}</div>
                        <div>나이: ${age}</div>
                        <div>학교: ${school}</div>
                        <div>가입일: ${getToday()}</div>
                    </div>
                </div>
            </body>
        </html>
    `
    // console.log(mytemplate)
    return mytemplate
}

export async function sendTemplateToEmail(myemail, mytemplate){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "nwd0907@letsdingco.com",
            pass: "",
        }
    })

    const result = await transporter.sendMail({
        from: "nwd0907@letsdingco.com",
        to: myemail,
        subject: "[코드캠프] 가입을 축하합니다!!!",
        html: mytemplate
    })
    console.log(result)

    // console.log(myemail + "이메일로 가입환영템플릿 " + mytemplate + "를 전송합니다.")
}