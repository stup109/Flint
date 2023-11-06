import sys;
import openai
# openai.api_key = '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'

# response = openai.Completion.create(
#     model="text-davinci-003",
#     prompt=sys.argv[1],
#     max_tokens=128,
#     temperature=0.5,
# )

# completed_text = response["choices"][0]["text"]
# print(completed_text)

print(sys.argv[1])
print('hi')








# from flask import Flask, request, jsonify
# from flask_cors import CORS

# app = Flask(__name__)

# # 启用 CORS
# CORS(app)

# @app.route('/pythonshell_test_1.py', methods=['GET'])
# def generate_text():
#     # 从 URL 查询参数中获取输入文本
#     input_text = request.args.get('input_text')

#     # 在这里执行文本生成操作
#     # 这里只是一个示例，你可以替换为实际的生成文本的代码
#     generated_text = "Your generated text goes here"

#     # 创建响应 JSON
#     response_data = {
#         "input_text": input_text,
#         "generated_text": generated_text
#     }

#     # 返回 JSON 数据
#     return jsonify(response_data)

# if __name__ == '__main__':
#     app.run()
