import requests
import json
from requests.auth import HTTPBasicAuth

# 定義API端點URL
api_url = "https://api.d-id.com/talks"
auth = HTTPBasicAuth('apikey', 'MTA5MTExMjJAZ20ubnR0dS5lZHUudHc:CAG-s7HA6mISOnbRK-qyf')
# 定義請求的JSON數據
data = {
    "source_url": "https://myhost.com/image.jpg",
    "script": {
        "type": "text",
        "input": "Hello world!"
    }
}

# 發送POST請求
response = requests.post(api_url, json=data,auth=auth)

# 檢查回應是否成功
if response.status_code == 200:
    result_data = response.json()
    result_text = result_data.get("result", "API request succeeded but no result provided.")
    print("Text to Speech API Result:")
    print(result_text)
else:
    print(f"API request failed with status {response.status_code}: {response.text}")
