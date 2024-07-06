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
    var opers_s = [["*", "+", "-"], ["*", "-", "+"], ["-", "*", "+"], ["-", "+", "*"], ["+", "*", "-"], ["+", "-", "*"]];
    var oper_exe = {
        '*' : (a,b) => a*b,
        '+' : (a,b) => a+b,
        '-' : (a,b) => a-b
    };
    var answer_arr = Array(6).fill().map((_,i) => {
        var temp_exp_arr = exp_arr.slice();
        var opers = opers_s[i];
        opers.forEach((val) => {
            oper_what(temp_exp_arr, val, oper_exe);
        });
        
        return Math.abs(temp_exp_arr[0]);
    });

   
    return Math.max(...answer_arr);
}

function oper_what(exp_arr, oper, oper_exe){
    var i=1;
    while(i<exp_arr.length) {
        if(exp_arr[i] === oper) {
            var num1 = exp_arr.splice(i-1,1)[0];
            var num2 = exp_arr.splice(i,1)[0];
            exp_arr[i-1] = oper_exe[oper](num1, num2);
        } else{ i=i+2; }
    }
    return exp_arr;
}