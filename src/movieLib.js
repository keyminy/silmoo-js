import rawMovieData from '../reference/moveSampleData'
import moment from 'moment/moment';

console.clear();

//console.log(rawMovieData.slice(0,10));

const addCodeNameArray = (array,prefix,name) => {
  const code = `${prefix}${`${array.length + 1}`.padStart(5,'0')}`;
  return [...array,{code,name}];
}

//movieType은 {code,name}으로 관리하기
const movieType = rawMovieData.reduce(
  (acc,{typeNm:name}) => {
    return acc.some(obj => obj.name === name)
      ? acc : addCodeNameArray(acc,'TC',name);
  },
  []
)
console.log(movieType);

console.clear();

const nations = rawMovieData.reduce(
  (acc,{nationAlt}) => {
    return [
      ...acc,
      ...nationAlt
        .split(',')
        .filter(name => !acc.includes(name))
    ]
  }
  ,[]
).map((name,index) => {
  const code = `NC${`${index + 1}`.padStart(5,'0')}`
  return {code,name};
});
console.log(nations);

console.clear();

const directors = rawMovieData
  .reduce(
    (acc,{directors}) => {
      return [
        ...acc,
        ...directors
          .map(({peopleNm})=> peopleNm)
          .filter(name => !acc.some(obj => obj===name))
      ]
    },
    []
  )
  .map((name,index)=>{
    const code = `DC${`${index + 1}`.padStart(5,'0')}`;
    return {code,name};
  })
console.log(directors);

console.clear();

const companys = rawMovieData.reduce(
  (acc,{companys}) => {
    return [
      ...acc,
      //map함수의 callback매개변수에 우리가 넣을 code와 name으로 되게
      ...companys
        .map(({companyCd:code, companyNm:name}) => ({code,name}))
        .filter(({code})=> !acc.some(obj => obj.code === code))
    ]
  },
  []
);
console.log(companys);

console.clear();

const getCode = (array,name) => {
  // const finded = array.find(obj => obj.name === name);
  // return !finded ? null : finded.code;
  /*옵셔널 체이닝 : 찾으면 리턴해주고 없으면 undefined */
  return array.find(obj => obj.name === name)?.code;
}

const convertMovie = movie => {
  const {movieCd:code,movieNm:nameKor,movieNmEn:nameEng
  ,prdtYear,openDt,typeNm,prdtStatNm,
  nationAlt,genreAlt,repNationNm,
  repGenreNm,directors:originDirectors
  ,companys:originCompanys,posterPath,overview} = movie;

  const productYear = parseInt(prdtYear);
  const openDate = moment(openDt);
  const typeCode = getCode(movieType,typeNm);
  const nationList = nationAlt
    .split(',')
    .map(name => getCode(nations,name));
  const nationName = getCode(nations,repNationNm);
  const directorList = originDirectors.map(({peopleNm}) => 
    getCode(directors,peopleNm));
  const companyList = originCompanys.map(({companyCd}) => companyCd)

  return {code,nameKor,nameEng,openDate,typeCode
  ,nationList,nationName,directorList,companyList
  ,posterPath,overview,productYear};
}
console.clear();
// console.log(convertMovie(rawMovieData[0]));
// console.log(rawMovieData.slice(0,10)
//                 .map(convertMovie));
const movieArray = rawMovieData.map(convertMovie);

console.clear();

console.log('---------------기초 자료------------------');
console.log(`movieType : ${movieType.length} 생성`);
console.log(`nations : ${nations.length} 생성`);
console.log(`directors : ${directors.length} 생성`);
console.log(`companys : ${companys.length} 생성`);
console.log(`movieArray : ${movieArray.length} 생성`);
console.log('------------------------------------------');

const pagedMoviesByTitleOld = (page,pageCount,searchText) => {
  const retArray = [];
  const start = page * pageCount;
  const end = (page + 1) * pageCount;
  let count = 0;
  for(const movie of movieArray){
    const {
      nameKor,nameEng
    } = movie;
    if(nameKor.indexOf(searchText) !== -1
      || nameEng.indexOf(searchText) !== -1){
        count++;
        if(count >= start){
          if(count < end){
            retArray.push(movie);
          }else{
            break;
          }
        }
      }
  }
  return retArray;
}
//console.log(pagedMoviesByTitleOld(0,10,'아이'));

console.clear();

export const pagedMoviesByTitle = (page,pageCount,searchText) => {
  const all = movieArray.filter(
            ({nameKor,nameEng}) => 
              nameKor.indexOf(searchText) !== -1 
              || nameEng.indexOf(searchText) !== -1
            );
  const totalCount = all.length;
  const data = all.slice(page * pageCount,(page+1)*pageCount);
  return Promise.resolve({page,pageCount,totalCount,data});
}
  

//console.log(pagedMoviesByTitle(0,10,'아이'));

console.clear();

export const pagedMoviesByYear = (page,pageCount,year) => {
  const all = movieArray.filter(({productYear}) => productYear === year);
  const totalCount = all.length;
  const data = all.slice(page * pageCount,(page+1)*pageCount);
  return Promise.resolve({page,pageCount,totalCount,data});
}
