#트리까지 재귀로 만듦, visited 삭제, 왼오노드인덱스배열에추가

import sys
sys.setrecursionlimit(10**4)

def tree(i, top, nodeinfo_2):
    if nodeinfo_2[i][0] < nodeinfo_2[top][0]:
        if not nodeinfo_2[top][3] == -1:
            tree(i, nodeinfo_2[top][3], nodeinfo_2)
        else:
            nodeinfo_2[top][3] = i

    elif nodeinfo_2[top][0] < nodeinfo_2[i][0]:
        if not nodeinfo_2[top][4] == -1:
            tree(i, nodeinfo_2[top][4], nodeinfo_2)
        else:
            nodeinfo_2[top][4] = i


def order(i, answer, nodeinfo_2):
    answer[0].append(nodeinfo_2[i][2])
    if not nodeinfo_2[i][3] == -1:
        order(nodeinfo_2[i][3], answer, nodeinfo_2)
    if not nodeinfo_2[i][4] == -1:
        order(nodeinfo_2[i][4], answer, nodeinfo_2)
    answer[1].append(nodeinfo_2[i][2])


def solution(nodeinfo):
    answer = [[], []]
    nodeinfo_2 = []
    for i, node in enumerate(nodeinfo):
        x, y = node
        nodeinfo_2.append([x, y, i+1, -1, -1])
    nodeinfo_2 = sorted(nodeinfo_2, key=lambda x2: (-x2[1]))
    for i in range(1, len(nodeinfo_2)):
        tree(i, 0, nodeinfo_2)
    order(0, answer, nodeinfo_2)
    return answer
