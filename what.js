// let doc = document.getElementById('test');
// let doc1 = document.getElementById('a');
const a = 'swaddee';

{
    let b = 'who';
    var c = 'eiei';
    // a = 'k';
}

// console.log(a);
// console.log(c);
// console.log(b);
let t = true;

let num = 1;
let s = '1';
console.log(num + 'vs' + s);

if(num === s){
    console.log("เท่ากันได้ไง");
}else{
    console.log("ไม่เท่ากันนะ");
    // doc.innerHTML = "ไม่่เท่ากันนะ";
}
function multiply(n1,n2){
    return n1*n2;
}
function func(l){
    console.log(l);
}
setTimeout(function(){
    func(multiply(5,6));
},5000);
let obj = {weight: 80, height: 190};
console.log(obj);
console.log(typeof(obj)); 
let ว่าง;
console.log(ว่าง);

let numbernaja = 1;
console.log(`type of numbernaja is ${typeof numbernaja}`);

let stringyay = 'Goods';
console.log(`type of stringyay is ${typeof stringyay}`);

let booleanrum = true;
console.log(`type of booleanrum is ${typeof booleanrum}`);

let nodefined;
console.log(`type of nodefined is ${typeof nodefined}`);

let simson = Symbol();
console.log(`type of simson is ${typeof simson}`);

let emptyobj = null;
console.log(`type of emptyobj is ${typeof emptyobj}`);

let array = [1, 2, 4];

console.log(`array Length: ${array.length}`);
console.log(`type of array is ${typeof array}`);
let zodiac= (a)=>{
    switch (a%12) {
        case 0:
            console.log("zodiac1");
            break;
        case 1:
            console.log("zodiac2");
            break;
        case 2:
            console.log("zodiac3");
            break;
        case 3:
            console.log("zodiac4");
            break;
        case 4:
            console.log("zodiac5");
            break;
        case 5:
            console.log("zodiac6");
            break;
        case 6:
            console.log("zodiac7");
            break;
        case 7:
            console.log("zodiac8");
            break;
        case 8:
            console.log("zodiac9");
            break;
        case 9:
            console.log("zodiac10");
            break;
        case 10:
            console.log("zodiac11");
            break;
        case 11:
            console.log("zodiac12");
            break;
    }

}
for(i = 0;i<12;i++){
    zodiac(i);
}