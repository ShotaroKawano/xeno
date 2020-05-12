// 山札をシャッフル
deck = shuffle(deck);
// 転生札を用意
var reincarnation = deck[deck.length - 1];
console.log(reincarnation);
deck.pop();

// cpの最初の手札
drawCard('cp', cpHand, deck);
// p1の最初の手札
drawCard('p1', p1Hand, deck);

// cpのドローイベント追加
createDrawEvent('cp', cpHand, '#draw-btn4cp');
// p1のドローイベント追加
createDrawEvent('p1', p1Hand,'#draw-btn4p1');

// cpのディスカードイベント追加
// createDiscardEvent('cp', cpHand, cpCemetery, isCpEffectMode, isCpWiseManMode, deck);
createDiscardEvent('cp', cpHand, cpCemetery, deck);
// p1のディスカードイベント追加
// createDiscardEvent('p1', p1Hand, p1Cemetery, isP1EffectMode, isP1WiseManMode, deck);
createDiscardEvent('p1', p1Hand, p1Cemetery, deck);



// $('#action-btn4cp').on('click', function () {
  // cpAction();
// });

// function cpAction() {
  // $('#draw-btn4cp').trigger('click');
  // setTimeout(() => {
    // triggerクリックじゃないと動かない箇所
    // r = Math.ceil(Math.random() * 2);
    // some = $('#cp-hand .hand-cards .hand-card:nth-child(' + r + ')').trigger('click');
    // some.trigger('click');
  // }, 3000);
// }
