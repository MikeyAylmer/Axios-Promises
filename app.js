function wait3Seconds() {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 3000)
    })
}

wait3Seconds()
    .then(() => console.log("ALL DONE!"))
    .catch(() => console.log("ERROR!"))

// Above is a function that mimicks standard JavaScript Promises.

const h1 = document.querySelector('h1')
// setTimeout(() => {
//     h1.style.color = 'red'
//     setTimeout(() => {
//         h1.style.color = 'blue'
//     }, 1000)
// }, 1000)
// Above is an example of nested setTimeouts to change an h1 color.

function changeColor(el, color) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            el.style.color = color;
            resolve()
        }, 1000)
    })
}

changeColor(h1, 'red')
    .then(() => changeColor(h1, 'yellow'))
    .then(() => changeColor(h1, 'orange'))
    .then(() => changeColor(h1, 'green'))
    .then(() => changeColor(h1, 'blue'))
// Above is the same color changing code for an h1 but its been refactored alot cleaner then the nested code.

// let fourPokemonPromises = [];

// for (let i = 1; i < 5; i++) {
//     fourPokemonPromises.push(
//         axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
//     );
// }

// Promise.all(fourPokemonPromises)
//     .then(pokemonArr => (
//         console.log(pokemonArr)
//     ))
//     .catch(err => console.log(err));
// Above is code example of Promise.all()

// let fourPokemonRace = [];

// for (let i = 1; i < 5; i++) {
//     fourPokemonRace.push(
//         axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
//     );
// }

// Promise.race(fourPokemonRace)
//     .then(res => {
//         console.log(`${res.data.name} won the race!`)
//     })
//     .catch(err => console.log(err))
// Above is an example of Promise.race()

// Homework Answers below

// Part 1:
let url = "http://numbersapi.com/4"
let favoriteNumberPromise = axios.get(url);
favoriteNumberPromise.then(res => console.log(res.data))
// Answer 1 ^^
let multipleNums = [];
for (let i = 1; i < 5; i++) {
    multipleNums.push(
        axios.get(`http://numbersapi.com/4${i}`)
    );
}
Promise.all(multipleNums)
    .then(res => {
        res.forEach(res => {
            console.log(res.data)
        })
    })
    .catch(err => console.log(err))
// Answer 2 ^^
let favNumber = 4;
let baseURL = "http://numbersapi.com";

async function part3() {
    let facts = await Promise.all(
        Array.from({ length: 4 }, () => axios.get(`${baseURL}/${favNumber}`))
    );
    facts.forEach(data => {
        $('body').append(`<p>${data.data}</p>`);
    });
}
part3();
// Answer 3 ^^

// Part 2:
let bassURL = 'https://deckofcardsapi.com/api/deck';

async function newCard() {
    try {
        let response = await axios.get(`${bassURL}/new/draw/`);
        let { suit, value } = response.data.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    } catch (error) {
        console.error(error);
    }
}
newCard();
// Answer 1 ^^
async function twoNewCards() {
    try {
        let firstCardData = await axios.get(`${bassURL}/new/draw/`);
        let deckid = firstCardData.data.deck_id;
        let secondCardData = await axios.get(`${bassURL}/${deckid}/draw/`);
        [firstCardData, secondCardData].forEach(res => {
            let { suit, value } = res.data.cards[0];
            console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
        });
    } catch (error) {
        console.error(error);
    }
}
twoNewCards();
// Answer 2 ^^
// async function drawCards() {
//     let $btn = $('button');
//     let $cardArea = $('#card-area');

//     let deckData = await axios.get(`${bassURL}/new/shuffle/`);
//     $btn.show().on('click', async function () {
//         let cardData = await axios.get(`${bassURL}/${deckData.data.data_id}/draw/`);
//         let cardSrc = cardData.data.cards[0].image;
//         $cardArea.append(
//             $('<img>', {
//                 src: cardSrc
//             })
//         );
//         if (cardData.remaining === 0) $btn.remove();
//     });
// }
// drawCards()
$(document).ready(function () {
    async function drawCard() {
        try {
            let $btn = $('button');
            let $cardArea = $('#card-area');

            let deckData = await axios.get(`${bassURL}/new/shuffle/`);
            $btn.show().on('click', async function () {
                try {
                    let cardData = await axios.get(`${bassURL}/${deckData.data.deck_id}/draw/`);
                    let cardSrc = cardData.data.cards[0].image;
                    let angle = Math.random() * 90 - 45;
                    let randomX = Math.random() * 40 - 20;
                    let randomY = Math.random() * 40 - 20;
                    $cardArea.append(
                        $('<img>', {
                            src: cardSrc,
                            css: {
                                transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                            }
                        })
                    );
                    if (cardData.data.remaining === 0) $btn.remove();
                } catch (error) {
                    console.error("Card Draw Error:", error);
                }
            });
        } catch (error) {
            console.error("Deck Shuffle Error:", error);
        }
    }

    drawCard();
});
// Answer 3 ^^









