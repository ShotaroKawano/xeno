// モーダルウィンドウのtoggle
// $(function () {
//   $('.js-modal-open').on('click', function () {
//     $('.js-modal').fadeIn();
//     return false;
//   });
//   $('.js-modal-close').on('click', function () {
//     $('.js-modal').fadeOut();
//     return false;
//   });
// });



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



// ログ出力関数
function logInfo(num = 0) {

  console.log(num);
  console.log('deck = ' + deck);
  console.log('cpHand = ' + cpHand);
  console.log('p1Hand = ' + p1Hand);
  console.log('cpCemetery = ' + cpCemetery);
  console.log('p1Cemetery = ' + p1Cemetery);

}



// ドロー関数
function drawCard(who, whoseHand, deck) {

  // 山札が0枚なら勝敗を判定
  // 10を選んで山札0枚のとき手札2枚なのに勝負になってしまう
  // ここに置いたおかげで引けないときの効果も無効化できてるっぽい
  if (deck.length == 0) {
    alert('山札が0枚になった。数字が大きい方の勝ち。')
    judge();
  }

  if (who == 'cp') {
    whoseHand.push(deck[0]);
    $('#' + who + '-hand .hand-cards').append('<li class="hand-card reverse"><img src="img/' + cardDictionary[deck[0]] + '" alt="' + deck[0] + '"></li>');
    deck.shift();
  } else {
    whoseHand.push(deck[0]);
    $('#' + who + '-hand .hand-cards').append('<li class="hand-card"><img src="img/' + cardDictionary[deck[0]] + '" alt="' + deck[0] + '"></li>');
    deck.shift();
  }
  $('#cp-hand .hand-cards .hand-card').addClass('reverse');
  $('#p1-hand .hand-cards .hand-card').removeClass('reverse');
  $('.num-left').html('残り' + deck.length + ' 枚');

}



// ドローイベント追加関数
function createDrawEvent(who, whoseHand, btnSelector) {

  $(btnSelector).on('click', function () {
    drawCard(who, whoseHand, deck);
  });

}



// ジャッジ関数
function judge(specialV = 0) {
  $('#cp-hand .hand-cards .hand-card').removeClass('reverse');
  console.log(specialV);
  console.log(cpHand[0]);
  console.log(p1Hand[0]);

  if (specialV == 1) {
    judgment = 'あなたの勝ち';
  } else if (specialV == -1) {
    judgment = 'あなたの負け';
  } else {
    if ((p1Hand[0] > cpHand[0])) {
      judgment = 'あなたの勝ち';
    } else if (p1Hand[0] == cpHand[0]) {
      judgment = '引き分け';
    } else if (p1Hand[0] < cpHand[0]){
      judgment = 'あなたの負け';
    }
  }

  alert(judgment);
  // $('#msg').html(judgment);
}



// カードエフェクトフラグ
var isP1EffectMode = false;
var isCpEffectMode = false;
// 賢者モードフラグ
var isP1WiseManMode = 0;
var isCpWiseManMode = 0;
// 皇帝モード
var isP1EmperorMode = false;
var isCpEmperorMode = false;



// ディスカードイベント追加関数
// function createDiscardEvent(who, whoseHand, whoseCemetery, isWhoseEffectMode, isWhoseWiseManMode, deck) {
// isWhoseEffectMode, isWhoseWiseManMode を使用
function createDiscardEvent(who, whoseHand, whoseCemetery, deck) {

  $(document).on('click', '#' + who + '-hand .hand-cards .hand-card', function () {
    // クリックされたカードのランクとインデックス
    var cardRank = parseInt($(this).find('img').attr('alt'));
    handIndex = whoseHand.indexOf(cardRank);

    // cpの場合
    if (who == 'cp') {

      // カードエフェクで捨てる？
      if (isCpEffectMode) {
        // クリックされたカードを手札から削除
        whoseHand.splice(handIndex, 1);
        whoseCemetery.push(cardRank);
        // hand-card → cemetery-card
        $(this).removeClass('hand-card').addClass('cemetery-card');
        $('#' + who + '-cemetery .cemetery-cards').append($(this));
        isCpEffectMode = false;
        if (cardRank == 10) {
          // 皇帝に殺された場合
          if (isCpEmperorMode) {
            alert('『潜伏・転生』：『皇帝』に脱落させられた。');
            judge(-1);
          // それ以外の場合
          } else {
            alert('『潜伏・転生』：『皇帝』以外に脱落させられた時に『転生札』で復活する。');
            // 手札をすべて失う
            leftCardRank = cpHand[0];
            cpHand.splice(0, 1);
            whoseCemetery.push(leftCardRank);
            $('#cp-cemetery .cemetery-cards').append($('#cp-hand .hand-cards .hand-card').removeClass('hand-card').addClass('cemetery-card'));
            // $('#cp-cemetery .cemetery-cards').append($('#cp-hand .hand-cards .hand-card'));
            $('#cp-hand .hand-cards .hand-card').remove();
            cpHand.push(reincarnation);
            $('#cp-hand .hand-cards').append('<li class="hand-card reverse"><img src="img/' + cardDictionary[reincarnation] + '" alt="' + reincarnation + '"></li>');
            $('.deck .deck-cards .deck-card:nth-child(1)').css('transform', 'rotate(0deg)');
            $('.deck .deck-cards .deck-card:nth-child(1)').css('left', '0');
            isCpEmperorMode = false;
          }
        }
      } else {

        // 賢者モードによるドロー？
        if (isCpWiseManMode >= 1) {
          alert('選んだカードは山札に戻った。');
          // クリックされたカードを手札から削除
          whoseHand.splice(handIndex, 1);
          // 手札から非表示にして山札に加える
          $(this).remove();
          deck.push(cardRank);
          deck = shuffle(deck);
          $('.num-left').html('残り' + deck.length + ' 枚');
          // 戻すカード2枚をカウント
          isCpWiseManMode--;

        } else {
          // 10の場合はメッセージを表示して何も起こらない
          if (cardRank == 10) {
            alert('『潜伏・転生』：場に出すことができず、捨てさせられたら脱落する。『皇帝』以外に脱落させられた時に『転生札』で復活する。');
            // 10の場合はメッセージを表示して何も起こらない
          } else {
            // クリックされたカードを手札から削除
            whoseHand.splice(handIndex, 1);
            // カード効果を発動
            setTimeout(() => {
              // console.log(cpCemetery);
              cardEffect4cp(cardRank);
            }, 1000);
            // $('#cp-hand .hand-cards .hand-card').addClass('reverse');
            whoseCemetery.push(cardRank);
            // hand-card → cemetery-card
            $(this).removeClass('hand-card').addClass('cemetery-card');
            $('#' + who + '-cemetery .cemetery-cards').append($(this));
          }
        }
      }


    // p1の場合
    } else {

      // カードエフェクで捨てる？
      if (isP1EffectMode) {
        // クリックされたカードを手札から削除
        whoseHand.splice(handIndex, 1);
        whoseCemetery.push(cardRank);
        // hand-card → cemetery-card
        $(this).removeClass('hand-card').addClass('cemetery-card');
        $('#' + who + '-cemetery .cemetery-cards').append($(this));
        isP1EffectMode = false;
        if (cardRank == 10) {
          // 皇帝に殺された場合
          if (isP1EmperorMode) {
            alert('『潜伏・転生』：『皇帝』に脱落させられた。');
            judge(-1);
          // それ以外の場合
          } else {
            alert('『潜伏・転生』：『皇帝』以外に脱落させられた時に『転生札』で復活する。');
            // 手札をすべて失う
            leftCardRank = p1Hand[0];
            p1Hand.splice(0, 1);
            whoseCemetery.push(leftCardRank);
            // hand-card → cemetery-card
            $('#p1-cemetery .cemetery-cards').append($('#p1-hand .hand-cards .hand-card').removeClass('hand-card').addClass('cemetery-card'));
            $('#p1-hand .hand-cards .hand-card').remove();
            p1Hand.push(reincarnation);
            $('#p1-hand .hand-cards').append('<li class="hand-card reverse"><img src="img/' + cardDictionary[reincarnation] + '" alt="' + reincarnation + '"></li>');
            $('.deck .deck-cards .deck-card:nth-child(1)').css('transform', 'rotate(0deg)');
            $('.deck .deck-cards .deck-card:nth-child(1)').css('left', '0');
            isP1EmperorMode = false;
          }
        }
      } else {

        // 賢者モードによるドロー？
        if (isP1WiseManMode >= 1) {
          alert('選んだカードは山札に戻った。');
          // クリックされたカードを手札から削除
          whoseHand.splice(handIndex, 1);
          // 手札から非表示にして山札に加える
          $(this).remove();
          deck.push(cardRank);
          deck = shuffle(deck);
          $('.num-left').html('残り' + deck.length + ' 枚');
          // 戻すカード2枚をカウント
          isP1WiseManMode--;
        } else {

          // 10の場合はメッセージを表示して何も起こらない
          if (cardRank == 10) {
            alert('『潜伏・転生』：場に出すことができず、捨てさせられたら脱落する。『皇帝』以外に脱落させられた時に『転生札』で復活する。');
            // 10の場合はメッセージを表示して何も起こらない
          } else {
            // クリックされたカードを手札から削除
            whoseHand.splice(handIndex, 1);
            // カード効果を発動
            cardEffect4p1(cardRank);
            // $('#cp-hand .hand-cards .hand-card').addClass('reverse');
            whoseCemetery.push(cardRank);
            // hand-card → cemetery-card
            $(this).removeClass('hand-card').addClass('cemetery-card');
            $('#' + who + '-cemetery .cemetery-cards').append($(this));
          }
        }
      }
    }

    logInfo();
  });
}



// 守護モードフラグ
var isP1Protected = false;
var isCpProtected = false;

// エフェクト関数
// スコープ管理が曖昧なまま使用している変数
// deck, cpHand, isP1Protected, isCpEffectMode, isP1WiseManMode, p1Hand
function cardEffect4p1(cardRank) {
  switch (cardRank) {

    case 1:
      // 引けないから無効とか作らねば
      if (!(p1Cemetery.includes(1) || cpCemetery.includes(1))) {
        if (isCpProtected) {
          isCpProtected = false;
        }
        alert('『革命』：1枚目の捨て札は何の効果も発動しない。');
      } else {
        if (isCpProtected) {
          alert('相手は守られてる');
          isCpProtected = false;
        } else {
          alert('『公開処刑』：指名した相手に山札から1枚引かせて、手札を2枚とも公開させる。そしてどちらか1枚を指定し捨てさせる。');
          isCpEffectMode = true;
          $('#draw-btn4cp').trigger('click');
          $('#cp-hand .hand-cards .hand-card.reverse').removeClass('reverse');
        }
      }
      break;

    case 2:
      if (isCpProtected) {
        alert('相手は守られてる');
        isCpProtected = false;
      } else {
        deducedRank = parseInt(window.prompt('『捜査』：指名した相手の手札を言い当てると相手は脱落する。', ''));
        if (cpHand.includes(deducedRank)) {
          judge(1);
        } else {
          alert('残念。ハズレ。');
        }
      }
      break;

    case 3:
      if (isCpProtected) {
        alert('相手は守られてる');
        isCpProtected = false;
      } else {
        alert('『透視』：指名した相手の手札を見る。(3秒間)');
        $('#cp-hand .hand-cards .hand-card.reverse').removeClass('reverse');
        setTimeout(() => {
          $('#cp-hand .hand-cards .hand-card').addClass('reverse');
        }, 3000);
      }
      break;

    case 4:
      if (isCpProtected) {
        isCpProtected = false;
      }
      alert('『守護』：次の自分の手番まで自分への効果を無効にする。');
      isP1Protected = true;
      // 保留
      break;

    case 5:
      if (isCpProtected) {
        alert('相手は守られてる');
        isCpProtected = false;
      } else {
        alert('『疫病』：指名した相手に山札から1枚引かせる。2枚になった相手の手札を非公開にさせたまま、1枚を指定して捨てさせる。');
        isCpEffectMode = true;
        $('#draw-btn4cp').trigger('click');
        //
        // $('#cp-hand .hand-card reverse:nth-child(1)').before($('#cp-hand .hand-card reverse:nth-child(2)'));
      }
      break;

    case 6:
      if (isCpProtected) {
        alert('相手は守られてる');
        isCpProtected = false;
      } else {
        if (!(p1Cemetery.includes(6) || cpCemetery.includes(6))) {
          alert('『対面』：指名した相手と手札を見せ合う。');
          alert('相手はあなたの手札' + p1Hand[0] + 'を確認しました');
          $('#cp-hand .hand-cards .hand-card.reverse').removeClass('reverse');
          setTimeout(() => {
            $('#cp-hand .hand-cards .hand-card').addClass('reverse');
          }, 3000);
        } else {
          alert('『対決』：指名した相手と手札を見せ合い、数字の小さい方が脱落する。（見せ合う際は他のプレイヤーに見られないようにする）。');
          judge();
        }
      }
      break;

    case 7:
      if (isCpProtected) {
        isCpProtected = false;
      }
      alert('『選択』：次の手番で山札から１枚引くかわりに３枚引き、そのうち１枚を選ぶことができる。残り２枚は山札へ戻す。');
      isP1WiseManMode = 2;
      break;

    case 8:
      if (isCpProtected) {
        alert('相手は守られてる');
        isCpProtected = false;
      } else {
        alert('『交換』：指名した相手の手札と自分の持っている手札を交換する。');
        temp = p1Hand[0];
        p1Hand[0] = cpHand[0];
        cpHand[0] = temp;
        $('#p1-hand .hand-cards').html('<li class="hand-card"><img src = "img/' + cardDictionary[p1Hand[0]] + '" alt="' + p1Hand[0] + '"></li>');
        $('#cp-hand .hand-cards').html('<li class="hand-card reverse"><img src = "img/' + cardDictionary[cpHand[0]] + '" alt="' + cpHand[0] + '"></li>');
      }
      break;

    case 9:
      if (isCpProtected) {
        alert('相手は守られてる');
        isCpProtected = false;
      } else {
        alert('『公開処刑』：指名した相手に山札から1枚引かせて、手札を2枚とも公開させる。そしてどちらか1枚を指定し捨てさせる。');
        isCpEffectMode = true;
        $('#draw-btn4cp').trigger('click');
        $('#cp-hand .hand-cards .hand-card.reverse').removeClass('reverse');
        isCpEmperorMode = true;
      }
      break;

    case 10:
      alert('『潜伏・転生』：場に出すことができず、捨てさせられたら脱落する。『皇帝』以外に脱落させられた時に『転生札』で復活する。');
      break;
    // 捨てられときのは 捨てられたときのとこでつける

    default:
      alert('エラーが発生しました');
      break;
  }
  // 引けなければ効果なしとかも
}



// エフェクト関数
// スコープ管理が曖昧なまま使用している変数
// deck, cpHand, isP1Protected, isCpEffectMode, isP1WiseManMode, p1Hand
function cardEffect4cp(cardRank) {
  switch (cardRank) {

    case 1:
      // 引けないから無効とか作らねば
      if (!(p1Cemetery.includes(1) || cpCemetery.includes(1))) {
        if (isP1Protected) {
          isCpProtected = false;
        }
        alert('『革命』：1枚目の捨て札は何の効果も発動しない。');
      } else {
        if (isP1Protected) {
          alert('あなたは守られてる');
          isP1Protected = false;
        } else {
          alert('『公開処刑』：指名した相手に山札から1枚引かせて、手札を2枚とも公開させる。そしてどちらか1枚を指定し捨てさせる。');
          isP1EffectMode = true;
          $('#draw-btn4p1').trigger('click');
          setTimeout(() => {
            // triggerクリックじゃないと動かない箇所
            r = Math.ceil(Math.random() * 2);
            some = $('#p1-hand .hand-cards .hand-card:nth-child(' + r + ')').trigger('click');
            some.trigger('click');
          }, 3000);
        }
      }
      break;

    case 2:
      if (isP1Protected) {
        alert('あなたは守られてる');
        isP1Protected = false;
      } else {
        alert('『捜査』：指名した相手の手札を言い当てると相手は脱落する。');
        deducedRank = Math.ceil(Math.random() * 10);
        alert('相手はあなたが' + deducedRank + 'を持っていると推理しました');
        if (p1Hand.includes(deducedRank)) {
          judge(-1);
        } else {
          alert('ハズレたため、生き残りました');
        }
      }
      break;

    case 3:
      if (isP1Protected) {
        alert('あなたは守られてる');
        isP1Protected = false;
      } else {
        alert('『透視』：指名した相手の手札を見る。(3秒間)');
        alert('相手はあなたの手札' + p1Hand[0] + 'を確認しました');
      }
      break;

    case 4:
      if (isP1Protected) {
        isP1Protected = false;
      }
      alert('『守護』：次の自分の手番まで自分への効果を無効にする。');
      isCpProtected = true;
      // 保留
      break;

    case 5:
      if (isP1Protected) {
        alert('あなたは守られてる');
        isP1Protected = false;
      } else {
        alert('『疫病』：指名した相手に山札から1枚引かせる。2枚になった相手の手札を非公開にさせたまま、1枚を指定して捨てさせる。');
        isP1EffectMode = true;
        $('#draw-btn4p1').trigger('click');
        $('#p1-hand .hand-cards .hand-card').addClass('reverse');
        setTimeout(() => {
          r = Math.ceil(Math.random() * 2);
          some = $('#p1-hand .hand-cards .hand-card:nth-child(' + r + ')').trigger('click');
          some.trigger('click');
        }, 3000);
      }
      break;

    case 6:
      if (isP1Protected) {
        alert('あなたは守られてる');
        isP1Protected = false;
      } else {
        if (!(p1Cemetery.includes(6) || cpCemetery.includes(6))) {
          alert('『対面』：指名した相手と手札を見せ合う。');
          alert('相手はあなたの手札' + p1Hand[0] + 'を確認しました');
          $('#cp-hand .hand-cards .hand-card.reverse').removeClass('reverse');
          setTimeout(() => {
            $('#cp-hand .hand-cards .hand-card').addClass('reverse');
          }, 3000);
        } else {
          alert('『対決』：指名した相手と手札を見せ合い、数字の小さい方が脱落する。（見せ合う際は他のプレイヤーに見られないようにする）。');
          judge();
        }
      }
      break;



    case 7:
      if (isP1Protected) {
        isP1Protected = false;
      }
      alert('『選択』：次の手番で山札から１枚引くかわりに３枚引き、そのうち１枚を選ぶことができる。残り２枚は山札へ戻す。');
      isCpWiseManMode = 2;
      break;

    case 8:
      if (isP1Protected) {
        alert('あなたは守られてる');
        isP1Protected = false;
      } else {
        alert('『交換』：指名した相手の手札と自分の持っている手札を交換する。');
        temp = p1Hand[0];
        p1Hand[0] = cpHand[0];
        cpHand[0] = temp;
        $('#p1-hand .hand-cards').html('<li class="hand-card"><img src = "img/' + cardDictionary[p1Hand[0]] + '" alt="' + p1Hand[0] + '"></li>');
        $('#cp-hand .hand-cards').html('<li class="hand-card reverse"><img src = "img/' + cardDictionary[cpHand[0]] + '" alt="' + cpHand[0] + '"></li>');
      }
      break;

    case 9:
      if (isP1Protected) {
        alert('あなたは守られてる');
        isP1Protected = false;
      } else {
        alert('『公開処刑』：指名した相手に山札から1枚引かせて、手札を2枚とも公開させる。そしてどちらか1枚を指定し捨てさせる。');
        isP1EffectMode = true;
        $('#draw-btn4p1').trigger('click');
        setTimeout(() => {
          // 謎の挙動の箇所
          r = Math.ceil(Math.random() * 2);
          some = $('#p1-hand .hand-cards .hand-card:nth-child(' + r + ')').trigger('click');
          some.trigger('click');
        }, 3000);
        isP1EmperorMode = true;
      }
      break;

    case 10:
      alert('『潜伏・転生』：場に出すことができず、捨てさせられたら脱落する。『皇帝』以外に脱落させられた時に『転生札』で復活する。');
      break;
    // 捨てられときのは 捨てられたときのとこでつける

    default:
      alert('エラーが発生しました');
      break;
  }
}
