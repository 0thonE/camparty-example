
export class AuthService {

    static saveUserData = (data) => {
        localStorage.setItem('campparty_info', JSON.stringify({
            token:data.token,
            userId:data.userId,
            usern:data.usern
        }));
    }

    static removeUserData = () => {
        localStorage.removeItem('campparty_info');
    }
    
    static getUserData = () => {
        return JSON.parse(localStorage.getItem('campparty_info'));
    }
    
    static isLoggedIn = ()=>{
        let log = JSON.parse(localStorage.getItem('campparty_info'))
        log=(log)?log:{};
        return !!log.token;
    }
}
