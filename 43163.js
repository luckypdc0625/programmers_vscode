//큐 사용해서 최소단계 구하기
//visited 사용해서 중복 패스
function solution(begin, target, words) {
    var answer = 0;
    var visited = new Array(words.length).fill(false);
    var queue = [];
    var step = [];
    queue.push(begin);
    step.push(0);
    while (queue.length > 0) {
        //console.log("queue :");
        //console.log(queue);
        var now = queue.splice(0,1)[0];
        var now_step = step.splice(0,1)[0];
        
        //console.log("now : "+now);
        //console.log("now_step : "+now_step.toString());
        for (let i=0; i<words.length; i++) {
            var count = 0;
            for (let j=0; j<now.length; j++) {
                if (now[j] != words[i][j]) {
                    count++;
                    if(count > 1) {
                        break;
                    }
                }
            }
            if (count == 1 && visited[i] == false) {
                if (words[i] == target) {
                    return now_step+1;
                }
                queue.push(words[i]);
                step.push(now_step+1);
                visited[i] = true;
            }
        }
    }

    return answer;
}