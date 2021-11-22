import { product } from "./product.js" //import product.js
import { CookieUtil } from "./cookie.js";
import { Cart } from "./carts.js";
import { Theme } from "./theme.js"

let dark = document.querySelector('#dark');
let light = document.querySelector('#light');
let foodlist = document.querySelector("#food-list"); //ให้ foodlist เก็บค่า element ที่มี ID เป็น food-list 
let cart = new Cart(); //สร้าง obj ที่เก็บข้อมูลสินค้า ยอดราคารวม สินค้าในตระกร้า และจำนวนของสินค้า

let modal = document.querySelector("#modal");
let content = document.querySelector("#content");
let buy = document.querySelector("#buy");

//showcart
cartIcon.addEventListener('click', () => {
    modal.style.display = "block";

    showCart();

});

window.onclick = (event) => {
    if (event.target == modal) {
        clearViewCart();

    }
}

function clearViewCart() {
    setTimeout(() => {
        modal.style.display = "none";
    }, 150)
    document.querySelector(".modal-content").style.visibility = "hidden";
    document.querySelector(".modal-content").style.width = "50%";
    setTimeout(() => {
        content.innerHTML = `<tr>
            <th>ลำดับ</th>
            <th>ชื่อรายการ</th>
            <th>ราคา (ชิ้น)</th>
            <th>จำนวน</th>
            <th>ราคา</th>

        </tr>`;
    }, 150)
}

// export default function showCart() {
//     let string = ""
//     for (let i of cart.items) {
//         string += `${i.product.name} Price : ${i.product.price} Baht Qty : ${i.qty}\n`
//     }
//     string += `\n Total Qty : ${cart.totalQty}`;
//     string += `\n Total Price : ${cart.totalPrice} Baht`;
//     return string;
// }

function showCart() {
    document.querySelector(".modal-content").style.visibility = "visible";
    setTimeout(() => {
        document.querySelector(".modal-content").style.width = "60%";
    }, 1);


    if (cart.items.length > 0) {
        cart.items.forEach((item, index) => {
            content.innerHTML += `
            <tr>
            <td>${index+1}</td>
            <td>${item.product.name}</td>
            <td>${item.product.price} บาท</td>
            <td>${item.qty}</td>
            <td>${item.qty*item.product.price} บาท</td>
            </tr>`;
            buy.setAttribute("class", "");
        })
        content.innerHTML += `<tr>
            <td></td>
            <td></td>
            <td><b>รวม</b></td>
            <td>${cart.totalQty}</td>
            <td>${cart.totalPrice} บาท</td>
            </tr>
            `


    } else {
        content.innerHTML = "ยังไม่มีสินค้า"
        buy.setAttribute("class", "d-none")
    }
}
buy.lastChild.addEventListener('click', () => {
    alert(`ขอบคุณที่อุดหนุนร้านอาหารแช่แข็งของเรา\nมูลค่าสุทธิ: ${cart.totalPrice} บาท`);
    clearViewCart();
    canCel();
})
buy.firstChild.addEventListener('click', () => {
    clearViewCart();


})


let countEle = document.getElementById("count-el"); //ให้ countEle เก็บค่า element ที่มี ID เป็น count-el
let countPriceEle = document.getElementById("countPrice-el"); //ให้ countPriceEle เก็บค่า element ที่มี ID = countPrice-el
countEle.textContent = cart.totalQty; //กำหนดให้ countEle มีค่าเท่ากับ จำนวนสินค้าใน cart obj
countPriceEle.textContent = cart.totalPrice; //กำหนดให้ countPriceEle มีค่าเท่ากับ ยอดรวมราคาใน cart obj
let searchIcon = document.querySelector("#search"); //ให้ searchIcon เก็บค่า element ที่มี ID search
let boolSearch = true;
let product1 = product;
list();
let theme = localStorage.getItem("theme");
if (theme == "dark") {
    Theme.dark();

} else {
    Theme.light();

} //หา element ที่มี id เป็น searchbar 
//และใช้คำสั่ง innerHTML สร้าง element input เพื่อสร้างแถบ searchbar
let searchbar = document.querySelector("#searchbar");
searchbar.innerHTML += `<input type="text" id="searchValue" placeholder="ชื่ออาหาร เช่น กะเพราไก่ไข่ลูกเขย"  class="form-control" style="visibility: hidden;width: 0;transition: all .5s linear;"></input>`;
//ให้ searchValue เก็บค่าที่ถูกพิมพ์ลงใน searchbar ที่เราสร้างขึ้น
let searchValue = document.querySelector("#searchValue");

//set event handle ของ searcValue เป็น keyup โดยจะเป็นการเรียกใช้ function หลังจากที่กดปุ่มบนคีย์บอร์ดและยกนิ้วขึ่น
searchValue.addEventListener("keyup", () => {

    //ให้ value ทำการนำคำที่พิมพ์ลงไปใน searchbar หรือก็คือ Value ของ searchValue มาเทียบกับสินค้า ถ้าหากมีสินค้าที่ตรงกันจะแสดงผลลัพท์เป็นรายการสินค้ามีชื่อตรงกัน
    //RegExp เป็นการเปลี่ยนคำเป็นกลุ่ม ตัวอย่างเช่นเราพิมพ์ กะ จะทำการแปลงเป็น /กะ/g เพื่อให้ RegExp นำไปเปรียบเทียบได้
    //โดยค่า g ข้างหลังหมายถึง global หรือก็คือจะทำการเปรียบเทียบกับข้อมูลทุกตัว ถ้าหากเจอข้อมูลที่ตรงกันก็จะเปรียบเทียบจนหมด
    let value = new RegExp(searchValue.value, 'g');
    //ทำการ map ข้อมูล โดยถ้าหากชื่อสินค้ากับข้อมูลที่พิมพ์ใน searchbar เปรียบเทียบกันแล้วไม่เป็น null จะทำการ นำข้อมูลสินค้าที่ตรงเข้าไปใน product1
    list(product);
    product.map((p) => {
        if ((p.name.match(value) == null)) {
            document.querySelector(`#p${p.id}`).setAttribute("class", "col-4 d-none");
        }
    })
});


//set event handle ของ searchIcon เป็น click โดนจะทำการเรียกใช้ function ที่เมื่อเรากดที่ icon จะทำการแสดงและซ่อน search panel 
searchIcon.addEventListener("click", toggleSearch);

function toggleSearch() {
    //function จะเปลี่ยนค่าของ boolSearch จะเปลี่ยนเป็น true เพื่อให้เข้าเงื่อนไข if และแสดงแถบ searchbar ขึ้นมา
    //และถ้ากดอีกครั้ง searchbar จะหายไปเพราะเข้าเงื่อนไข else 
    boolSearch = !boolSearch;
    if (boolSearch) {
        searchValue.style.width = "0";
        searchValue.style.visibility = "hidden"

    } else {
        searchValue.style.width = "";
        searchValue.style.visibility = "visible"
        searchValue.value = "";
    }
    list(product)
}

//function แสดงรายการสินค้า
function list(product2 = product1) {
    if (CookieUtil.get("cart") != null) {
        cart = Cart.toCart(JSON.parse(CookieUtil.get("cart")));
        console.log(cart);
    }
    cal();
    foodlist.innerHTML = "";
    for (let p of product2) { //เปิด loop เพื่อเพิ่มlistอาหารอื่นๆ

        let ele = document.createElement("div"); //สร้าง div
        ele.setAttribute("id", "p" + p.id); //set id เป็น ตามเลข id ของแต่ละ obj นั้นๆ
        ele.setAttribute("class", "col-4") //set class เป็น col-4 
        let list = document.createElement("ul"); //สร้าง ul 
        list.setAttribute("class", "list-unstyled"); //set class เป็น list-unstyled

        //ให้ulเพิ่ม li โดยใช้ innerHTML ตามข้อมูลที่ใน Obj มี
        //ใช้ += เพื่อเก็บ stack แต่ละค่าไปเรื่อยๆ
        list.innerHTML += `<li><img src="${p.img}" class ="img-fluid rounded mx-auto d-block m-3"></li>`
        list.innerHTML += `<li class="fs-3">${p.name}</li>`;
        list.innerHTML += `<li>${p.description}</li>`;
        list.innerHTML += `<li><b>Price: ${p.price} บาท </b></li>`;
        list.innerHTML += `<li id="${p.id}" >Stock: ${p.stock}</li>`;

        ele.appendChild(list); //append เข้าใน list ("ul")
        foodlist.appendChild(ele); //append เข้าใน ele (div)
        let divBttn = document.createElement("div"); //สร้าง div
        divBttn.setAttribute("class", "cart"); //set class เป็น cart
        let buttn = document.createElement("button"); //สร้าง button
        let buttnCanCel = document.getElementById("cancel") //ให้ buttnCanCel เก็บค่า element ที่มี ID = cancel
        buttn.setAttribute("class", "btn btn-success rounded-pill"); //set class เป็น btn btn-success
        buttn.setAttribute("id", `${p.id}`);

        //ให้ tag button มีข้อความข้างในว่า Add to cart และ ไอค่อน + 
        buttn.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus " viewBox="0 0 16 16">
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
      </svg> เพิ่มลงตะกร้า`;
        divBttn.appendChild(buttn); //append เข้าใน butt (button)
        ele.appendChild(divBttn); //append เข้าใน dibBttn (div)

        // function alertAdd แจ้งเตือนเมื่อกดเพิ่มสินค้าไปยังตะกร้า
        function alertAdd(event) {
            alert(`${p.name} ราคา ${p.price} บาท อยู่ในตะกร้าแล้ว !!!`);
            let qty = 0;
            cart.items.forEach((item) => {
                if (p.id == item.product.id) {
                    qty = item.qty;
                }
            });
            CookieUtil.set("cart", JSON.stringify(cart), new Date('January 1, 2022'));
            cal(); //เรียกใช้ function cal()

        }

        //กำหนดให้เมื่อกด buttnCancel จะเรียกใช้ function canCel()
        buttnCanCel.addEventListener("click", canCel, false);

        //กำหนดให้เมื่อกด buttn จะทำ functions ที่เช็คว่าในตะกร้านั้น มีสินค้าที่ add อยู่แล้วหรือไม่ ถ้าหากไม่มีจะนำเข้าตระกร้า
        //แต่ถ้าหากมีอยู่แล้วจะ จะตรวจสอบว่าสินค้านั้นมี id ตรงกับในตะกร้าหรือไม่
        //ถ้าหากตรงจะเพิ่มแค่จำนวนของสินค้านั้นๆ
        buttn.addEventListener("click", () => {
            cart.addItem(p);
            alertAdd();
            console.log(cart.items);
        }, false);

    }

} //function canCel นำสินค้าในตะกร้าออก
function canCel() {
    CookieUtil.unset("cart");
    cart.clear();
    cal();
}
//function cal คำนวณจำนวนสินค้า และราคาสินค้า
function cal() {
    countEle.textContent = cart.totalQty;
    countPriceEle.textContent = cart.totalPrice;
}

//change bg --------------------------------------------
let bg = document.querySelector('body')
bg.style.background = '#D3D3D3'


dark.addEventListener('click',
    function() {
        bg.style.backgroundColor = '#D3D3D3';
        dark.style.backgroundColor = '#currentColor';
        localStorage.setItem("theme", "light");
    });
light.addEventListener('click',
    function() {
        bg.style.backgroundColor = '#444444';
        light.style.backgroundColor = '#000000';
        localStorage.setItem("theme", "dark")
    });