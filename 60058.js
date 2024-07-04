// 1쌍~500쌍
// left개수 right 개수 세다가 같아지면 스탑.
// u는 무조건 맨앞 괄호 모양이 많을수밖에 없다 -> 왜냐면 괄호 개수가 같아지면 u가 끝남
// u 올바 : 무조건 (가 맨앞. v 실행.
// u 균형 : 무조건 )가 맨앞. 맨앞맨뒤 뗌. 나머지는 무조건 )로 시작. 왜냐면 맨첨 u가 )(...면 거기서 u가 끝남.
// 그 )로 시작하는것도 )가 제일 많다가 괄호 개수가 (으로 마감되고 같아지면 끝나는건데 이거 뒤집으면 올바.

function solution(p) {
    var answer = '';
    var u = '';
    var v = p;
    answer = v_run(v);
    return answer;
}

function v_run(parent_v) {
    var left = 0;
    var right = 0;
    var u = "";
    var v = "";
    var v_start = -1;
    var corr = true;
    if(parent_v.length === 0) {
        return "";
    } else if(parent_v[0] === '(') {
        left += 1;
        u += "(";
    } else {
        right += 1;
        u += ")";
        corr = false;
    }
    for (let i=1; i<parent_v.length; i++) {
        if(parent_v[i]=== '(') {
            left += 1;
            u += "(";
        } else {
            right += 1;
            u += ")";
        }
        if(left === right) {
            v_start = i+1;
            break;
        }
    }
    if(v_start === parent_v.length) {
        v = "";
    } else {
        v = v_run(parent_v.substr(v_start));
    }
    if(!corr) {
        var temp1 = "(" + v + ")";

        var temp2 = u.substr(1, u.length-2);
        temp2 = temp2.replace(/\(/g, '-');
        temp2 = temp2.replace(/\)/g, '(');
        temp2 = temp2.replace(/-/g, ')');
        temp1 += temp2;
        return temp1;
    } else{
        return u+v;
    }
}