//b+y=by
//노랑가로+2 = 전체가로 = w
//노랑세로+2 = 전체세로 = by/w
//갈색개수 = w*2+((by)/w-2)*2 = b
//노랑개수 = (by)-갈색개수
//parseInt(2*w*w-(brown+4)*w+2*(brown+yellow))=0
function solution(brown, yellow) {
    var answer = [];
    var w = (brown+4+Math.sqrt(-16*yellow+brown*brown-8*brown+16))/4;
    //console.log(w);
    answer.push(w);
    answer.push((brown+yellow)/w);
    return answer;
}