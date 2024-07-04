function solution(n, wires) {
    var answer = -1;
    var abs = -1;
    var visited = [];
    for (let i=0; i<wires.length; i++) {
        for (let i=0; i<wires.length; i++) {
            visited = [];
            visited.push(0);
        }
        var e = (wires.slice(i, i+1))[0];
        visited[i] = 1;
        var e1 = e[0];
        var e2 = e[1];
        var first = find_sum(e1, wires, visited)+1;
        //var second = find_sum(e2, wires, visited)+1;
        var abs_p = Math.abs(first-(n-first));
        // console.log("abs_p:"+abs_p.toString());
        if (abs == -1 || abs_p < abs) {
            abs = abs_p;
        }
    }
    return abs;
}
    
function find_sum(target, wires, visited) {
    // console.log("find_sum 진입")
    // console.log(target);
    var sum = 0;
    for (let j=0; j<wires.length; j++) {
        if(visited[j] == 1){
            continue;
        }
        // console.log(target)
        // console.log("인 target에서 보는중인것")
        // console.log(wires[j])
        if (wires[j][0] == target) {
            // console.log("왼쪽이 같음")
            var e = (wires.slice(j, j+1))[0];
            visited[j] = 1;
            sum += find_sum(e[1], wires, visited)+1;
        } else if (wires[j][1] == target) {
            // console.log("오른쪽이 같음")
            var e = (wires.slice(j, j+1))[0];
            visited[j] = 1;
            sum += find_sum(e[0], wires, visited)+1;
        }
    }
    // console.log(target)
    // console.log("의 sum은 ")
    // console.log(sum.toString())
    return sum
}