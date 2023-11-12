import speech_recognition as sr

recognizer = sr.Recognizer()

# 初始化录音状态
is_recording = False

# 处理录音和语音识别
def process_audio():
    global is_recording
    with sr.Microphone() as source:
        print("Talk")
        audio = recognizer.listen(source)
        print("Time over, thanks")

        try:
            # 使用Google语音识别
            transcript = recognizer.recognize_google(audio)
            return transcript
        except sr.UnknownValueError:
            print("Google Speech Recognition could not understand audio")
        except sr.RequestError as e:
            print(f"Could not request results from Google Speech Recognition service; {e}")

    return None

while True:
    # 等待用户点击按钮
    input("Press Enter to start recording...")

    # 开始录音
    is_recording = True
    transcript = process_audio()

    if transcript:
        print(f"Transcript: {transcript}")
        # 将文本填充到指定的输入框
        # 你可以在这里添加代码来将文本发送到前端
    else:
        print("Failed to recognize speech")

    # 等待用户点击按钮来停止录音
    input("Press Enter to stop recording...")
    is_recording = False
