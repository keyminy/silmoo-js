//import es6A,{value,hello as hi} from './lib_es6';
/* 모듈 전부 import하기 */
import * as M from './lib_es6';

console.log(M);

const {
  a,
  fnt
} = M.default;

console.log(a);//10
fnt();//실무코딩
M.print('메시지');
//hello('실무코딩');
//hi('실무코딩'); //안녕하십니까? 실무코딩님!