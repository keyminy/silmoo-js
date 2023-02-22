/*클래스로 모델링하기
emp1 홍길동 남 팀장
emp2 박철수 남 실장
emp3 이상우 남 로드매니저

artist1 안혜경 여 가수 ['하늘거리는 풍경','다시 만남 다시 이별','속삭이는 ']
artist2 송선우 남 PD ['하늘거리는 풍경']
*/
const emp1 = {
  name : '홍길동',
  gender : '남',
  position : '팀장',
  getCallName : () => `${emp1.name} ${emp1.position}님`
}
const emp2 = {
  name : '박철수',
  gender : '남',
  position : '실장',
  getCallName : () => `${emp2.name} ${emp2.position}님`
}
const emp3 = {
  name : '이상우',
  gender : '남',
  position : '로드매니저',
  getCallName : () => `${emp3.name} ${emp3.position}님`
}


/* 가수 */
const artist1 = {
  name : '안혜경',
  gender : '여',
  kind : '가수',
  songs : ['하늘거리는 풍경','다시 만남 다시 이별','속삭이는 낱말'],
  getCallName : () => `${artist1.name} ${artist1.kind}님`
}
const artist2 = {
  name : '송선우',
  gender : '남',
  kind : 'PD',
  songs : ['하늘거리는 풍경'],
  getCallName : () => `${artist2.name} ${artist2.kind}님`
}

class Person {
  firstName = null;
  lastName = null;
  gender = null;
  get name() {
    return this.firstName + this.lastName;
  }
  constructor(name,gender){
    this.firstName = name.substr(0,1);
    this.lastName = name.substr(1);
    this.gender = gender;
  }
}

class Employee extends Person{
  position = null;
  constructor(name,gender,position){
    super(name,gender);
    this.position = position;
  }
  getCallName = () => `${this.name} ${this.position}님`
}

const emp1_ = new Employee('홍길동','남','팀장');
const emp2_ = new Employee('박철수','남','실장');
const emp3_ = new Employee('이상우','남','로드매니저');
console.log(emp1_.getCallName());
console.log(emp2_.getCallName());
console.log(emp3_.getCallName());

class Artist extends Person{
  kind = null;
  songs = [];
  constructor(name,gender,kind,songs){
    super(name,gender);
    this.kind = kind;
    this.songs = songs;
  }
  getCallName = () => `${this.name} ${this.kind}님`
}

const artist1_ = new Artist('안혜경','여','가수',['하늘','어쩌구']);
console.log(artist1_.getCallName());

class Wheel {}
class Gear {}
class Body {}
//is-a관계
class Bicycle1 extends Wheel,Gear,Body{

}
//has-a관계
class Bicycle2{
  wheel = new Wheel();
  gear = new Gear();
  body = new Body();
}