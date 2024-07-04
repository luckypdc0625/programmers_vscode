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

a = -1;
b = -1;
a_b_min = Number.MAX_SAFE_INTEGER;
a_global = -1;
b_global = -1;
stack = [];
memo = {};
answer = Number.MAX_SAFE_INTEGER;

function solution(n, s, a, b, fares) {
    var visited = new Array(n).fill(false);
    a_global = a;
    b_global = b;
    step(s, 0, true, false, false, visited, fares);
    return answer;
}

function step(now, acc_fare, carpool, a_done, b_done, visited, fares) {
    var a = 'x';
    if(carpool) {
        a = 't';
    }else {
        a = 'f';
    }
    stack.push(now.toString()+a);
    // console.log(stack);
    visited[now-1] = true;
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
        a = acc_fare;
        //이 합승에 기록이 처음이면
        if(!Object.keys(memo).includes(key_a)) {
            memo[key_a] = a;
        //처음 아닌데 최소값 아니면
        } else if(memo[key_a]>a){
            memo[key_a] = a;
        }
        a_done = true;
        // console.log("★★★★★a비용:"+a);
    }
    if (now == b_global) {
        b = acc_fare;
        //이 합승에 기록이 처음이면
        if(!Object.keys(memo).includes(key_b)) {
            memo[key_b] = b;
        //처음 아닌데 최소값 아니면
        } else if(memo[key_b]>b){
            memo[key_b] = b;
        }
        b_done = true;
        // console.log("●●●●●b비용:"+b);
    }
    // console.log(memo);
    if (Object.keys(memo).includes(key_a)&&Object.keys(memo).includes(key_b)) {
        if (memo[key_a] < acc_fare && memo[key_b] < acc_fare) {
            stack.pop();
            return;
        }
        var temp = 0;
        temp+=Number(memo[key_a]);
        temp+=Number(memo[key_b]);
        // console.log("temp:"+temp);
        if (answer > temp) {
            answer = temp;
        }
        // console.log("------그래서-----answer:"+answer);
    }
    // if (a_done && b_done) {
    //     console.log("a,b 둘다 끝이라 종료");
    //     stack.pop();
    //     // if (a_b_min>a+b) {
    //     //     a_b_min = a+b;
    //     //     console.log("----------------a_b_min 갱신");
    //     //     console.log("a_b_min : " + a_b_min);
    //     // }
    //     var key = "";
    //     for (let i=0; i<stack.length; i++) {
    //         if(stack[i].includes("true")) {
    //             key+=stack[i];
    //         } else{
    //             break;
    //         }
    //     }
    //     var temp = 0;
    //     key+="a";
    //     temp+=Number(memo[key]);
    //     key+="b";
    //     temp+=Number(memo[key]);
    //     if (answer > temp) {
    //         answer = temp;
    //     }
    //     return;
    // }
    for (let i=0; i<fares.length; i++) {
        if (fares[i][0] == now && !visited[fares[i][1]-1]) {
            if (carpool) {
                //현재: 4t_1t_5t_3f_2f -> 4t_1t_5t_3t -> 4t_1t_5t_6f
                //개선방향: 4t_1t_5t_3f -> 4t_1t_5t_3f_2f -> 4t_1t_5t_3t
                //이건못바꾸니까 데이터를 저장이라도 해놔야
                //dict에 해놓으면
                // console.log("[♡♡] "+now+"->"+fares[i][1]+"/총:"+(acc_fare+fares[i][2]));
                step(fares[i][1], acc_fare+fares[i][2], false, a_done, b_done
                     , visited.slice(), fares);
                a=0;
                b=0;
                // console.log("[♥♥♥♥] "+now+"->"+fares[i][1]+"/총:"+(acc_fare+fares[i][2]/2));
                step(fares[i][1], acc_fare+fares[i][2]/2, true, a_done, b_done
                     , visited.slice(), fares);
                a=0;
                b=0;
            } else {
                // console.log("[♡♡] "+now+"->"+fares[i][1]+"/총:"+(acc_fare+fares[i][2]));
                step(fares[i][1], acc_fare+fares[i][2], false, a_done, b_done
                     , visited.slice(), fares);
                a=0;
                b=0;
            }
        } else if (fares[i][0] == now && visited[fares[i][1]-1]) {
            // console.log("[XXX] "+now+"->"+fares[i][1]);
        } else if (fares[i][1] == now && !visited[fares[i][0]-1]) {
            if (carpool) {
                // console.log("[♡♡] "+now+"->"+fares[i][0]+"/총:"+(acc_fare+fares[i][2]));
                step(fares[i][0], acc_fare+fares[i][2], false, a_done, b_done
                 , visited.slice(), fares);
                a=0;
                b=0;
                // console.log("[♥♥♥♥] "+now+"->"+fares[i][0]+"/총:"+(acc_fare+fares[i][2]/2));
                step(fares[i][0], acc_fare+fares[i][2]/2, true, a_done, b_done
                     , visited.slice(), fares);
                a=0;
                b=0;
            } else {
                // console.log("[♡♡] "+now+"->"+fares[i][0]+"/총:"+(acc_fare+fares[i][2]));
                step(fares[i][0], acc_fare+fares[i][2], false, a_done, b_done
                 , visited.slice(), fares);
                a=0;
                b=0;
            }
        } else if (fares[i][1] == now && visited[fares[i][0]-1]) {
            // console.log("[XXX] "+now+"->"+fares[i][0]);
        }
    }
    stack.pop();
}