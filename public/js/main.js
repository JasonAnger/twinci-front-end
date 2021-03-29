let transfee = document.getElementById('transfee')
let transaction = document.getElementById('transaction')
let community = document.getElementById('community')
let wallet = document.getElementById('wallet')

let myObject = {
  transfee: 1.00,
  transaction1: 1,
  transaction2: 100,
  community: 0,
  wallet: "100",
  isAnimated: false
}

var doc = document.documentElement;
var w   = window;

var curScroll;
var prevScroll = w.scrollY || doc.scrollTop;
var curDirection = 0;
var prevDirection = 0;

var toggled;
var threshold = 200;

var checkScroll = function() {
    curScroll = w.scrollY || doc.scrollTop;
    if(curScroll > prevScroll) {
        // scrolled down
        curDirection = 1;
    }
    else {
        //scrolled up
        curDirection = 0;
    }

    if(curDirection !== prevDirection) {
        toggled = toggleHeader();
    }

    prevScroll = curScroll;
    if(toggled) {
        prevDirection = curDirection;
    }
};

var toggleHeader = function() { 
    toggled = true;
    if(curDirection === 1 && curScroll > threshold) {
        document.getElementById("navigation-bar").className="nav-bar animate__animated animate__slideInDown"
        document.getElementById("navigation-bar").style.position="fixed"
        document.getElementById("navigation-bar").style.top="-40px"
        document.getElementById("navigation-bar").style.boxShadow="none"
        document.getElementById("navigation-bar").style.transition="all 0.5s ease"
    }
    else if (curDirection === 0) {
        document.getElementById("navigation-bar").style.top="-500px"
    }
    else {
        toggled = false;
    }
    return toggled;
};

window.onscroll = function onScrollWindow() {
    if(window.scrollY>window.innerHeight && window.innerWidth>1000) {
        document.getElementById("scrollToTop").style.display="block"
        checkScroll()
    }
    else {
        document.getElementById("scrollToTop").style.display="none"
        document.getElementById("navigation-bar").style.position="absolute"
        if(window.innerWidth>1000)
            document.getElementById("navigation-bar").className="nav-bar animate__animated animate__slideInUp animate__faster"
        document.getElementById("navigation-bar").style.top=0
        if(document.getElementById("nav-list").style.right!=="-200%") {
            document.getElementById("nav-list").style.right="-200%"
            document.getElementById("nav-list-holder").style.height="100px"
            document.getElementById("line1").style.transition="all 0.3s ease"
            document.getElementById("line3").style.transition="all 0.3s ease"
            document.getElementById("line2").style.display= "block"
            document.getElementById("line1").style.transform= "rotate(0deg)"
            document.getElementById("line1").style.marginTop="5px"
            document.getElementById("line3").style.transform= "rotate(0deg)"
            document.getElementById("line3").style.marginTop="5px"
            document.getElementById("nav-list-bottom").style.right="-200%"
            unanimeSlideUp()
        }
    }
    if(document.getElementById("animeNumber") && document.getElementById("animeNumber").offsetTop-window.scrollY<680 && myObject.isAnimated==false) {
        myObject.isAnimated=true
        anime({
          targets: myObject,
          transfee: [0.99,0.01],
          easing: 'linear',
          round: 100,
          duration: 2000,
          update: function() {
            transfee.innerHTML = `${myObject.transfee}$`;
          }
        });
        anime({
          targets: myObject,
          transaction1: [10,23,60,99,126],
          transaction2: [100,999,100,999,513],
          easing: 'linear',
          round: 1,
          duration: 2000,
          update: function() {
            transaction.innerHTML = `${myObject.transaction1},${myObject.transaction2}`;
          }
        });
        anime({
          targets: myObject,
          community: [0,30, 50, 60 , 99 ,"Over "+100],
          easing: 'linear',
          round: 1,
          duration: 2000,
          update: function() {
            community.innerHTML = `${myObject.community}`;
          }
        });
        anime({
          targets: myObject,
          wallet: [60,152],
          easing: 'linear',
          round: 1,
          duration: 2000,
          update: function() {
            wallet.innerHTML = `${myObject.wallet}`;
          }
        });
      }
}
function slideTo(item){
    if(item=="top") {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
    else {
        if(window.innerWidth>1000)
            window.scrollTo({top: document.getElementById(item).offsetTop-150, behavior: 'smooth'})
        else {
            document.getElementById("nav-list-holder").style.height="100px"
            window.scrollTo({top: document.getElementById(item).offsetTop, behavior: 'smooth'})
        }
    }
}
function outburgerHandleClick() {
    burgerHandleClick()
}
function burgerHandleClick() {
    if(document.getElementById("nav-list").style.right=="-200%") {
        document.getElementById("nav-list-holder").style.zIndex=100
        document.getElementById("nav-list-holder").style.height="100%"
        document.getElementById("line1").style.transition="all 0.3s ease"
        document.getElementById("line3").style.transition="all 0.3s ease"
        document.getElementById("line2").style.display= "none"
        document.getElementById("line1").style.transform= "rotate(45deg)"
        document.getElementById("line1").style.marginTop="15px"
        document.getElementById("line3").style.transform= "rotate(-45deg)"
        document.getElementById("line3").style.marginTop="-10px"
        document.getElementById("nav-list").style.right="0%"
        document.getElementById("nav-list-bottom").style.right="0%"
        animeSlideUp()
    }
    else if(document.getElementById("nav-list").style.right!=="-200%") {
        document.getElementById("nav-list-holder").style.zIndex=20
        document.getElementById("nav-list-holder").style.height="100px"
        document.getElementById("line1").style.transition="all 0.3s ease"
        document.getElementById("line3").style.transition="all 0.3s ease"
        document.getElementById("line2").style.display= "block"
        document.getElementById("line1").style.transform= "rotate(0deg)"
        document.getElementById("line1").style.marginTop="5px"
        document.getElementById("line3").style.transform= "rotate(0deg)"
        document.getElementById("line3").style.marginTop="5px"
        document.getElementById("nav-list").style.right="-200%"
        document.getElementById("nav-list-bottom").style.right="-200%"
        unanimeSlideUp()
    }
}

function subscribe() {
    fetch('/api/email', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: document.getElementById("subscribe").value}),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function showVideo() {
    document.getElementById("video").className="animate__animated animate__fadeIn"
    document.getElementById("video").style.display="flex"
}

function hideVideo() {
    document.getElementById("video").className="animate__animated animate__fadeOut"
    setTimeout(() => {
        document.getElementById("video").style.display="none"
    }, 1000)
}

function animeSlideUp() {
    let lengthArray = document.getElementById("nav-list").getElementsByTagName("li").length
    for(let i=0; i<lengthArray; i++) {
        document.getElementById("nav-list").getElementsByTagName("li")[i].className="animate__animated animate__fadeInUp "
        document.getElementById("nav-list").getElementsByTagName("li")[i].style.setProperty('--animate-delay', `1s`);
        document.getElementById("nav-list").getElementsByTagName("li")[i].style.setProperty('--animate-duration', `${0.5+i*0.2}s`);
    }
}

function unanimeSlideUp() {
    let lengthArray = document.getElementById("nav-list").getElementsByTagName("li").length
    for(let i=0; i<lengthArray; i++) {
        document.getElementById("nav-list").getElementsByTagName("li")[i].className=""
    }
}