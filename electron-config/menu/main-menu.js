const BrowserWindow = require("electron").BrowserWindow;
const app = require("electron").app;
const Store = require('electron-store');

const store = new Store();

const mainMenus =    {
    label: 'Main',
    submenu: [               
        {
            label:'Logout',
            click() { 
                doLogout(null,4125);   
                store.set('unicorn', '🦄');
                store.set('id',4125);        
                console.log("unicorn : ", store.get('unicorn'));                        
            },
            accelerator: 'CmdOrCtrl+Shift+L'  
        },
        {type:'separator'},
        { 
            label:'Exit',
            click() { 
                app.quit() 
            },
            accelerator: 'CmdOrCtrl+X' 
        }
    ]
};
module.exports = mainMenus;