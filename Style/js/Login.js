import React, {useState,useEffect} from 'react';
import { handleLogout } from './functions.js';
import { Link } from "react-router-dom";
import './styles.css';

const Login = () => {
  // 用來放user輸入的帳號跟密碼
  const [account,setAccount]=useState('');
  const [password, setPassword]=useState('');
  
  // user登入之後，用來檢查目前的user_id是誰
  const [userid,setUserid]=useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // 建立FormData，把user輸入的帳號密碼，之後把formData交給api。(也可以用json寫，但教學用了formdata就跟著用了)
    const formData = new FormData();
    formData.append('account', account);
    formData.append('password', password);

    // 帳密發送登入請求給後端 PHP(使用post)
    fetch('http://localhost/login.php', {
      method: 'POST',
      body: formData, // 這就是剛才上面建立的formdata了٩(๑•̀ω•́๑)۶
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(JSON.stringify(data))
          alert('Login success');
          window.location.href = 'http://localhost:3000'; // 登入成功，導向到首頁(Home)
        } else {
          // 登入失敗，錯誤訊息
          alert('Invalid account or password.');
          console.log(data.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  // 這是用來測試用的，查看目前session中紀錄的登入帳號的id是多少
  const handleSessiontest=(e)=>{
    e.preventDefault();
    fetch(`http://localhost/test2.php`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          return;
        }
        setUserid(data.user_id);
        console.log(userid)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //時間到自動登出，做出來怪怪的，先放置。
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     fetch('http://localhost/logout.php')
  //       .then(() => {
  //         setUserid(null);
  //       })
  //       .catch((error) => console.log(error));
  //   }, 5);

  //   return () => clearTimeout(timer);
  // }, []);//依賴項要放甚麼???????
  

  

  return (

    <div className="login">
      <h2>Login</h2>
      <form className='form-group'>
        <input
          type="text"
          placeholder="Account"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <div className="button-group">
        <button onClick={handleSubmit}>Login</button>
        <button onClick={handleSessiontest}>Session test</button>
        <button onClick={handleLogout}>Logout</button>
        <Link className="link" to='http://localhost:3000/teachersignup'>Sign Up</Link>
      </div>
    </div>
  );
};
export {Login};