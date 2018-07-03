// underscore library
// 우리가 사용할 수 있는 underscore 객체를 리턴
var _ = require('underscore');
var arr = [3, 6, 9, 1, 12];

console.log(arr[0]);
console.log(_.first(arr));

console.log(arr[arr.length - 1]);

// 가독성도 높고 처리할 것도 적어짐
console.log(_.last(arr));
