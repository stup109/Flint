export function fetchUserdata() {
    return fetch('http://localhost/user_info.php')
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
        return { error: 'Failed to fetch userdata' };
    });
}

export function handleLogout(){
    fetch('http://localhost/logout.php')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // 登出成功，自動導向登入頁面
          alert('Logout success');
          window.location.href = 'http://localhost:3000/login';
        } else {
          // 登出失敗
          alert('Logout failed');
          console.log(data.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
};
  