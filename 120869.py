def solution(spell, dic):
    spell_string = ''.join(sorted(spell))
    answer = 2
    for i, x in enumerate(dic):
        if len(x) != len(spell_string):
            continue
        if ''.join(sorted(x)) == spell_string:
            answer = 1
            break
    return answer