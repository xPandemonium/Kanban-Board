import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  const response = await fetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json',}
    })
  
  if (!response.ok) {
    throw new Error('Login failed');
  }
  const data = await response.json();

  return data;
}




export { login };
