//1+2+3+....1000
//O(1001*500*2)=O(1001000)
//4일땐10 5일땐13 3*n-2

function solution(n) {
    var a = new Array(n);
    for (let i=0; i<n; i++) {
        a[i] = new Array(i+1);
    }
    var answer = [];
    var num = 1;
    var set = 0;
    var count = 0;
    //n부터 시작
    for (let i=n; i>0; i--) {
        if (count%3==0) {
            // console.log("count%3==0")
            for (let j=0; j<n-count; j++) {
                a[(parseInt(count/3)*2)+j][parseInt(count/3)] = num;
                // console.log("["+(parseInt(count/3)*2+j).toString()+"]["+(parseInt(count/3)).toString()+"]");
                num++;
            }
            count++;
        } else if (count%3==1) {
            // console.log("count%3==1")
            for (let j=0; j<n-count; j++) {
                a[n-1-(parseInt(count/3))][(parseInt(count/3))+j+1] = num;
                // console.log("["+(n-1-parseInt(count/3)).toString()+"]["+((parseInt(count/3))+j+1).toString()+"]");
                num++;
            }
            count++;
        } else {
            // console.log("count%3==2")
            for (let j=0; j<n-count; j++) {
                a[n-1-j-1-parseInt(count/3)][n-2-j-parseInt(count/3)*2] = num;
                // console.log("["+(n-1-j-1-parseInt(count/3)).toString()+"]["+(n-2-j-parseInt(count/3)*2).toString()+"]");
                num++;
            }
            count++;
        }
    }
    for (let i=0; i<n; i++) {
        for (let j=0; j<i+1; j++) {
            answer.push(a[i][j])
        }
        // console.log(a[i]);
    }
    return answer;
    
}