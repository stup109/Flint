import React, { useState,useEffect } from 'react';

export function GenerateText() {
  const [inputText, setInputText] = useState('');
  const [resultText, setResultText] = useState('');
  const [userLevel, setUserLevel] = useState('');
  let str='';

  // 取得使用者level，之後根據userLevel去判斷生成的文章難度和長度
  useEffect(() => {
    fetch(`http://localhost/user_info.php`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          return;
        }
        setUserLevel(data.user.reading_level);
        console.log(data);
        console.log(userLevel);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (event) => {
    

    setInputText(event.target.value);
  };


  const handleSendToPython = () => {
    // 發送用戶輸入的東西到Python

    if(userLevel==1){
      str=`請幫我生成一篇難度為CEFR標準中，Pre A1難度的英語課文，以及跟課文相關的2到5個題目，主題是${inputText}，文章字數控制在100字左右，題目是選擇題，有題目描述和四個題目選項。`;
    }
    else if(userLevel==2){
      str=`請幫我生成一篇難度為CEFR標準中，A1難度的英語課文，以及跟課文相關的2到5個題目，主題是${inputText}，文章字數控制在100字左右，題目是選擇題，有題目描述和四個題目選項。`;
    }
    else if(userLevel==3){
      str=`請幫我生成一篇難度為CEFR標準中，A2難度的英語課文，以及跟課文相關的2到5個題目，主題是${inputText}，文章字數控制在100字左右，題目是選擇題，有題目描述和四個題目選項。`;
    }
    else if(userLevel==4){
      str=`請幫我生成一篇難度為CEFR標準中，B1難度的英語課文，以及跟課文相關的2到5個題目，主題是${inputText}，文章字數控制在100字左右，題目是選擇題，有題目描述和四個題目選項。`;
    }
    else if(userLevel==5){
      str=`請幫我生成一篇難度為CEFR標準中，B2難度的英語課文，以及跟課文相關的2到5個題目，主題是${inputText}，文章字數控制在100字左右，題目是選擇題，有題目描述和四個題目選項。`;
    }
    else if(userLevel==6){
      str=`請幫我生成一篇難度為CEFR標準中，C1難度的英語課文，以及跟課文相關的2到5個題目，主題是${inputText}，文章字數控制在100字左右，題目是選擇題，有題目描述和四個題目選項。`;
    }
    else{
      str=`請幫我生成一篇難度為CEFR標準中，C2難度的英語課文，以及跟課文相關的2到5個題目，主題是${inputText}，文章字數控制在100字左右，題目是選擇題，有題目描述和四個題目選項。`;
    }

    fetch(`http://localhost:5000/process_input?text=${str}`)
      .then((response) => response.json())
      .then((data) => {
        // 從python回來的結果
        setResultText(data.result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <h1>Hi, This is GenerateText.</h1>
      <textarea
        placeholder="Enter text"
        value={inputText}
        onChange={handleInputChange}
        style={{ width: '300px', height: '100px' }}
      />
      <br />
      <button onClick={handleSendToPython}>Send to Python</button>

      <br />
      <textarea
        value={resultText}
        readOnly
        style={{ width: '300px', height: '100px' }}
      />
    </>
  );
}



// import { useState } from 'react';
// import { exec } from 'child_process';

// const scriptPath = 'D:/react_projects/test1/src/pages/js_run_python_script/pythonshell_test_1.py';
// const input = '"please count one to three for me."';



// export function GenerateText() {
//   const [inputText, setInputText] = useState('');
//   const [displayText, setDisplayText] = useState('');
//   var lastGenerateId =0;
//   const course_id = 3;
//   //假設這是從python獲取的，生成後的json
//   const generated_data = {
//   "generate_chapter": {
//     "user_id": 1,
//     "course_id": 2,
//     "chap_name": "The Zoo",
//     "content": "A zalids love to see the monkeys swing from tree to tree. There is also a reptile house where you can see snakes and lizards. Zoos help protect animals and teach us about them."
//   },
//   "generate_question": [
//     {
//       "generate_id": 0,
//       "chap_question_number": 1,
//       "type": "reading",
//       "question_describe": "What is the main purpose of a zoo?",
//       "option1": "To sell animals.",
//       "option2": "To protect animals and educate people.",
//       "option3": "To keep animals in cages.",
//       "option4": "To make money from visitors.",
//       "answer": "To protect animals and educate people.",
//       "mp3_file": "abcde",
//       "image": "image1",
//       "question_level": "A1",
//       "question_public": 0
//     },
//     {
//       "generate_id": 0,
//       "chap_question_number": 2,
//       "type": "reading",
//       "question_describe": "How do kids feel about seeing monkeys at the zoo?",
//       "option1": "They are scared.",
//       "option2": "They are indifferent.",
//       "option3": "They love it.",
//       "option4": "They feel bored.",
//       "answer": "They are scared.",
//       "mp3_file": "fghij",
//       "image": "image2",
//       "question_level": "A1",
//       "question_public": 0
//     },
//     {
//       "generate_id": 0,
//       "chap_question_number": 3,
//       "type": "reading",
//       "question_describe": "What can you see at the reptile house in the zoo?",
//       "option1": "Monkeys and bears.",
//       "option2": "Snakes and lizards.",
//       "option3": "Lions and tigers.",
//       "option4": "Dolphins and whales.",
//       "answer": "Snakes and lizards.",
//       "mp3_file": "klmno",
//       "image": "image3",
//       "question_level": "A1",
//       "question_public": 0
//     }
//   ]
// }


//   // 輸入端有改變時，更動輸入框的文字
//   function handleInputChange(event) {
//     setInputText(event.target.value);
//   }

//   // 提交按鈕
//   function handleClick() {
//     setDisplayText(inputText);

//     //將生成的json檔的generate_chapter部分存入資料庫
//     fetch('http://localhost/insert_generate_chapter.php', {
//       method: 'POST', 
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(generated_data.generate_chapter), 
//     })
//       .then((response) => response.json())
//       .then((data) => {

//         //在存入後，將auto_increament的lastGenerateId傳送回來，再將lastGenerateId作為索引，將生成的題目存入generate_question
//         console.log('generate_chapter已存入generate_chapter table', data);
//         console.log(data);
//         lastGenerateId = data.lastGenerateId;


        // fetch('http://localhost/insert_generate_question.php', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     lastGenerateId, // 使用上一個fetch傳回的lastGenerateId作為索引去把questions放入table
        //     questions: generated_data.generate_question,
        //   }),
        // })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log('generate_question已存入generate_question table', data);
            
        //   })
        //   .catch((error) => {
        //     console.log('generate_question：', error);
        //   });

//       })
//       .catch((error) => {
//         console.log('generate_chapter：', error);
//       });
//   }

//   function handleDisplay(){
//     fetch('http://localhost/generate_chapter_display.php', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               lastGenerateId
//             }),
//           })
//             .then((response) => response.json())
//             .then((data) => {
//               console.log(data);
//               setDisplayText(data.questions[0].question_describe);
//             })
//             .catch((error) => {
//               console.log('查找時出錯:', error);
//             });
//   }


//   function handlePythonScript(){
//     //直接下命令python test.py
    
//     fetch('http://127.0.0.1:5000/test_api3/?id=3', {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           })
//             .then((response) => response.json())
//             .then((data) => {
//               console.log(data);
//               setDisplayText(data.result);
              
//             })
//             .catch((error) => {
//               console.log('error', error);
//             });
//   }
//   // function handleexec(){
    
//   //   const scriptPath = 'D:/react_projects/test1/src/pages/js_run_python_script/pythonshell_test_1.py';
//   //   const input = '"please count one to three for me."';
//   //   exec(`python ${scriptPath} ${input}`, (error, stdout, stderr) => {
//   //     if (error) {
//   //       console.error(error);
//   //       return;
//   //     }
        
//   //     console.log(stdout);
//   //   });

//   // }

//   return (
//     <>
//       <h1>Hi, This is GenerateText.</h1>
//       {/* <textarea
//         placeholder="Enter text"
//         value={inputText}
//         onChange={handleInputChange}
//         style={{ width: '300px', height: '500px' }}
//       /> */}
//       <br />
//       <button onClick={handleClick}>Submit</button>
//       <h6>.</h6>
//       <button onClick={handleDisplay}>從資料庫提取剛才存入的question_describe</button>
//       <h6>.</h6>
//       <button onClick={handlePythonScript}>PythonScript</button>
//       <h6>.</h6>
//       {/* <button onClick={handleexec}>Childprocess exec</button> */}
//       <br />
//       <textarea
//         value={displayText}
//         readOnly
//         style={{ width: '300px', height: '500px' }}
//       />
//     </>
//   );
// }
