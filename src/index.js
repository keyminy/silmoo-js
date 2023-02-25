import * as R from 'ramda'

console.clear();

//직접 키보드로 치십시오
const queryMovie = (page,pageCount,name,year) => {
  const totalCount = 10;
  const data = [];
  console.log('query 실행',page,pageCount,name,year);
  return {
    page,
    pageCount,
    totalCount,
    data
  }
}

const makeDisplayData = (data,page,pageCount,totalCount) => {
  const movie = [
    "move 1","movie 1","movie 1", "movie 1"
  ];
  const pagenation = "<< < 1 2 [3] 4 5 > >>";
  return {
    movie,
    pagenation
  }
}

const display = (movie,pagenation) => {
  movie.forEach(d => console.log(`<div>${d}</div>`))
  console.log(pagenation);
}

//예전 방식 함수
const queryMovieByName = (name) => {
  const page = 0;
  const pageCount = 10;
  const year = null;
  const {
    data,totalCount
  } = queryMovie(page,pageCount,name,year);
  const {
    movie,
    pagenation
  } = makeDisplayData(data,page,pageCount,totalCount);
  display(movie,pagenation);
}

const queryMovieByName2 = (name) => {
  const page = 0;
  const pageCount = 10;
  const year = null;
  //1.argument의 수가 맞지 않을 때, ramdajs의 curry를 써서 맞출 수 있음
  const query = R.curry(queryMovie)(page,pageCount,R.__,year);
  //2.pipe를 제대로 쓸려면 argument가 다음과 같이 무조건 1개여야 한다.
  const make = ({data,totalCount}) => makeDisplayData(data,page,pageCount,totalCount);
  const displayWrap = ({movie,pagenation}) => display(movie,pagenation);
  /*
  const make = (arg) => {
    const {
      data,totalCount
    } = arg;
    return makeDisplayData(data,page,pageCount,totalCount);
  }
  const displayWrap = (arg) => {
    const {
      movie,pagenation
    } = arg;
    return display(movie,pagenation);
  }
  */
  const fnt = R.pipe(
    query,
    make,
    displayWrap
  );
  fnt(name);
}

queryMovieByName('아이');
queryMovieByName2('홍길동');