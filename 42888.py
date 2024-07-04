def solution(record):
    id_nickname = {}
    for count in range(len(record)):
        record_command = record[count].split(" ")[0]
        record_id = record[count].split(" ")[1]
        if len(record[count].split(" ")) != 2:
            record_nickname = record[count].split(" ")[2]
        if record_command == "Enter":
            id_nickname[record_id] = record_nickname
        elif record_command == "Change":
            id_nickname[record_id] = record_nickname
    
    answer = []
    
    
    for count in range(len(record)):
        record_command = record[count].split(" ")[0]
        record_id = record[count].split(" ")[1]
        if record_command == "Enter":
            answer.append(id_nickname[record_id]+"님이 들어왔습니다.")
        elif record_command == "Leave":
            answer.append(id_nickname[record_id]+"님이 나갔습니다.")

    
    return answer