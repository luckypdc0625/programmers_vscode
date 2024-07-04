def solution(a, b, g, s, w, t):
    answer = parametric_search(a,b,g,s,w,t)
    return answer

def parametric_search(a, b, g, s, w, t):
    left, right = 0, 400000000000000
    result = right
    while left <= right:
        mid = (left + right) // 2
        # print("left:" + str(left) + " / right:" + str(right) + " / mid:" + str(mid))
        g2 = g.copy()
        s2 = s.copy()
        if is_possible(mid, a, b, g2, s2, w, t):
            # print("pos")
            result = mid
            right = mid - 1
            # print("result:" + str(result))
        else:
            # print("impos")
            left = mid + 1
    return result

def is_possible(mid, a, b, g, s, w, t):
    a_sto = 0
    b_sto = 0
    can_both_l = []
    g_l = []
    s_l = []
    for i in range(len(t)):
        # mid시간에서 t[i]를 한번 뺌(한번 이동 저장). 그 후 t[i]*2로 나눔(왕복 횟수. 소숫점 이하는 왕복실패라 버림.)
        # 최종 운반 횟수.
        move = max(0,(mid-t[i])//(t[i]*2)+1)
        #예) 0:6 1:46 2:36 3:62 4:8 5:31 6:0 7:15
        #품절도시는 경우의 수가 없고 고정
        #만약 a 완료에 b만 남았는데 풀무브도시에 s가 남은 채로 move가 끝나버림.
        #해당 도시의 g 대신 s를 옮겨도, 이번엔 a가 모자라지는데 다른 풀무브도시에서 g 대신 s를 옮겨도 이번엔 b가 모자라짐
        #즉 그건 그자체로 실패한 mid
        #하지만 풀무브도시가 아니고 품절도시도 아닌 도시가 남아있다면?
        #억까도시는 a나 b가 0이라서 g와 s를 털지 못한 도시.
        #억까도시에서 대신 털어주고 풀무브도시에서 다른걸 털면 더 차감할 수 있다.
        can_both = w[i]*move
        g_amount = min(g[i], can_both)
        a_sto += g_amount
        g[i] -= g_amount
        can_both -= g_amount
        s_amount = min(s[i], can_both)
        b_sto += s_amount
        s[i] -= s_amount
        can_both -= s_amount
        can_both_l.append(can_both)
        g_l.append(g_amount)
        s_l.append(s_amount)
        
        # print("move:"+str(move)+" / can_both:"+str(can_both)+" / g_amount:"+str(g_amount)+" / s_amount:"+str(s_amount))
        
    if a_sto >= a and b_sto >= b:
        # print("둘다큼")
        return True
    elif a_sto < a:
        # print("a 미달")
        return False
    elif a_sto >= a and b_sto < b:
        # print("a는 큰데 b가 미달 >> 여기서부터 중요")
        for i in range(len(t)):
            # print("a_sto:"+str(a_sto)+" / b_sto:"+str(b_sto))
            gogo = min((b-b_sto), g_l[i], s[i])
            a_sto -= gogo
            b_sto += gogo
            if a_sto<a:
                return False
            if b_sto>=b:
                return True
        return False

        