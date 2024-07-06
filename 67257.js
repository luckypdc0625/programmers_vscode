//0 <= 숫자 <= 999
//연산자 : +, -, *만 가능
//3 <= 문자열 <= 100 (적어도 1개 이상의 연산자 포함)

//solution의 리턴값 : 가장 큰 값

// - 매개변수 탐색 여부 -
// 1. 값의 범위로 따지기 : 구하는 과정에서 절대값이 커지거나 작아져서 도중에 범위 판단 불가
// 2. 값 그 자체로 따지기 : 6가지 중에 1가지를 구하고 비교하는거라 그럴거면 6개 실제로 구하는게 더 빠름
// 3. 안씀

// - 재귀 여부 -
// 1. 같은 로직 만들게 없음

// - 클래스 여부 -
// 1. 체인 로직이 없음

// 일단 6가지 답에서 각 연산자가 최우선인게 두번이 나오니까 값을 저장해두면 좋다


function solution(expression) {
    
    //반드시 홀수 인덱스가 연산자
    var exp_arr = [];
    var temp = "";
    for(let i=0; i<expression.length; i++) {
        if(!isNaN(expression[i])) {
            temp+=expression[i];
            if (i+1 === expression.length || isNaN(expression[i+1])) {
                exp_arr.push(parseInt(temp));
            }
        } else {
            temp = "";
            exp_arr.push(expression[i]);
        }
    }
    var answer = 0;
    // *>+>-
    var exp_arr1 = exp_arr.slice();
    exp_arr1 = oper_multi(exp_arr1);
    exp_arr1 = oper_add(exp_arr1);
    answer = Math.abs(oper_sub(exp_arr1));
    // *>->+
    temp = 0;
    var exp_arr2 = exp_arr.slice();
    exp_arr2 = oper_multi(exp_arr2);
    exp_arr2 = oper_sub(exp_arr2);
    temp = Math.abs(oper_add(exp_arr2));
    if (temp>answer) {answer=temp;}
    // ->*>+
    var exp_arr3 = exp_arr.slice();
    exp_arr3 = oper_sub(exp_arr3);
    exp_arr3 = oper_multi(exp_arr3);
    temp = Math.abs(oper_add(exp_arr3));
    if (temp>answer) {answer=temp;}
    // ->+>*
    var exp_arr4 = exp_arr.slice();
    exp_arr4 = oper_sub(exp_arr4);
    exp_arr4 = oper_add(exp_arr4);
    temp = Math.abs(oper_multi(exp_arr4));
    if (temp>answer) {answer=temp;}
    // +>*>-
    var exp_arr5 = exp_arr.slice();
    exp_arr5 = oper_add(exp_arr5)
    exp_arr5 = oper_multi(exp_arr5)
    temp = Math.abs(oper_sub(exp_arr5));
    if (temp>answer) {answer=temp;}
    // +>->*
    var exp_arr6 = exp_arr.slice();
    exp_arr6 = oper_add(exp_arr6);
    exp_arr6 = oper_sub(exp_arr6);
    temp = Math.abs(oper_multi(exp_arr6));
    if (temp>answer) {answer=temp;}

    return answer;
}

function oper_multi(exp_arr){
    var i=1;
    while(i<exp_arr.length) {
        if(exp_arr[i] === "*") {
            var num1 = exp_arr.splice(i-1,1)[0];
            var num2 = exp_arr.splice(i,1)[0];
            exp_arr[i-1] = num1 * num2;
        } else{ i=i+2; }
    }
    return exp_arr;
}
function oper_add(exp_arr){
    var i=1;
    while(i<exp_arr.length) {
        if(exp_arr[i] === "+") {
            var num1 = exp_arr.splice(i-1,1)[0];
            var num2 = exp_arr.splice(i,1)[0];
            exp_arr[i-1] = num1 + num2;
        } else{ i=i+2; }
    }
    return exp_arr;
}
function oper_sub(exp_arr){
    var i=1;
    while(i<exp_arr.length) {
        if(exp_arr[i] === "-") {
            var num1 = exp_arr.splice(i-1,1)[0];
            var num2 = exp_arr.splice(i,1)[0];
            exp_arr[i-1] = num1 - num2;
        } else{ i=i+2; }
    }
    return exp_arr;
}