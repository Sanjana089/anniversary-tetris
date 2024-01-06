function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

let cardTest = [];
// 25 cards
// let cards = ["diamond", "diamond", "plane", "plane", "gift", "gift", "heart", "heart", "home", "home"
// , "birthday-cake", "birthday-cake", "calendar-o", "calendar-o", "coffee", "coffee", "puzzle-piece", 
// "puzzle-piece", "glass", "glass", "paw", "paw", "star-o", "star-o", "shopping-basket"];
// 9 cards
let cards = ["gift", "gift", "heart", "heart", "birthday-cake", "birthday-cake", "glass", "glass", "shopping-basket"];
// let cards = ["diamond", "diamond",  "shopping-basket"];

let shuffledCards = shuffle(cards);

const noOfMatches = Math.floor(cards.length / 2);
console.log(noOfMatches);

function createCards() {
    for (let card of shuffledCards) {
        const li = document.createElement("LI");
        li.classList.toggle("card");
        const i = document.createElement("i");
        i.classList.toggle("fa");
        i.classList.toggle("fa-" + card);
        const deck = document.querySelector('.deck');
        li.appendChild(i);
        deck.appendChild(li);

    }
}

const ul = document.querySelector('.deck');
let match = 0;
let isRestart = false;

function initGame() {
    createCards();
    const card = document.querySelectorAll('.card');
    for (let i = 0; i < card.length; i++) {
        card[i].addEventListener("click", function (event) {
            if (card[i] !== event.target) return;
            if (event.target.classList.contains("show")) return;
            showCard(event.target);
            setTimeout(addCard, 550, shuffledCards[i], event.target, cardTest, i);
            console.log(match);
            if (match === noOfMatches) {
                const lastCard = document.querySelector('.fa-shopping-basket').parentNode;
                lastCard.removeChild(document.querySelector('.fa-shopping-basket'));
                const p = document.createElement("p");
                p.innerText = "Happy Anniversary";
                p.classList.add('text');
                lastCard.appendChild(p);
                lastCard.classList.add('active');
                centerCard(lastCard);
            }
        }, false);
    }
}
function centerCard(card) {
    const containerRect = ul.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const offsetX = (containerRect.width - cardRect.width) / 2 - cardRect.left + containerRect.left;
    const offsetY = (containerRect.height - cardRect.height) / 2 - cardRect.top + containerRect.top;

    card.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
}
function showCard(card) {
    card.classList.add('show');
}

function addCard(card, cardHTML, testList, pos) {
    if (isRestart) {
        testList.length = 0;
        isRestart = false;
    }
    testList.push(card);
    testList.push(cardHTML)
    testList.push(pos);
    if (testList.length === 6) {
        testCards(testList[0], testList[1], testList[2], testList[3], testList[4], testList[5]);
        testList.length = 0;
    }
}

function testCards(card1, html1, x1, card2, html2, x2) {
    if (card1 === card2 && x1 != x2) {
        cardsMatch(html1, html2);
    } else {
        cardsDontMatch(html1, html2);
    }
}

function cardsMatch(card1, card2) {
    card1.classList.add('match');
    card2.classList.add('match');
    match++;
}


function cardsDontMatch(card1, card2) {
    card1.classList.toggle('no-match');
    card2.classList.toggle('no-match');
    setTimeout(function () {
        card1.classList.toggle('no-match');
        card2.classList.toggle('no-match');
        card1.classList.toggle('show');
        card2.classList.toggle('show');

    }, 300);
}


let restart = document.querySelector(".restart");
restart.addEventListener("click", restartGame, false);
function restartGame() {
    match = 0;
    isfirstClick = true;
    isRestart = true;
    const deck = document.querySelector('.deck');
    var elements = deck.getElementsByClassName("card");

    while (elements[0]) {
        elements[0].parentNode.removeChild(elements[0]);
    }
    shuffledCards = shuffle(cards);

    initGame();
}



initGame();