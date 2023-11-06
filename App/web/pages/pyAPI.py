from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_mysqldb import MySQL
import openai
import json
import urllib.request
import urllib.parse

app = Flask(__name__)
CORS(app)
app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'student'
app.config['MYSQL_DB'] = 'learning_platform_database'

mysql = MySQL(app)

# openai生成課文、題目
@app.route('/process_input', methods=['GET'])
def process_input():
    #js那邊的text area有東西的話，進入以下動作
    text = request.args.get('text')
    if text:
        # openai.api_key = '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'

        # response = openai.Completion.create(
        #     model="text-davinci-003",
        #     prompt=text,
        #     max_tokens=2048,
        #     temperature=0.5,
        # )

        # completed_text = response["choices"][0]["text"]
        completed_text = text
        #假設這是剛生成出來的課文&題目，有generate_chapter和generate_question兩個部分
        generated_data = {
    "generate_chapter": {
        "user_id": 1,
        "course_id": 2,
        "chap_name": "The Value of Time",
        "content": "Time is our most valuable resource. It is a finite asset, and once it's gone, we can never get it back. Every moment we waste is a moment we can't use to achieve our goals. Effective time management is the key to success and happiness. By setting priorities and avoiding procrastination, we can make the most of our time."
    },
    "generate_question": [
        {
            "generate_id": 0,
            "chap_question_number": 1,
            "type": "reading",
            "question_describe": "Why is time considered our most valuable resource?",
            "option1": "Because it's free.",
            "option2": "Because it's finite and irreplaceable.",
            "option3": "Because it's always available.",
            "option4": "Because it's unimportant.",
            "answer": "Because it's finite and irreplaceable.",
            "mp3_file": "abcde",
            "image": "image1",
            "question_level": "A2",
            "question_public": 0
        },
        {
            "generate_id": 0,
            "chap_question_number": 2,
            "type": "reading",
            "question_describe": "How can effective time management lead to success?",
            "option1": "By wasting time.",
            "option2": "By avoiding priorities.",
            "option3": "By setting goals and priorities.",
            "option4": "By procrastinating.",
            "answer": "By setting goals and priorities.",
            "mp3_file": "fghij",
            "image": "image2",
            "question_level": "A2",
            "question_public": 0
        }
    ]
}



        json_data = json.dumps(generated_data).encode('utf-8')

        # php的位置
        php_api_url = "http://localhost/insert_generate_chapter.php"
        
        # POST，把生成的課文傳過去，然後拿到一個id流水號，用來作為存題目的索引
        req = urllib.request.Request(php_api_url, json_data, headers={'Content-Type': 'application/json'})

        try:
            with urllib.request.urlopen(req) as response:
                php_response = response.read().decode('utf-8')
                print("PHP Response:", php_response)
                # print(json_data.decode('utf-8'))
        except urllib.error.URLError as e:
            print("Request failed with error:", e)

        
        # 以下為將題目存入資料庫
        # 要送過去的兩個資料有剛生成的題目的auto_key跟題目內容
        data_to_send = {
            'lastGenerateId': json.loads(php_response)['lastGenerateId'],  # 使用上一個php返回的lastGenerateId作為索引
            'questions': generated_data['generate_question'] # json的題目部分
        }
        php_api_url = "http://localhost/insert_generate_question.php"

        # POST過去存入mysql
        req = urllib.request.Request(php_api_url, json.dumps(data_to_send).encode('utf-8'), headers={'Content-Type': 'application/json'})

        try:
            with urllib.request.urlopen(req) as response:
                php_response = response.read().decode('utf-8')
                print("PHP Response:", php_response)
                print(data_to_send)
        except urllib.error.URLError as e:
            print("Request failed with error:", e)



        return jsonify({'result': completed_text})
    else:
        return jsonify({'error': '未輸入文字'})
    

@app.route('/get_courses', methods=['GET'])

def get_courses():

    try:
            # mysql連線
            cur = mysql.connection.cursor()

            # sql查詢
            cur.execute("SELECT * FROM course")

            # 所有課程
            courses = cur.fetchall()

            # 關閉連線
            cur.close()

            # 将数据转换为JSON并返回给前端
            course_list = []
            for course in courses:
                course_dict = {
                    'course_id': course[0],
                    'course_name': course[1],
                    'course_describe': course[2],
                    'course_public': course[3]
                }
                course_list.append(course_dict)
            print(course_list)
            return jsonify({'courses': course_list})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
