const { session } = require('electron');

class CookieService {
    constructor(opts) {
      
    }
    get(){
        return session.defaultSession.cookies.get({});
    }
    set(cookie){        
        session.defaultSession.cookies.set(cookie)
        .then(() => {
            // success
        }, (error) => {
            console.error(error)
        });;
    }
    delete(url,name){
        return session.defaultSession.cookies.remove(url,name);
    }
}

module.exports = new CookieService;