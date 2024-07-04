def solution(left, right):
    sum_all = 0
    for i in range(left, right+1):
        sum_odd = False
        for j in range(1, i+1):
            if i%j == 0:
                if sum_odd == False:
                    sum_odd = True
                else:
                    sum_odd = False
        if sum_odd:
            sum_all -= i
        else:
            sum_all += i
    answer = sum_all
    return answer