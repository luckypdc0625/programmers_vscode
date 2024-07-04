//재귀로 왼쪽,오른쪽 탐색
//전역변수 활용
//마지막 level일 경우에만 전역변수 비교

//모든 탐색 하면 시간초과 뜸
//모든 탐색을 안하고 중간중간 끊으면 최댓값인지 어케 알지?;
//73824 73825 73875 73872 73175 73172 73142 73146
//78175 78172 78142 78146 78042 78046 78046 78045

max = 0;
visited = [];

function solution(triangle) {
    visited = new Array(triangle.length);
    for (let i=0; i<triangle.length; i++) {
        visited[i] = new Array(i+1);
        for (let j=0; j<i+1; j++) {
            visited[i][j] = -1;
        }
    }
    sum_(0, 0, 0, triangle);
    var answer = max;
    return answer;
}

function sum_(sum, i, level, triangle) {
    sum += triangle[level][i];
    // console.log("num="+triangle[level][i].toString()+"/sum="+sum.toString());
    var temp_i = 0;
    var temp_i_p_1 = 0;
    if(level+1 != triangle.length) {
        if ((visited[level+1][i]) == -1) {
            sum_(sum, i, level+1, triangle);
        }
        temp_i = triangle[level][i]+visited[level+1][i];
        var temp2 = sum+visited[level+1][i];
        // console.log("왼쪽최대결과:"+temp2.toString());
        if (max < temp2) {
            max = temp2;
        }
        if ((visited[level+1][i+1]) == -1) {
            sum_(sum, i+1, level+1, triangle);
        }
        temp_i_p_1 = triangle[level][i]+visited[level+1][i+1];
        var temp2 = sum+visited[level+1][i+1];
        // console.log("오른쪽최대결과:"+temp2.toString());
        if (max < temp2) {
            max = temp2;
        }
        visited[level][i] = Math.max(temp_i, temp_i_p_1);
    } else {
        // console.log("결과:"+sum.toString());
        visited[level][i] = triangle[level][i];
    }
}