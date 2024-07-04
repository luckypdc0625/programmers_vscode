def solution(X, Y):
    answer = ""
    xnum = [0] * 10
    ynum = [0] * 10
    for c in X:
        xnum[int(c)] += 1
    for c in Y:
        ynum[int(c)] += 1
    for i in range(9, -1, -1):
        n = min(xnum[i], ynum[i])
        answer += str(i) * n
    if answer == "":
        return "-1"
    if answer[0] == '0':
        return "0"
    return answer
