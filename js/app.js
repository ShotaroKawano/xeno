// rankと画像の紐付け
var cardDictionary = {
  1: '01_少年.png',
  2: '02_兵士.png',
  3: '03_占い師.png',
  4: '04_乙女.png',
  5: '05_死神.png',
  6: '06_貴族.png',
  7: '07_賢者.png',
  8: '08_精霊.png',
  9: '09_皇帝.png',
  10: '10_勇者.png'
};

// シャッフル関数
const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 変数宣言
var deck = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 10];
var p1Hand = [];
var p1Cemetery = [];
var cpHand = [];
var cpCemetery = [];
var deckIndex = 2;

// 山札をシャッフル
deck = shuffle(deck);

logAllInfo(1);

// cpHand.push(deck[0]);
// // $('#cp-hand .hand-cards').append('<li class="hand-card reverse"><img src="img/' + cardDictionary[deck[0]] + '" alt="' + deck[0] + '"></li>');
// $('#cp-hand .hand-cards').append('<li class="hand-card"><img src="img/' + cardDictionary[deck[0]] + '" alt="' + deck[0] + '"></li>');
// deck.shift();


// p1Hand.push(deck[0]);
// $('#p1-hand .hand-cards').append('<li class="hand-card"><img src="img/' + cardDictionary[deck[0]] + '" alt="' + deck[0] + '"></li>');
// // $('#p1-hand .hand-cards .hand-card:nth-child(1)').html('<img src="img/' + cardDictionary[deck[0]] + '" alt="' + deck[0] + '">');
// deck.shift();

// cpの手札
drawCard('cp', cpHand, deck);
// p1の手札
drawCard('p1', p1Hand, deck);


logAllInfo(2);

function drawCard(player, playerHand, deck) {
  playerHand.push(deck[0]);
  $('#' + player + '-hand .hand-cards').append('<li class="hand-card"><img src="img/' + cardDictionary[deck[0]] + '" alt="' + deck[0] + '"></li>');
  // $('#p1-hand .hand-cards .hand-card:nth-child(1)').html('<img src="img/' + cardDictionary[deck[0]] + '" alt="' + deck[0] + '">');
  deck.shift();
}


function logAllInfo(num) {
  console.log(num);
  console.log('deck = ' + deck);
  console.log('cpHand = ' + cpHand);
  console.log('p1Hand = ' + p1Hand);
  console.log('cpCemetery = ' + cpCemetery);
  console.log('p1Cemetery = ' + p1Cemetery);
}



// createDrawEvent('#draw-btn', '#p1-hand ul');
// function createDrawEvent(btnSelector, handSelector) {
//   // $('#draw-btn').on('click', function () {
//   $(btnSelector).on('click', function () {
//     p1Hand.push(deck[0]);
//     $(handSelector).append('<li class="card"><img src = "img/' + cardDictionary[deck[0]] + '" alt="' + deck[0] + '"></li>');
//     // index++;
//     deck.shift();
//     // $('#deck').html('残り' + deck.length + '枚');
//   });
// }

// $('#draw-btn4cp').on('click', function () {
//   cpHand.push(deck[0]);
//   // $('#cp-hand ul').append('<li class="card reverse"><img src = "img/' + cardDictionary[deck[0]] + '" alt="' + deck[0] + '"></li>');
//   $('#cp-hand ul').append('<li class="card"><img src = "img/' + cardDictionary[deck[0]] + '" alt="' + deck[0] + '"></li>');
//   // index++;
//   deck.shift();
//   // $('#deck').html('残り' + deck.length + '枚');
//   // console.log(deck.length - 1);
// });



// isEffectMode = false;
// // isWiseManMode = 0;
// isWiseManMode4me = 0;
// isWiseManMode4cp = 0;

// $(document).on('click', '#p1-hand ul .card', function () {
//   var rank = parseInt($(this).find('img').attr('alt'));
//   handIndex = p1Hand.indexOf(rank);
//   p1Hand.splice(handIndex, 1);

//   if (isEffectMode) {
//     // $(this).remove();
//     $('#p1-cemetery ul').append(this);
//     p1Cemetery.push(rank);
//     isEffectMode = false;
//   } else {
//     if (isWiseManMode4me >= 1) {
//       $(this).remove();
//       deck.push(rank);
//       deck = shuffle(deck);
//       isWiseManMode4me--;
//       console.log(isWiseManMode4me);
//       console.log(p1Cemetery);
//     } else {
//       cardEffect(rank, p1Cemetery, cpCemetery);
//       // $(this).remove();
//       $('#p1-cemetery ul').append(this);
//       p1Cemetery.push(rank);
//     }
//   }

//   // $(this).remove();

//   if (deck.length == 0) {
//     $('#game').html('ゲーム終了');
//     judge();
//   }
// });

// $(document).on('click', '#cp-hand ul .card', function () {
//   var rank = parseInt($(this).find('img').attr('alt'));
//   handIndex = cpHand.indexOf(rank);
//   cpHand.splice(handIndex, 1);

//   if (isEffectMode) {
//     // $(this).remove();
//     console.log(this);
//     $('#cp-cemetery ul').append(this);
//     console.log('koko');
//     cpCemetery.push(rank);
//     isEffectMode = false;
//   } else {
//     if(isWiseManMode4cp >= 1) {
//       $(this).remove();
//       deck.push(rank);
//       deck = shuffle(deck);
//       isWiseManMode4cp--;
//       console.log(isWiseManMode4cp);
//       console.log(cpCemetery);
//     } else {

//       cardEffect4cp(rank);

//       // handIndex = cpHand.indexOf(rank);
//       // cpHand.splice(handIndex, 1);
//       // $(this).remove();

//       $('#cp-cemetery ul').append(this);
//       cpCemetery.push(rank);

//       // cpだけの処理
//       // $('#cp-hand ul .card').addClass('reverse');
//     }
//   }

//   // $(this).remove();

//   if (deck.length == 0) {
//     $('#game').html('ゲーム終了');
//     judge();
//   }
// });


// // console.log($('#game'));
// // $('#game').html('終了');

// function judge(specialV = 0) {
//   console.log(specialV);
//   console.log(p1Hand[0]);
//   console.log(cpHand[0]);

//   if (specialV = 1) {
//     judgment = 'あなたの勝ち';
//   } else if (specialV = -1) {
//     judgment = 'あなたの負け';
//   } else {
//     if ((p1Hand[0] > cpHand[0])) {
//       judgment = 'あなたの勝ち';
//     } else if (p1Hand[0] == cpHand[0]) {
//       judgment = '引き分け';
//     } else if (p1Hand[0] < cpHand[0]){
//       judgment = 'あなたの負け';
//     }
//   }

//   $('#judgment').html(judgment);
// }


// var isProtected = false;

// // function cardEffect(rank, p1Cemetery, cpCemetery) {
// function cardEffect(rank) {
//   switch (rank) {

//     case 1:
//       // 引けないから無効とか作らねば
//       if (p1Cemetery.includes(1) || cpCemetery.includes(1)) {
//         isEffectMode = true;
//         $('#draw-btn4cp').trigger('click');
//         $('#cp-hand ul .card.reverse').removeClass('reverse');
//       } else {
//         alert('1枚目は効果を発動しません');
//       }
//       break;

//     case 2:
//       deducedRank = parseInt(window.prompt('相手が持っているカードを推理してください', ''));
//       if (cpHand.includes(deducedRank)) {
//         judge(1);
//       } else {
//         alert('残念');
//       }
//       break;

//     case 3:
//       $('#cp-hand ul .card.reverse').removeClass('reverse');
//       setTimeout(() => {
//         // $('#cp-hand ul .card').addClass('reverse');
//       }, 3000);
//       break;

//     case 4:
//       isProtected = true;
//       // 保留
//       break;

//     case 5:
//       isEffectMode = true;
//       $('#draw-btn4cp').trigger('click');
//       break;

//     case 6:
//       if (!(p1Cemetery.includes(6) || cpCemetery.includes(6))) {
//         $('#cp-hand ul .card.reverse').removeClass('reverse');
//         setTimeout(() => {
//           // $('#cp-hand ul .card').addClass('reverse');
//         }, 3000);
//       } else {
//         judge();
//       }
//       break;

//     case 7:
//       isWiseManMode4me = 2;
//       alert('次のターン3枚引けます');
//       break;

//     case 8:
//       temp = p1Hand[0];
//       p1Hand[0] = cpHand[0];
//       cpHand[0] = temp;
//       // $('#p1-hand ul').html('<li class="card reverse"><img src = "img/' + cardDictionary[p1Hand[0]] + '" alt="' + p1Hand[0] + '"></li>');
//       $('#p1-hand ul').html('<li class="card"><img src = "img/' + cardDictionary[p1Hand[0]] + '" alt="' + p1Hand[0] + '"></li>');
//       // $('#p1-hand ul').html('<li class="card reverse"><img src = "img/' + cardDictionary[p1Hand[0]] + '" alt="' + p1Hand[0] + '"></li>');
//       $('#cp-hand ul').html('<li class="card"><img src = "img/' + cardDictionary[cpHand[0]] + '" alt="' + cpHand[0] + '"></li>');
//       break;

//     case 9:
//       isEffectMode = true;
//       $('#draw-btn4cp').trigger('click');
//       // $(document).on('click', '#cp-hand ul .card reverse', function () {
//       $('#cp-hand ul .card.reverse').removeClass('reverse');
//       // });
//       break;

//     case 10:
//       alert('「英雄」のカードは場に出すことができません');
//       break;
//       // 捨てられときのは 捨てられたときのとこでつける

//     default:
//       break;
//   }


//   // 一瞬消えるけどp1Handだけ管理して毎回表示し直すのがシンプルだよな
// }


// // 効果捨ての関数が必要



// function cardEffect4cp(rank) {
//   switch (rank) {

//     case 1:
//       // 引けないから無効とか作らねば
//       if (p1Cemetery.includes(1) || cpCemetery.includes(1)) {
//         isEffectMode = true;
//         $('#draw-btn').trigger('click');
//         // $('#cp-hand ul .card.reverse').removeClass('reverse');
//         setTimeout(() => {
//           r = Math.ceil(Math.random() * 2);
//           some = $('#p1-hand ul .card:nth-child(' + r + ')').trigger('click');
//           some.trigger('click');
//         }, 3000);
//       } else {
//         alert('1枚目は効果を発動しません');
//       }
//       break;

//     case 2:
//       deducedRank = Math.ceil(Math.random() * 10);
//       alert('cpはあなたが' + deducedRank + 'を持っていると推理しました');
//       if (p1Hand.includes(deducedRank)) {
//         judge(-1);
//       } else {
//         alert('生き残りました');
//       }
//       break;

//     case 3:
//       alert('cpがあなたの手札' + p1Hand[0] + 'を確認しました');
//       // $('#cp-hand ul .card.reverse').removeClass('reverse');
//       // setTimeout(() => {
//         // $('#cp-hand ul .card').addClass('reverse');
//       // }, 3000);
//       break;

//     case 4:
//       isProtected = true;
//       // 保留
//       break;

//     case 5:
//       isEffectMode = true;
//       $('#draw-btn').trigger('click');
//       // $('#cp-hand ul .card.reverse').removeClass('reverse');
//       setTimeout(() => {
//         r = Math.ceil(Math.random() * 2);
//         some = $('#p1-hand ul .card:nth-child(' + r + ')').trigger('click');
//         some.trigger('click');
//       }, 3000);
//       break;

//     case 6:
//       if (!(p1Cemetery.includes(6) || cpCemetery.includes(6))) {
//         alert('cpがあなたの手札' + p1Hand[0] + 'を確認しました');
//         // $('#cp-hand ul .card.reverse').removeClass('reverse');
//         // setTimeout(() => {
//         //   $('#cp-hand ul .card').addClass('reverse');
//         // }, 3000);
//       } else {
//         judge();
//       }
//       break;

//     case 7:
//       alert('次のターン3枚引けます');
//       isWiseManMode4cp = 2;
//       break;

//     case 8:
//       temp = p1Hand[0];
//       p1Hand[0] = cpHand[0];
//       cpHand[0] = temp;
//       $('#p1-hand ul').html('<li class="card reverse"><img src = "img/' + cardDictionary[p1Hand[0]] + '" alt="' + p1Hand[0] + '"></li>');
//       $('#cp-hand ul').html('<li class="card reverse"><img src = "img/' + cardDictionary[cpHand[0]] + '" alt="' + cpHand[0] + '"></li>');
//       break;

//     case 9:
//       isEffectMode = true;
//       $('#draw-btn').trigger('click');
//       // $('#cp-hand ul .card.reverse').removeClass('reverse');
//       setTimeout(() => {
//         r = Math.ceil(Math.random() * 2);
//         some = $('#p1-hand ul .card:nth-child(' + r + ')').trigger('click');
//         some.trigger('click');
//       }, 3000);
//       // $('#draw-btn').trigger('click');
//       // $(document).on('click', '#cp-hand ul .card reverse', function () {
//       // $('#cp-hand ul .card.reverse').removeClass('reverse');
//       // });
//       break;

//     case 10:
//       alert('「英雄」のカードは場に出すことができません');
//       break;
//     // 捨てられときのは 捨てられたときのとこでつける

//     default:
//       break;
//   }


//   // 一瞬消えるけどp1Handだけ管理して毎回表示し直すのがシンプルだよな
// }
