// put all the functions that help
// the battle here and import them in
// const endTurn = () => {
//   console.log(`End Turn`);
// };

// const drawCard = (deck) => {
//   if (myEnergy >= 1) {
//     setMyHand([...myHand, deck[0]]);
//     setMyDeck(deck.slice(1));
//     // use energy
//     setMyEnergy(myEnergy - 1);
//   } else {
//     setAlert(`No Energy left, bro. Click "End Turn" ⬇`);
//   }
// };

// // draw your starting hand
// // drawCard(myDeck)

// const playCard = (card) => {
//   if (myEnergy >= card.cost) {
//     setEnemyHealth(enemyHealth - card.num);
//     const myHandIndex = myHand.indexOf(card);
//     const removedCard = myHand.splice(myHandIndex, 1);
//     // console.log(removedCard);
//     myDiscarded.push(removedCard);

//     setMyDiscarded(myDiscarded);
//     setMyHand(myHand);
//     setMyEnergy(myEnergy - card.cost);
//     setAlert("");
//   } else {
//     setAlert(`No Energy left, bro. Click "End Turn" ⬇`);
//   }
//   // setMyHand([...myHand, { n: 1 }])
// };
