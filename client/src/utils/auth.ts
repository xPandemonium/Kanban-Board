import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    if (token == "") {
      return null;
    }else {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded;
    }
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    if (token == "") {
      return false;
    }else {
      return !this.isTokenExpired(token);
    }
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      return true;
    } else {
      return false;
    }
  }

  getToken(): string {
    // TODO: return the token
    const token = localStorage.getItem('id_token');
    return token ? token : '';
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

export default new AuthService();
