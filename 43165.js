answer = 0;

function solution(numbers, target) {
    check(0, 0, 1, numbers, target);
    check(0, 1, 1, numbers, target);
    return answer;
}

function check(sum, sign, level, numbers, target) {
    if (sign == 0) {
        sum -= numbers[level-1];
    } else {
        sum += numbers[level-1];
    }
    if (level == numbers.length && target == sum) {
        console.log("굿");
        answer += 1;
        //console.log(answer)
        return;
    } else if(level == numbers.length) {
        return;
    } else{
        var a = check(sum, 0, level+1, numbers, target);
        var b = check(sum, 1, level+1, numbers, target);
        return;
    }

}