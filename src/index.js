import rawMovieData from '../reference/moveSampleData'

console.clear();

console.log(rawMovieData.slice(0,10));

const addCodeNameArray = (array,prefix,name) => {
  const code = `${prefix}${`${array.length + 1}`.padStart(5,'0')}`;
  return [...array,{code,name}];
}

//movieType은 {code,name}으로 관리하기
const movieType = rawMovieData.reduce(
  (acc,{typeNm:name}) => {
    //const {typeNm:name} = cur ?? {}
    return acc.some(obj => obj.name === name)
      ? acc : addCodeNameArray(acc,'TC',name);
  },
  []
)
console.log(movieType);

const nations = rawMovieData.reduce(
  (acc,{nationAlt}) => {
    return [
      ...acc,
      ...nationAlt
        .split(",")
        .filter(name => !acc.includes(name))
    ]
  }
  ,[]
).map((name,index)=> {
  const code = `NC${`${index + 1}`.padStart(5,'0')}`;
  return {code,name};
})
console.log(nations);

console.clear();

const directors = rawMovieData
  .reduce(
    (acc,{directors}) => {
      return [
        ...acc,
        ...directors
          .map(({peopleNm}) => peopleNm)
          .filter(name => !acc.some(obj => obj.name === name))
      ]
    },
    []
  )
  .map((name,index)=> {
    const code = `DC${`${index + 1}`.padStart(5,'0')}`;
    return {code,name};
  });
console.log(directors);

//console.clear();

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