//답은 최소작업횟수
//일단 수가 엄청 크니까 매개변수탐색으로
//최초 로직은 모든 수를 더하는 것(큐1, 큐2)
//동시 가능 채널이 두개라 헷갈림(큐1->큐2 / 큐2->큐1) -> 일단 채널 하나로 밀고나가기
//일단 큐 합이 중간값보다 작은 큐에 몰아줌
//중간값보다 커지면 이번엔 작아진 반대쪽 큐에 몰아줌
//끝나는조건1-1)계속 반대쪽 큐 맨뒤에 붙다보니, 큐의 순서대로 똑같이 반대쪽 큐에 붙음
//1-2)그래서 결국 큐가 같은 형태로 뒤바뀌는 순간이 끝나는 조건임
//1-3)두 큐의 길이의 합
//근데 완전히 안나뉘고 [A[5:10] B[0:10] A[0:1]] [A[1:5]] 이런 식일때도 끝나는 조건이 똑같나?
//그럼 뒤바뀌었다가 원위치까지 총 4번?

//264373657687833이랑 335362728957393323을 빼는거랑

//가능성 1) 합계산
//가능성 2) 규칙을 찾아서 경우의 수 줄이기

// save_count = 0;
// save_queue1 = []
// save_queue2 = []
// save_queue1_sum = 0;
// save_on = false;

save_l = [];

function solution(queue1, queue2) {
    var answer = -2;
    answer = parametric_search(queue1, queue2);
    //answer = gogo(queue1, queue2);
    return answer;
}

function parametric_search(queue1, queue2) {
    //안바꿔도 끝나면
    var left = 0;
    //큐가 서로 완전히 뒤바뀌면
    var right = queue1.length*4;
    //불가하면 -1
    var result = -1;
    var queue1_sum = 0;
    var queue2_sum = 0;
    var queue_mid = 0;
    for (let i=0; i<queue1.length; i++) {
        queue1_sum+=queue1[i];
    }
    //var queue1_sum = queue1.reduce((a, b) => (a+b));
    for (let i=0; i<queue2.length; i++) {
        queue2_sum+=queue2[i];
    }
    //var queue2_sum = queue2.reduce((a, b) => (a+b));
    if((queue1_sum+queue2_sum)%2==1) {
        return -1;
    }
    queue_mid = parseInt((queue1_sum+queue2_sum)/2)
    if (queue_mid == queue1_sum) {
        return 0;
    }
    while (left <= right) {
        var queue1_= queue1.slice();
        var queue2_ = queue2.slice();
        var mid = parseInt((left + right)/2);
        // console.log("mid:"+mid.toString())
        if (is_possible(mid, queue1_, queue2_, queue_mid, queue1_sum, left)) {
            right = mid-1;
            result = mid;
            // console.log("성공")
        } else {
            left = mid+1;
            // console.log("실패")
        }
    }
    return result;
}


function is_possible(mid, queue1, queue2, queue_mid, queue1_sum, left) {
    var queue1_where = 0;
    var queue1_length = queue1.length;
    var queue2_where = 0;
    var queue2_length = queue2.length;
    //var queue2_sum = 0;
    
    //작업 횟수
    var count = 0;
    // if (save_on) {
    //     count = save_count;
    //     queue1 = save_queue1;
    //     queue2 = save_queue2;
    //     queue1_sum = save_queue1_sum;
    //     }
    var delete_l = [];
    // console.log(save_l)
    for (let i=0; i<save_l.length; i++) {
        if ( mid-save_l[i][0] >=0 && save_l[i][0]>=count) {
            count = save_l[i][0];
            queue1_where = save_l[i][1];
            queue1_length = save_l[i][2];
            queue2_where = save_l[i][3];
            queue2_length = save_l[i][4];
            queue1_sum = save_l[i][5];
        }
        if (mid < save_l[i][0] && save_l[i][0] < left) {
            delete_l.push(i);
        }
    }
    for (let i=0; i<delete_l.length; i++) {
        save_l.splice(delete_l[i], 1);
    }
    while (queue1_sum != queue_mid) {
        // console.log(queue1);
        // console.log(queue2);
        
        count++;
        // console.log("count:"+count.toString())
        // if(count>mid) {
        //     if (!save_on) {
        //         save_on = true;
        //     }
        //     save_count = count-1;
        //     save_queue1 = queue1.slice();
        //     save_queue2 = queue2.slice();
        //     save_queue1_sum = queue1_sum
        //     // console.log("false");
        //     return false;
        // }
        
        if(count>mid) {
            var temp = [];
            temp.push(count-1);
            temp.push(queue1_where);
            temp.push(queue1_length);
            temp.push(queue2_where);
            temp.push(queue2_length);
            temp.push(queue1_sum);
            save_l.push(temp);
            // console.log("false");
            return false;
        }
        
        if (queue1_sum > queue_mid) {
            if (queue1_where < queue1.length) {
                queue1_sum -= queue1[queue1_where];
            } else {
                queue1_sum -= queue2[queue1_where-queue1.length];
            }
            queue1_length--;
            queue2_length++;
            queue1_where++;
            if (queue1_where==queue1.length*2) {
                queue1_where = 0;
            }
            //queue2_sum+=temp;
        } else {
            if (queue2_where < queue2.length) {
                queue1_sum += queue2[queue2_where];
            } else {
                queue1_sum += queue1[queue2_where-queue2.length];
            }
            queue1_length++;
            queue2_length--;
            queue2_where++;
            if (queue2_where==queue2.length*2) {
                queue2_where = 0;
            }
            //queue2_sum-=temp;

        }
        // if(count==parseInt((left+mid-1)/2)) {
        //     if (!save_on) {
        //         save_on = true;
        //     }
        //     save_count = count;
        //     save_queue1 = queue1.slice();
        //     save_queue2 = queue2.slice();
        //     save_queue1_sum = queue1_sum
        // }
        
        if(count==parseInt((left+mid-1)/2)) {
            var temp = [];
            temp.push(count);
            temp.push(queue1_where);
            temp.push(queue1_length);
            temp.push(queue2_where);
            temp.push(queue2_length);
            temp.push(queue1_sum);
            save_l.push(temp);
        }

    }
    // console.log("true")
    return true;
}


// function is_possible(mid, queue1, queue2, queue_mid, queue1_sum, left) {
//     //var queue1_sum = 0;
//     //var queue2_sum = 0;
    
//     //작업 횟수
//     var count = 0;
//     // if (save_on) {
//     //     count = save_count;
//     //     queue1 = save_queue1;
//     //     queue2 = save_queue2;
//     //     queue1_sum = save_queue1_sum;
//     //     }
//     var delete_l = [];
//     // console.log(save_l)
//     for (let i=0; i<save_l.length; i++) {
//         if ( mid-save_l[i][0] >=0 && save_l[i][0]>=count) {
//             count = save_l[i][0];
//             queue1 = (save_l[i][1]).slice();
//             queue2 = (save_l[i][2]).slice();
//             queue1_sum = save_l[i][3];
//         }
//         if (mid < save_l[i][0] && save_l[i][0] < left) {
//             delete_l.push(i);
//         }
//     }
//     for (let i=0; i<delete_l.length; i++) {
//         save_l.splice(delete_l[i], 1);
//     }
//     while (queue1_sum != queue_mid) {
//         // console.log(queue1);
//         // console.log(queue2);
        
//         count++;
//         // console.log("count:"+count.toString())
//         // if(count>mid) {
//         //     if (!save_on) {
//         //         save_on = true;
//         //     }
//         //     save_count = count-1;
//         //     save_queue1 = queue1.slice();
//         //     save_queue2 = queue2.slice();
//         //     save_queue1_sum = queue1_sum
//         //     // console.log("false");
//         //     return false;
//         // }
        
//         if(count>mid) {
//             var temp = [];
//             temp.push(count-1);
//             temp.push(queue1.slice());
//             temp.push(queue2.slice());
//             temp.push(queue1_sum);
//             save_l.push(temp);
//             // console.log("false");
//             return false;
//         }
        
//         if (queue1_sum > queue_mid) {
//             var temp = queue1.splice(0, 1)[0];
//             queue2.push(temp);
//             queue1_sum-=temp;
//             //queue2_sum+=temp;
//         } else {
//             var temp = queue2.splice(0, 1)[0];
//             queue1.push(temp);
//             //queue2_sum-=temp;
//             queue1_sum+=temp;
//         }
//         // if(count==parseInt((left+mid-1)/2)) {
//         //     if (!save_on) {
//         //         save_on = true;
//         //     }
//         //     save_count = count;
//         //     save_queue1 = queue1.slice();
//         //     save_queue2 = queue2.slice();
//         //     save_queue1_sum = queue1_sum
//         // }
        
//         if(count==parseInt((left+mid-1)/2)) {
//             var temp = [];
//             temp.push(count);
//             temp.push(queue1.slice());
//             temp.push(queue2.slice());
//             temp.push(queue1_sum);
//             save_l.push(temp);
//         }

//     }
//     // console.log("true")
//     return true;
// }

function gogo(queue1, queue2) {
    var count = 0;
    var queue1_sum = 0;
    var queue2_sum = 0;
    var queue_mid = 0;
    for (let i=0; i<queue1.length; i++) {
        queue1_sum+=queue1[i];
    }
    for (let i=0; i<queue2.length; i++) {
        queue2_sum+=queue2[i];
    }
    // if((queue1_sum+queue2_sum)%2==1) {
    //     return -1;
    // }
    queue_mid = parseInt((queue1_sum+queue2_sum)/2)
    if (queue_mid == queue1_sum) {
        return 0;
    }
    while (queue1_sum != queue_mid) {
        // console.log(queue1);
        // console.log(queue2);
        
        count++;
        
        if (count>queue1.length*4) {
            return -1;
        }
        
        if (queue1_sum > queue_mid) {
            var temp = queue1.splice(0, 1)[0];
            queue2.push(temp);
            queue1_sum-=temp;
            //queue2_sum+=temp;
        } else {
            var temp = queue2.splice(0, 1)[0];
            queue1.push(temp);
            //queue2_sum-=temp;
            queue1_sum+=temp;
        }
        
    }
    return count;
}