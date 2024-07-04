//일단 A의 최적을 구함
//그리고 B의 최적을 구함
//[A요금, B요금, AB요금]
//헤어졌다가 다시 합칠거면 둘중에 싼쪽으로 같이가는게 나음
//즉 한번 헤어지면 영영 헤어짐
//헤어짐을 언제 결정?
//일단 트리로 움직이고, 재귀, visited
//지나온 경로랑 자식노드를 visited에 기록하고, 상위노드로 되돌아오면 되돌아온곳만 남겨두고 자식노드는 삭제
//합승먼저 따지고 -> 헤어지고 개별따지기? ㄴㄴ 스택이라 안됨
//기본적으로는 별모든경우+합모든경우를 스택에 쌓는다
//별모든경우에 들어갔으면 계속 별모든경우를 쌓는다
//가다가 a와 b가 둘다 원래보다 요금이 커지면 중단
//a 혹은 b에 도착했는데 요금이 기존보다 더 적으면 저장
//조건에 a와 b가 각각 도착했는지를 넣어주면 하나만 비교가능

a_global = -1;
b_global = -1;
stack = [];
memo = {};
answer = Number.MAX_SAFE_INTEGER;

function solution(n, s, a, b, fares) {
    var visited = new Array(n).fill(false);
    a_global = a;
    b_global = b;
    step(s, 0, true, visited, fares.slice());
    return answer;
}

function step(now, acc_fare, carpool, visited, fares) {
    var t_f = 'f';
    if(carpool) {
        t_f = 't';
    }
    stack.push(now.toString()+t_f);
    // console.log(stack);
    visited[now-1] = true;
    if(acc_fare>answer) {
        stack.pop();
        return;
    }
    var key = "";
    for (let i=0; i<stack.length; i++) {
        if(stack[i].includes("t")) {
            key+=stack[i];
        } else if (stack[i].includes("f")) {
            break;
        }
    }
    var key_a =key+ "a";
    var key_b =key+ "b";

    if (now == a_global) {
        //이 합승에 기록이 처음이면
        if(!Object.keys(memo).includes(key_a)) {
            memo[key_a] = acc_fare;
        //처음 아닌데 최소값 아니면
        } else if(memo[key_a]>acc_fare){
            memo[key_a] = acc_fare;
        }
        // console.log("★★★★★a비용:"+a);
    }
    if (now == b_global) {
        //이 합승에 기록이 처음이면
        if(!Object.keys(memo).includes(key_b)) {
            memo[key_b] = acc_fare;
        //처음 아닌데 최소값 아니면
        } else if(memo[key_b]>acc_fare){
            memo[key_b] = acc_fare;
        }
        // console.log("●●●●●b비용:"+b);
    }
    // console.log(memo);
    if (Object.keys(memo).includes(key_a)&&Object.keys(memo).includes(key_b)) {
        if (memo[key_a] < acc_fare && memo[key_b] < acc_fare) {
            //console.log("버려도됨");
            stack.pop();
            return;
        }
        var temp = Number(memo[key_a]);
        temp+=Number(memo[key_b]);
        // console.log("temp:"+temp);
        if (answer > temp) {
            answer = temp;
        }
        // console.log("------그래서-----answer:"+answer);
    }
    for (let i=0; i<fares.length; i++) {
        var new_fares = fares.slice()
        new_fares.splice(i,1)[0];
        if (fares[i][0] == now && !visited[fares[i][1]-1]) {
            // console.log("[♡♡] "+now+"->"+fares[i][1]+"/총:"+(acc_fare+fares[i][2]));
            step(fares[i][1], acc_fare+fares[i][2], false
                     , visited.slice(), new_fares.slice());
            if (carpool) {
                //현재: 4t_1t_5t_3f_2f -> 4t_1t_5t_3t -> 4t_1t_5t_6f
                //개선방향: 4t_1t_5t_3f -> 4t_1t_5t_3f_2f -> 4t_1t_5t_3t
                //이건못바꾸니까 데이터를 저장이라도 해놔야
                //dict에 해놓으면
                // console.log("[♥♥♥♥] "+now+"->"+fares[i][1]+"/총:"+(acc_fare+fares[i][2]/2));
                step(fares[i][1], acc_fare+fares[i][2]/2, true
                     , visited.slice(), new_fares.slice());
            }
        //} else if (fares[i][0] == now && visited[fares[i][1]-1]) {
            // console.log("[XXX] "+now+"->"+fares[i][1]);
        } else if (fares[i][1] == now && !visited[fares[i][0]-1]) {
            // console.log("[♡♡] "+now+"->"+fares[i][0]+"/총:"+(acc_fare+fares[i][2]));
            step(fares[i][0], acc_fare+fares[i][2], false
                 , visited.slice(), new_fares.slice());
            if (carpool) {
                // console.log("[♥♥♥♥] "+now+"->"+fares[i][0]+"/총:"+(acc_fare+fares[i][2]/2));
                step(fares[i][0], acc_fare+fares[i][2]/2, true
                     , visited.slice(), new_fares.slice());
            }
        //} else if (fares[i][1] == now && visited[fares[i][0]-1]) {
            // console.log("[XXX] "+now+"->"+fares[i][0]);
        }
    }
    stack.pop();
}