// 防抖动 闭包的写法
export function debounce(func, delay) {
	
  let timer=null;
  return function(...args) {
		// console.log(args);
		// console.log(this);
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
			// console.log(args);
      func.apply(this, args)
    }, delay)
  }
}

export function test(func,...args){
	console.log(...args);
}