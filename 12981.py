import math

def solution(n, words):
    count_fail = len(words)
    count_duplicate = len(words)
    count = len(words)
    duplication = []
    for first_loop in range(len(words)):
        if (first_loop != len(words)-1) and (words[first_loop][-1] != words[first_loop+1][0]):
            count_fail = first_loop+1
            print("count_fail")
            print(count_fail)
            break
        for second_loop in range(len(words)-first_loop-1):
            second_loop += first_loop+1
            if (words[first_loop] == words[second_loop]):
                if (count_duplicate) == len(words) or (count_duplicate > second_loop):
                    count_duplicate = second_loop
                    print("count_duplicate")
                    print(count_duplicate)
    count = count_fail if count_fail < count_duplicate else count_duplicate
    print("count")
    print(count)
    who = (count % n) + 1 if count != len(words) else 0
    print("who")
    print(who)
    count = math.floor(float(count) / float(n))+1 if count != len(words) else 0
    #answer = "[" + str(who) + "," + str(count+1) + "]"
    answer = [who, count]

    # [실행] 버튼을 누르면 출력 값을 볼 수 있습니다.
    print('Hello Python')

    return answer