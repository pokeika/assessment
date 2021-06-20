(function(){
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

    function removeAllChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    assessmentButton.onclick = function() {
        const userName = userNameInput.value;
        if(userName.length === 0) {
            return;
        }

        //診断結果表示エリアの作成
        removeAllChildren(resultDivided);
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        //TODO ツイートエリアを作成
        removeAllChildren(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&text=' + result;
        anchor.setAttribute('href',hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.innerText = 'Tweet #あなたのいいところ';
        tweetDivided.appendChild(anchor);
        /*&ref_src=twsrc%5Etfw*/

        twttr.widgets.load();
    }

    const answers = [
      '{userName}声です',
      '{userName}まなざしです',
      '{userName}情熱です',
      '{userName}厳しさです',
      '{userName}知識です',
      '{userName}ユニークです',
      '{userName}用心深さです',
      '{userName}見た目です',
      '{userName}決断力です',
      '{userName}思いやりです',
      '{userName}感受性です',
      '{userName}節度です',
      '{userName}好奇心です',
      '{userName}気配りです',
      '{userName}その全てです',
      '{userName}自制心です',
      '{userName}優しさです',
    ];

    /**
     * 名前の文字列を渡すと診断結果を返す関数
     * @param {string} userName ユーザーの名前
     * @return {string} 診断結果
     */
    function assessment(userName){
        //全文字のコード番号を取得してそれを足し合わせる
        let sumOfcharCode = 0;
        for(let i = 0 ; i < userName.length ; i++){
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }

        //文字コード番号の合計を回答の数で割って添え字の数値を求める
        const index = sumOfcharCode % answers.length;
        let result = answers[index];

        result = result.replace(/{userName}/g,userName);

        return result;
    }
})();
