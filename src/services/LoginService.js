let _singleton = Symbol();
const USER_API_URL =
    'https://moviewalk.herokuapp.com/api/user';

class LoginService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new LoginService(_singleton);
        return this[_singleton]
    }

    normalLogin(user){
        return fetch(USER_API_URL + "/normalLogin", {
            body: JSON.stringify(user),
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        }).
        catch(() => {return null;});
    }

    login(user) {
        return fetch(USER_API_URL + "/socialLogin", {
            body: JSON.stringify(user),
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    registerUser(user) {
        return fetch(USER_API_URL + "/signup", {
            body: JSON.stringify(user),
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }


    findEmail(email) {
        return fetch('https://moviewalk.herokuapp.com/api/profile/' + email,{}).then(response => response.json()).
        catch(() => {return null;});
    }

    getRequests() {
        return fetch('https://moviewalk.herokuapp.com/api/applications/user',{credentials: "same-origin"}).then(response => response.json()).
        catch(() => {return null;});
    }
}

export default LoginService;
