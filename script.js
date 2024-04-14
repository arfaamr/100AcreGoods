var cart = Array(20).fill(0);         // initialise an array of length 20 (one element per corresponding item), with quantity in cart
var adding = Array(20).fill(0);

function displayFormTabContent(sel){
    if (sel == 'signup'){
        document.getElementById("signUpForm").style.display = "block";      //show signup form
        document.getElementById("signInForm").style.display = "none";       //hide signin form

        if (!document.getElementById("signInTab").className.includes("inactive")){
            document.getElementById("signInTab").className += " inactive";
            document.getElementById("signUpTab").className = "signButton";
        }
    }
    else{
        document.getElementById("signInForm").style.display = "block";      //hide signin form
        document.getElementById("signUpForm").style.display = "none";       //show signup form
        
        if (!document.getElementById("signUpTab").className.includes("inactive")){
            document.getElementById("signUpTab").className += " inactive";
            document.getElementById("signInTab").className = "signButton";
        }
    }
}

function addToCurr(i, n){
    //cart = JSON.parse(localStorage.getItem("cart"));
    //cart[i-1] = Math.max(0, cart[i-1]+n);
    adding[i-1] = Math.max(0, adding[i-1]+n);
    const item = document.getElementsByClassName("item shop")[i-1];
    const addingP = item.querySelector(".adding");
    addingP.innerHTML = adding[i-1];
}

function addToCart(){
    var savedCart = JSON.parse(localStorage.getItem("cart"));
    for (var i=0; i<20; i++){
        savedCart[i] += adding[i];
    }
    localStorage.setItem("cart", JSON.stringify(savedCart));
}

function displayCartItems(){
    cart = JSON.parse(localStorage.getItem("cart"));
    for (var i=0; i<20; i++){
        const item = document.getElementsByClassName("item cart")[i];
        const qtyP = item.querySelector(".qty");
        qtyP.innerHTML = cart[i];
        if (cart[i] == 0){
            item.style.display = "none";
        }
        else {
            item.style.display = "block";
        }
    }
}

function saveCart(){                    // save cart to user's session id, so when they sign back in it reloads
    cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
    const sessId = document.cookie
    .split("; ")
    .find((row) => row.startsWith("PHPSESSID="))
    ?.split("=")[1];
    localStorage.setItem(sessId, JSON.stringify(cart));
}

function loadCart(){
    const sessId = document.cookie
    .split("; ")
    .find((row) => row.startsWith("PHPSESSID="))
    ?.split("=")[1];
    var savedCart = JSON.parse(localStorage.getItem(sessId));
    localStorage.setItem(cart, JSON.stringify(savedCart));
}

function errorCheck(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var errorVal = urlParams.get('error');
    if (errorVal != null){
        if (errorVal == 100) document.getElementById("errorMsg").innerHTML = "Error: Incorrect email";
        if (errorVal == 101) document.getElementById("errorMsg").innerHTML = "Error: Incorrect password";
        if (errorVal == 102) document.getElementById("errorMsg").innerHTML = "Error: User already exists";

        document.getElementById("errorBox").style.display = "block";
        setTimeout(function(){
            document.getElementById("errorBox").classList = "fadeOut";
        }, 1500);
        setTimeout(function(){
            document.getElementById("errorBox").style.display = "none";
            document.getElementById("errorBox").classList = "";
        }, 5500);
    }
}