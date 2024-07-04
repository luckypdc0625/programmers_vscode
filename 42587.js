function solution(priorities, location) {
    var answer = 0;
    var queue = [];
    var priorities_each = [0,0,0,0,0,0,0,0,0];
    for (let i=0; i<priorities.length; i++) {
        //-1을 해야 인덱스에 맞음
        priorities_each[priorities[i]-1] += 1;
        queue.push([i, priorities[i]]);
    }
    var rank = 0
    // var count = 0
    // while (count<100 && queue.length!=0) {
    while (queue.length!=0) {
        // count += 1
        
        var max_p = 0
        // console.log("priorities_each 출력")
        // console.log(priorities_each)
        for (let i=priorities_each.length-1; i>=0; i--) {
            if (priorities_each[i] != 0) {
                max_p = i+1;
                break
            }
        }
        target = queue.splice(0,1)[0];
        // console.log("max_p=".concat(max_p.toString()))
        // console.log("target 출력")
        // console.log(target)
        // console.log("queue 출력")
        // console.log(queue)
        if (target[1] != max_p) {
            // console.log("결과 : 후순위로 밀림")
            queue.push(target);
        } else {
            // console.log("결과 : 종료")
            priorities_each[max_p-1] -= 1;
            rank = rank + 1;
            // console.log("rank=" + rank.toString())
            if (target[0] == location) {
                answer = rank;
                break;
            }
        }
    }
    return answer;
}