from collections import deque

def solution(n, edge):
    visited = [False] * n
    edge_length = [0] * n
    edgeRevised = edge.copy()
    edge_have = [[] for _ in range(n)]
    for i in range(len(edgeRevised)):
        x = int(edgeRevised[i][0])
        y = int(edgeRevised[i][1])
        edge_have[x - 1].append([x,y])
        edge_have[y - 1].append([y,x])
    queue = deque(edge_have[0])
    from_what = -1
    to_what = -1
    max_length = 0
    visited[0] = True
    answer = 0

    #print("first queue")
    #print(queue)
    #print("first edgeRevised")
    #print(edgeRevised)
    while queue:
        x, y = queue.popleft()
        #print("now x y")
        #print(x)
        #print(y)
        if visited[int(x) - 1] == True:
            if visited[int(y) - 1] == False:
                to_what = y
                from_what = x
            else:
                continue
        elif visited[int(y) - 1] == True:
            to_what = x
            from_what = y
        visited[to_what - 1] = True
        edge_length[to_what - 1] += edge_length[from_what - 1] + 1
        answer += 1
        if edge_length[to_what - 1] > max_length:
            max_length = edge_length[to_what - 1]
            answer = 1

        for edge_have_each in edge_have[to_what - 1]:
            if not visited[edge_have_each[1]-1]:
                queue.append(edge_have_each)

        #print("now edgeRevised")
        #print(edgeRevised)
        #print("now queue")
        #print(queue)
    #print(edge_length)
    return answer