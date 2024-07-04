//합승을 그만두는 지점을 가정한다
//그 지점으로부터 출발점까지 + 그 지점으로부터 A까지 + 그 지점으로부터 B까지의 요금
//세 요금을 각각 최소로 구해놓고 그 합도 최소로 구하면 됨
//합승을 그만두는 지점도 0번노드부터 n-1노드까지 싹다 구해야됨
//여기서 다익스트라 쓰는거


function solution(n, s, a, b, fares) {
    var answer = Infinity;
    
    let fares_adj = Array.from({length:n}, ()=>[]);

    for (let [from, to, cost] of fares) {
        from -= 1; to -= 1;
        fares_adj[from].push([to, cost]);
        fares_adj[to].push([from, cost]);
    }

    var dist_s = dijkstra(n, fares_adj, s-1);
    var dist_a = dijkstra(n, fares_adj, a-1);
    var dist_b = dijkstra(n, fares_adj, b-1);
    
    for (let i=0; i<n; i++) {
        let temp = dist_s[i] + dist_a[i] + dist_b[i];
        answer = Math.min(answer, temp);
    }
    return answer;
}

function dijkstra(n, fares_adj, start) {
    var dist = Array(n).fill(Infinity);
    var visited = Array(n).fill(false);
    dist[start] = 0;
    
    for (let _=0; _<n; _++) {
        var shortest = -1;
        for (let i=0; i<n; i++) {
            if (!visited[i] && (shortest === -1 || dist[i] < dist[shortest])) {
                shortest = i;
            }
        }
        if (dist[shortest] === Infinity) break;
        visited[shortest] = true;
        
        for (var [neighbor, weight] of fares_adj[shortest]) {
            if(dist[shortest] + weight < dist[neighbor]) {
                dist[neighbor] = dist[shortest] + weight;
            }
        }
    }
    
    return dist;
}