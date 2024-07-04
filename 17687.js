//t는 반복횟수
//m은 반복주기
//p는 첫번째 차례
//p+im(i=0~t-1)가 result의 길이. 튜브의 대답 횟수.
//첫번째:p, 두번째:m*p, 세번째:2*m*p, 네번째:3*m*p
//2진수 : 0 1 10 11 100 101 110 111
function solution(n, t, m, p) {
    var answer = '';
    var now_num = 0;
    var count = 1;
    var now_num_count = 1;
    var now_num_length = (now_num.toString(n)).length;
    var p_m_0 = p;
    if (p === m) {
        p_m_0 = 0;
    }
    while (count <= p+(t-1)*m) {
        //console.log("count:"+count.toString());
        if (count%m == p_m_0) {
            answer += ((now_num.toString(n))[now_num_count-1]).toUpperCase();
            //console.log(now_num.toString(n));
        }
        if (now_num_count == now_num_length) {
            now_num++;
            now_num_count = 1;
            now_num_length = (now_num.toString(n)).length;
        } else {
            now_num_count++;
        }

        count++;
    }
    return answer;
}