import fs from 'fs';

const callback1 = (flag) =>
  console.log(!flag ? '존재하지 않습니다' : '존재합니다');
fs.exists('./.babelrc',callback1);

console.clear();

new Promise((resolve,reject)=> {
  //flag가 true면 resolve(true) -> 정상실행됨
  //flag가 false면 resolve(false) -> 오류리턴
  const callback = flag => flag? resolve(true) : reject(false);
  fs.exists('./.babelrc',callback);
}).then(value => {
  console.log('res : ',value);
  console.log('파일있어용');
}).catch(err => {
  console.log('err : ',err);
  console.log('파일 없어용');
}).finally(()=>{
  console.log('마지막 실행');
});

//then으로 실질적으로 수행된 내용을 받습니다.

console.clear();
/* file들이 존재하는지 확인하는 프로그램 */
// ./.babelrc
// ./package.json
// ./webpack.config.js
const checkWebpackConfig = () => {
  const callback = flag => !flag 
  ? console.log('./webpack.config.js가 없습니다')
  : console.log('모든 파일이 있습니다.');
  fs.exists('./webpack.config.js',callback);
}

const checkPackageJSON = () => {
  const callback = flag => !flag 
  ? console.log('./package.json가 없습니다')
  : checkWebpackConfig()
  fs.exists('./package.json',callback);
}

const checkAllFiles = () => {
  const callback = flag => !flag 
  ? console.log('./.babelrc가 없습니다')
  : checkPackageJSON()
  fs.exists('./.babelrc',callback);
}
console.clear();
checkAllFiles();

/* promise형태로 변경 */
const checkFile = filename => new Promise(
  (resolve,reject) => {
    //callback함수는 인자로오는 filename의 파일값의 존재유무에 따라
    //reject와 resolve가 나뉘어 집니다.
    const callback = flag => (!flag) 
        ? reject(filename)
        : resolve(null)
    fs.exists(filename,callback);
  }
);

//실행부분
checkFile('./.babelrc') //예약티켓 발매
  //통과되면 package.json파일 검사
  .then(() => checkFile('./package.json')) //오류 시 : ./package.json_이 존재하지 않습니다.
  .then(() => checkFile('./webpack.config.js'))
  .then(()=> console.log('[promise] 모든 파일이 존재합니다.'))
  .catch(filename => {
    console.log(`${filename}이 존재하지 않습니다.`);
  });

console.clear();

Promise.resolve(1)
  .then(value => console.log(value))
  .catch(err => console.log('오류',err))

Promise.resolve()
  .then(()=> console.log('1을 실행'))
  .then(()=> console.log('2을 실행'))
  .then(()=> console.log('3을 실행'))
  .then(()=> console.log('4을 실행'))
  .then(()=> Promise.reject(1))
  .then(()=> console.log('5을 실행'))
  .then(()=> console.log('6을 실행'))
  .then(()=> console.log('7을 실행'))
  .then(()=> console.log('8을 실행'))
  .catch(err => console.log('오류'))

const array = [1000,2000,3000]
  .map(value => new Promise(resolve => {
    setTimeout(()=>{
      console.log(`${value} 실행`);
      resolve(value);
    },value);
  }));
console.log(array);

Promise.allSettled(
  [
  ...[1000,2000,3000]
    .map(value => new Promise(resolve => {
      setTimeout(()=>{
        console.log(`${value} 실행`);
        resolve(value);
      },value);
    })),
    Promise.reject(1),
    Promise.reject(2)
  ]
)
.then((result)=>{
  console.log({result});
})
.catch(err => console.log('오류',err));
console.clear();

const test = async () => {
  const p = new Promise((resolve,reject) => {
    console.log('내부 실행');
    resolve(10);
  });
  const inner = async () => await Promise.resolve(2);
  const array = Promise.all(
                        [1000,2000,3000]
                        .map(val => Promise.resolve(val))
                        );
  try {
    console.log('1차 실행',await p,await array);
  } catch (err) {
    console.log('오류',err);
  }
}

test();