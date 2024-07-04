//board는 3x3~100x100
//G가 벽에 붙어있지 않으면서 D에 붙어있지 않으면 -1
//visited를 만들고 queue를 만든다
//빼먹은 조건?
//일단 제일 먼저 찾은 애가 return하는건 무조건 맞음
//

//stack이 아니라 queue임
function solution(board) {
    var answer = -1;
    var stack = [];
    var step = [];
    var visited = new Array(board.length);
    for (let i=0; i<visited.length; i++) {
        visited[i] = new Array(board[i].length);
        for (let j=0; j<visited[i].length; j++) {
            //G에 멈출 수 없을 경우 -1 리턴
            //G 사방이 전부 벽 혹은 "D"인 경우
            if (board[i][j] == 'G') {
                if ((i==0 || (i!=0 && board[i-1][j] == "D"))
                    && (i==board.length-1 || (i!=board.length-1 && board[i+1][j] == "D"))
                    && (j==0||(j!=0 && board[i][j-1] == "D"))
                    && (j==board[0].length-1||(j!=board[0].length-1
                                               && board[i][j+1] == "D"))) {
                    return -1;
                }
            }
            visited[i][j] = false;
            if (board[i][j] == 'R') {
                visited[i][j] = true;
                stack.push([i, j]);
                step.push(0);
            }
            if (board[i][j] == 'D') {
                visited[i][j] = true;
            }
        }
    }
    //for문에서 stack.pop() 후엔 바뀌지 않는 고정 now_R
    var now_R = [-1, -1];
    
    //for문에서 stack.pop() 한 후에도 계속 D나 벽까지 이동하는 y_x
    var y_x = [-1, -1];
    
    //상하좌우 순
    var dy_dx = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    //현재까지 걸은 수
    var now_step = -1;
    var now_step_p_1 = -1;
    
    while (stack.length>0) {
        //now_R = stack.pop();
        now_R = stack.splice(0,1)[0];
        //now_step = step.pop();
        now_step = step.splice(0,1)[0];
        // console.log("맨밖 while 시작 : now_R");
        // console.log(now_R);
        // console.log("now_step="+now_step.toString());
        for (let i=0; i<dy_dx.length; i++) {
            //한 칸 이동
            var y_x = [now_R[0]+dy_dx[i][0], now_R[1]+dy_dx[i][1]];
            now_step_p_1 = now_step+1;
            //이동 후 만약 벽을 넘었으면 건너뛰기. 여긴 반례 없음
            if (y_x[0] < 0 || y_x[0] == board.length
                || y_x[1] < 0 || y_x[1] == board[0].length) {
                //console.log("최초 한칸으로 벽 넘음. 패스");
                continue;
            }
            // console.log("최초 한칸 후 y_x : ")
            // console.log(y_x);
            //이동 후 벽 안에 있거나 "D"가 아니라면 한 칸 더 이동
            while (y_x[0] >= 0 && y_x[0] < board.length
                   && y_x[1] >= 0 && y_x[1] < board[0].length
                   && board[y_x[0]][y_x[1]] != "D") {
                y_x = [y_x[0]+dy_dx[i][0], y_x[1]+dy_dx[i][1]];
                // console.log("y_x 미끄러지는중");
                // console.log(y_x)
            }
            //벽 밖으로 넘어갔거나 "D"일 때 한 칸만 취소
            y_x = [y_x[0]-dy_dx[i][0], y_x[1]-dy_dx[i][1]];
            // console.log("y_x 한 칸만 취소");
            if (board[y_x[0]][y_x[1]] == "G") {
                // if (answer == 0 || answer > now_step_p_1) {
                //     answer = now_step_p_1;
                // }
                return now_step_p_1;
            }
            if (visited[y_x[0]][y_x[1]] == true) {
                // console.log("이미 방문");
                continue;
            } else {
                stack.push(y_x);
                step.push(now_step_p_1);
                visited[y_x[0]][y_x[1]] = true;
                // console.log("첫 방문")
                // console.log("y_x:");
                // console.log(y_x);
                // console.log("stack:");
                // console.log(stack);
            }
            
        }
    }
    // console.log("끝");
    return answer;
}