//1)배급공간에서 중간공간에 마지막꺼 빼고 옮긴다
//2)배급공간의 남은 마지막꺼를 목표공간에 옮긴다
//3)중간공간에서 목표공간에 옮긴다
//재귀반복
//from 변수, to 변수

function solution(n) {
    var answer = [];
    make_sub(n, 1, 3, 2, answer);
    return answer;
}

function make_sub(n, from, to, free, answer) {
    if (n-1 != 0) {
        make_sub(n-1, from, free, to, answer);
    }
    answer.push([from, to]);
    //console.log([from, to]);
    if (n-1 != 0) {
        make_sub(n-1, free, to, from, answer);
    }
    return answer;
}

/*
function solution(n) {
    var final = 2*n-1;
    var answer = new Array(final);
    for(let i=0; i<final; i++){
        answer[i] = new Array(2);
    }
    for(let j=0; j<n-1; j++) {
        answer[j][0] = 1;
        answer[j][1] = 2;
    }
    answer[n-1][0] = 1;
    answer[n-1][1] = 3;
    for(let k=0; k<n-1; k++) {
        answer[n+k][0] = 2;
        answer[n+k][1] = 3;
    }
    return answer;
}
*/