//[재귀함수:quad]
//1)모든게 0이면 sum_0++ / 모든게 1이면 sum_1++
//2)아니면 네개로 쪼개고 재귀함수

sum_0 = 0;
sum_1 = 0;

function solution(arr) {
    var answer = [];
    var len = arr.length;
    quad(0, 0, len, arr);
    answer = [sum_0, sum_1];
    return answer;
}

function quad(i, j, len, arr) {
    // console.log("i:"+i.toString()+"/j:"+j.toString()+"/len:"+len.toString());
    if (len==1) {
        if (arr[i][j] == 0) {
            sum_0++;
            // console.log("하나가0");
        } else{
            sum_1++;
            // console.log("하나가1");
        }
    } else {
        var check = -1;
        for (let k1=i; k1<i+len; k1++) {
            for (let k2=j; k2<j+len; k2++) {
                //맨첫번째 값은 저장
                if (k1 == i && k2 == j) {
                    check = arr[k1][k2];
                } else {
                    //맨첫번째 값과 비교
                    if (arr[k1][k2] != check) {
                        check = -1;
                        break;
                    }
                }
            }
        }
        if (check == 0) {
            sum_0++;
            // console.log("전체가0");
        } else if (check === 1) {
            sum_1++;
            // console.log("전체가1");
        } else if (check == -1) {
            quad(i, j, parseInt(len/2), arr);
            quad(parseInt((i+(i+len))/2), j, parseInt(len/2), arr);
            quad(i, parseInt((j+(j+len))/2), parseInt(len/2), arr);
            quad(parseInt((i+(i+len))/2), parseInt((j+(j+len))/2), parseInt(len/2), arr);
        }
    }
}