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

// 3 cards
// let cards = ["diamond", "diamond", "shopping-basket"];

let shuffledCards = shuffle(cards);

const noOfMatches = Math.floor(cards.length / 2);

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

// const images = [
//     'images/image1.jpeg', 'images/image2.jpeg', 'images/image3.jpeg', 'images/image4.jpeg', 'images/image5.jpeg',
//     'images/image6.jpeg', 'images/image7.jpeg', 'images/image8.jpeg', 'images/image9.jpeg', 'images/image10.jpeg'
// ];

const images = [
    'images/img1.jpeg', 'images/img2.jpg', 'images/img3.jpeg', 'images/img4.jpg', 'images/img5.jpg',
    'images/img6.jpg', 'images/img7.jpg', 'images/img8.jpg', 'images/img9.jpg', 'images/img10.jpg'
];
const slideshowContainer = document.querySelector('.deck');

function expandCard(card) {
    // Calculate the scale factor based on the screen size
    const scaleFactor = Math.max(window.innerWidth / card.offsetWidth, window.innerHeight / card.offsetHeight);

    // Apply the scaling transformation
    card.style.transform = `scale(${scaleFactor})`;
    card.style.transition = 'all 5s ease';

    // Center the card on the screen
    const translateX = (window.innerWidth - card.offsetWidth * scaleFactor) / 2;
    const translateY = (window.innerHeight - card.offsetHeight * scaleFactor) / 2;
    card.style.transform += ` translate(${translateX}px, ${translateY}px)`;

    // Make the card fullscreen
    card.style.width = '100vw';
    card.style.height = '100vh';

    // Remove the onclick event to prevent further scaling
    card.onclick = null;
}

function initGame() {
    createCards();
    const card = document.querySelectorAll('.card');
    for (let i = 0; i < card.length; i++) {
        card[i].addEventListener("click", function (event) {
            if (card[i] !== event.target) return;
            if (event.target.classList.contains("show")) return;
            showCard(event.target);
            setTimeout(addCard, 550, shuffledCards[i], event.target, cardTest, i);
            if (match === noOfMatches) {
                let icon = document.querySelector('.fa-shopping-basket');
                const lastCard = document.querySelector('.fa-shopping-basket').parentNode;
                lastCard.removeChild(icon);
                lastCard.classList.add('active');
                centerCard(lastCard);
                lastCard.id = 'slideshow';

                expandCard(lastCard);
                images.forEach((imageSrc, index) => {
                    const img = document.createElement('img');
                    img.src = imageSrc;
                    lastCard.appendChild(img);

                    setTimeout(() => {
                        img.style.display = 'block';
                    }, (index + 1) * 400);
                    setTimeout(() => {
                        if (index == images.length - 1) {
                            lastCard.style.backgroundImage = `url("${imageSrc}")`;
                            lastCard.style.backgroundSize = 'cover';
                            lastCard.style.filter = 'blur(1px)';
                            lastCard.style.backgroundPosition = 'center';
                        }
                        lastCard.removeChild(img);
                    }, (index + 1) * 400 + 400);
                });
                setTimeout(() => showText(), 5400);
            }
        }, false);
    }
}

function showText() {
    const text = document.querySelector('.text');
    text.style.opacity = '1';
    text.style.zIndex = '2';
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
    }, 600);
}

initGame();