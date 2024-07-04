def solution(x):
    x_str = str(x)
    x_sum = sum(int(i) for i in x_str)
    if int(x) % int(x_sum) == 0:
        answer = True
    else:
        answer = False
    return answer