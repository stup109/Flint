import React, {useState,useEffect} from 'react';
import { handleLogout } from './api.js';
import './styles.css';

const Login = () => {
  const [account,setAccount]=useState('');
  const [password, setPassword]=useState(''); 
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('account', account);
    formData.append('password', password);

    // 帳密發送登入請求給後端 PHP(使用post)
    fetch('http://localhost/login.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // 登入成功，導向到首頁(Home)
          console.log(JSON.stringify(data))
          alert('Login success');
          window.location.href = 'http://localhost:3000';
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

  const [session,setSession]=useState(null);
  const [userid,setUserid]=useState(null);

  useEffect(() => {
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
  }, []);

  //時間到自動登出
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
      </div>
    </div>
  );
};
export {Login};