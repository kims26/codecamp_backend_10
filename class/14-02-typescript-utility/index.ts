interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

// 1. Partial 타입
type aaa = Partial<IProfile>;

// 2. Required 타입
type bbb = Required<IProfile>;

// 3. Pick 타입
type ccc = Pick<IProfile, "name" | "age">;

// 4. Omit 타입
type ddd = Omit<IProfile, "school">;

// 5. Record 타입
type eee = "철수" | "영희" | "훈이"; // Union 타입
let child: eee;
child = "철수";

type fff = Record<eee, IProfile>; // Record 타입

type ggg = keyof IProfile; // "name" | "age" | "school" | "hobby" 형태의 Union 타입
let myprofile: ggg;
myprofile = "hobby";

//
//
// ========== (type vs interface) 차이: 선언병합 ==========
interface IProfile {
  candy: number;
}

let profile: Partial<IProfile> = {
  candy: 100,
};
