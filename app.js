let currentProduct = "";
let currentPrice = 0;
let currentOrderId = "";

function openPayment(product, price){

  currentProduct = product;
  currentPrice = price;

  document.getElementById("paymentPopup")
  .classList.remove("hidden");

  document.getElementById("productName")
  .innerHTML = product;

  document.getElementById("productPrice")
  .innerHTML = "Pay ₹" + price;

}

function closePayment(){

  document.getElementById("paymentPopup")
  .classList.add("hidden");

}


function paymentDone(){

  const username =
  document.getElementById("username")
  .value;

  if(username == ""){
    alert("Enter Telegram Username");
    return;
  }


  db.collection("orders")
  .add({

    username: username,
    product: currentProduct,
    price: currentPrice,
    status: "pending",
    time: Date.now()

  })

  .then((doc)=>{

    currentOrderId = doc.id;

    document.getElementById("status")
    .innerHTML = "Payment Request Sent ✅";

    startTimer();

    checkStatus();

  });

}


function startTimer(){

  let time = 300;

  const timer = setInterval(()=>{

    let minutes =
    Math.floor(time / 60);

    let seconds =
    time % 60;

    document.getElementById("timer")
    .innerHTML =
    minutes + ":" + seconds;

    time--;

    if(time < 0){

      clearInterval(timer);

      document.getElementById("timer")
      .innerHTML = "Session Expired";

    }

  },1000);

}


function checkStatus(){

  db.collection("orders")
  .doc(currentOrderId)
  .onSnapshot((doc)=>{

    const data = doc.data();

    if(data.status == "approved"){

      document.getElementById("status")
      .innerHTML = "Payment Approved ✅";

      document.getElementById("deliveryCode")
      .innerHTML =
      "Your Code: " + data.code;

    }


    if(data.status == "declined"){

      document.getElementById("status")
      .innerHTML = "Payment Declined ❌";

    }

  });

}