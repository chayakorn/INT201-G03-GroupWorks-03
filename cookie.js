export class CookieUtil {
    static get(name) {
        let cookieName = `${encodeURIComponent(name)}=`,
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;
        if (cookieStart > -1) {
            let cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
        return cookieValue;
    }
    static set(name, value, expires) {
            let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
            if (expires instanceof Date) { cookieText += `;expires=${expires.toUTCString()}`; }
            document.cookie = cookieText;
        }
        //to remove existing cookies, setting the cookie again—with the same path, domain, and secure options—and set its expiration date to some time in the past.  
    static unset(name) { //set to a blank string and the expiration date set to January 1, 1970 (the value of a Date object initialized to 0 milliseconds).     
        CookieUtil.set(name, "", new Date(0)); //or max-age=0
    }

};

function getName(name) {
    let data = document.cookie; //ดึงข้อมูลของ cookie เข้ามา
    let arrayOfCookie = data.split('; '); //แยกข้อมูลcookie ของแต่ละตัว จะตัดทุกครั้งที่เจอ ;
    for (let i of arrayOfCookie) { //loop ของทั้งหมดที่มีใน cookie 
        let key = i.split('='); //แยกค่า key value ออกจากกัน
        if (key[0] == name) { //เช็คค่า key ว่าเท่ากับ name ไหม
            return key[1]; //ถ้าเท่ากัน return value 
        }
    }
}
CookieUtil.set("username", "guest", new Date('January 1, 2022'));
let user = document.querySelector("#user");
user.textContent += `ยินดีต้อนรับ : ${getName("username")}`;