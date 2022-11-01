// import { htmlContent } from './util/util'
// import {front} from './util/tools'
import {add} from 'ts/index'
// import {plus} from 'commons/ts/test'
// import './css/iconfont.css'
// import './css/index.css'
import _ from 'lodash'


const total = add(1,21)
console.log(total)

// const ps = plus(3,4)
// console.log(ps)
const testAds =(a,b) => {
    console.log(a + b)
}

testAds(1,5)

const fn = _.debounce(() => {testAds(1,5)}, 100)
console.log(fn)



function component() {
    const element = document.createElement('div');

    // lodash（目前通过一个 script 引入）对于执行这一行是必需的
    element.innerHTML = `${12}`
    // console.log(front,htmlContent)
    return element;
}


document.body.appendChild(component());
