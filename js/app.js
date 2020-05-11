// 山札をシャッフル
deck = shuffle(deck);

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
