let _singleton = Symbol();
const USER_URL =
    'https://moviewalk.herokuapp.com/api/user';

class UserService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new UserService(_singleton);
        return this[_singleton]
    }

    getRequests() {
        return fetch('https://moviewalk.herokuapp.com/api/applications/user', {
            credentials: 'include'
        }).then(response => response.json()).catch(() => {
            return null;
        });
    }

    logout() {
        return fetch('https://moviewalk.herokuapp.com/api/user/logout', {
            credentials: 'include'
        })
    }

    getLoginType() {
        return fetch('https://moviewalk.herokuapp.com/api/loginType', {
            credentials: 'include'
        }).then(response => response.json());
    }

    getProfile() {
        return fetch('https://moviewalk.herokuapp.com/api/user', {
            credentials: 'include'
        }).then(response => response.json());
    }

    updateProfile(profile) {
        return fetch("https://moviewalk.herokuapp.com/api/user" + '/update',
            {
                body: JSON.stringify(profile),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'put',
                credentials: 'include'
            }
        ).then(response => response.json());
    }

    updateAdminProfile(profile) {
        return fetch("https://moviewalk.herokuapp.com/api/user/admin" + '/update',
            {
                body: JSON.stringify(profile),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'put',
                credentials: 'include'
            }
        ).then(response => response.json());
    }


    createUser(user) {
        return fetch(USER_URL + '/admin',
            {
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'post',
                credentials: 'include'
            }
        )
    }


    deleteUser(userId) {
        return fetch(USER_URL + '/' + userId,
            {
                method: 'delete',
                credentials: 'include'
            }
        )
    }

}

export default UserService;
