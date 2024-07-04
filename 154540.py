from collections import deque

def solution(maps):
    def bfs(start_x, start_y):
        queue = deque([(start_x, start_y)])
        total_food = 0
        while queue:
            x, y = queue.popleft()
            if visited[x][y]:
                continue
            visited[x][y] = True
            total_food += int(maps[x][y])
            
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < len(maps) and 0 <= ny < len(maps[0]) and not visited[nx][ny] and maps[nx][ny] != 'X':
                    queue.append((nx, ny))
        
        return total_food

    if not maps:
        return [-1]
    
    visited = [[False] * len(maps[0]) for _ in range(len(maps))]
    result = []
    
    for i in range(len(maps)):
        for j in range(len(maps[0])):
            if maps[i][j] != 'X' and not visited[i][j]:
                days = bfs(i, j)
                result.append(days)
    
    if not result:
        return [-1]
    
    return sorted(result)