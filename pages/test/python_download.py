import requests

# durl='https://d-id-talks-prod.s3.us-west-2.amazonaws.com/google-oauth2%7C103965831765131871486/tlk_Oh_mw-8DhWBbyiD7iJimw/source/image.jpeg?AWSAccessKeyId=AKIA5CUMPJBIK65W6FGA&Expires=1677262035&Signature=jZfKBSpyXQP0i2ifoAhQvb6rYE0%3D'
durl='https://a478.static-file.com/video/7277e46d6cd381f218b45254e70ad042/652273d3/mp4/v12/231003/ab72183d6519cf86d07b978453daacae.mp4?s=96'
# req=requests.get(durl)
# filename=req.url[durl.rfind('/')+1:]

# with open(filename,'wb') as f:
#     for chunk in req.iter_content(chunk_size==8192):
#         if chunk:
#             f.write(chunk)

# import requests


# music_url = "https://a478.static-file.com/video/7277e46d6cd381f218b45254e70ad042/652273d3/mp4/v12/231003/ab72183d6519cf86d07b978453daacae.mp4?s=96"
music_url='https://a459.static-file.com/video/ccaf1ba752b6672b6503245de4130af4/65227553/mp4/v12/230707/8ac93493627577c8b403cd6de16dd228.mp4?s=192'
# 發送 GET 請求以下載音樂檔案
response = requests.get(music_url)

if response.status_code == 200:
    # 開啟一個二進制檔案以寫入音樂內容
    with open("music.mp3", "wb") as music_file:
        music_file.write(response.content)
    print("音樂下載完成")
else:
    print("音樂下載失敗")
