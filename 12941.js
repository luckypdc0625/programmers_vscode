// 곱연산 1~1000번
// 최소인지 어케 알고 두개 뽑아???
// 하나마다 정해진 짝이 있나?
// A가 숫자들이라고 치면, B가 각 A를 더하는 횟수라고 볼수있음.
// 제일 큰 수를 적게 더하고 제일 작은 수를 여러번 더하기

function solution(A,B){
    var answer = 0;
    A.sort(function(a,b) {return a-b});
    B.sort(function(a,b) {return b-a});
    return A.reduce((acc, cur, idx) => acc += (cur * B[idx]), 0);
}