"use script";
{
  const start = document.getElementById("start");
  const end = document.getElementById("end");
  const count = document.getElementById("count");
  const removeNum1 = document.getElementById("remove-num1");
  const removeNum2 = document.getElementById("remove-num2");
  const removeNum3 = document.getElementById("remove-num3");
  const removeNum4 = document.getElementById("remove-num4");
  const removeNum5 = document.getElementById("remove-num5");
  const settingBtn = document.getElementById("setting-btn");
  const resetBtn = document.getElementById("reset-btn");
  const result = document.getElementById("result");
  const lotteryBtn = document.getElementById("lottery-btn");
  const unlockBtn = document.getElementById("unlock");
  const allLotteryBtn = document.getElementById("allLottery-btn");
  const resultSave = document.getElementById("result-save");
  const download_csv = document.getElementById("download_csv");
  const removeAttendNum1 = document.getElementById("remove-attendNum1");
  const removeAttendNum2 = document.getElementById("remove-attendNum2");
  const removeAttendNum3 = document.getElementById("remove-attendNum3");
  const removeAttendNum4 = document.getElementById("remove-attendNum4");
  const removeAttendNum5 = document.getElementById("remove-attendNum5");
  const speedNum = document.getElementById("speed-num");
  const speedLabel = document.getElementById("speed-label");

  let data = ["\r\n", "座席番号", "出席番号", "\r\n"];
  let number = [];
  let numStart;
  let numEnd;
  let numCount;
  let reduceNumCount = 0;
  let removeNum;
  let removeNumber1;
  let removeNumber2;
  let removeNumber3;
  let removeNumber4;
  let removeNumber5;
  let removeAttendNumber1;
  let removeAttendNumber2;
  let removeAttendNumber3;
  let removeAttendNumber4;
  let removeAttendNumber5;
  let times = 1;
  let settingCheck = false;
  let unlockCheck = true;
  let displaySpeed;

  function removeNumber(removeCheck, num) {
    if ( removeCheck === -1 ) {
      return;
    } else {
      data.push(num, "", "\r\n");
      number.splice(removeNum, 1);
    }
  }

  function removeAttendCheck(times) {
    if ( times === removeAttendNumber1 || times === removeAttendNumber2 || times === removeAttendNumber3  || times === removeAttendNumber4  || times === removeAttendNumber5 ) {
      return true;
    } else {
      return false;
    }
  }

  function lottery() {
    if ( unlockCheck === true ) {

      unlockBtn.classList.add("unpressed");

      let j = Math.random() * number.length;
      result.value = number[Math.floor(j)];

      if ( numCount > 0 ){
        do {
          if ( removeAttendCheck(times) ) {
            times++;
          }
        } while ( removeAttendCheck(times) === true )

        const div = document.createElement("div");
        const result_p = document.createElement("p");
        const attendStr_p = document.createElement("p");
        const attendNum_p = document.createElement("p");
        resultSave.appendChild(div);
        result_p.textContent = result.value;
        attendStr_p.textContent = "出席番号";
        attendNum_p.textContent = times;
        div.appendChild(result_p);
        result_p.setAttribute("id","result-num");
        div.appendChild(attendStr_p);
        attendStr_p.setAttribute("id","attendence-number");
        div.appendChild(attendNum_p);
        attendNum_p.setAttribute("id","attend-num");
        data.push(Number(result.value), times, "\r\n");
        times++;
      } else {
        alert("これ以上抽選はできません");
        result.value = null;
        return;
      }

      number.splice(j,1);
      numCount--;

    } else {
      alert("unlockしてください");
      return;
    }

    unlockCheck = false;
  }

  function allLottery() {

    allLotteryBtn.classList.add("pressed");

      let display = function() {
        do {
          if ( removeAttendCheck(times) ) {
            times++;
          }
        } while ( removeAttendCheck(times) === true )

        let j = Math.random() * number.length;
        result.value = number[Math.floor(j)];
        const div = document.createElement("div");
        const result_p = document.createElement("p");
        const attendStr_p = document.createElement("p");
        const attendNum_p = document.createElement("p");
        resultSave.appendChild(div);
        result_p.textContent = result.value;
        attendStr_p.textContent = "出席番号";
        attendNum_p.textContent = times;
        div.appendChild(result_p);
        result_p.setAttribute("id","result-num");
        div.appendChild(attendStr_p);
        attendStr_p.setAttribute("id","attendence-number");
        div.appendChild(attendNum_p);
        attendNum_p.setAttribute("id","attend-num");
        div.animate({opacity: [0, 1]}, displaySpeed);
        data.push(Number(result.value), times, "\r\n");
        times++;
        number.splice(j,1);
        numCount--;
        let displayCheck = setTimeout(display, displaySpeed);
        if ( numCount < 1 ) {
          clearTimeout(displayCheck);
          allLotteryBtn.classList.remove("pressed");
        }
      }
      display();
    }

    function downloadCSV() {
      const filename = "download.csv";
      const bom = new Uint8Array( [ 0xef, 0xbb, 0xbf ] );  // BOMの付与（Excelでの文字化け対策）
      const blob = new Blob( [ bom, data ], { type: "text/csv" } );  // Blobでデータを作成する

      if ( window.navigator.msSaveBlob ) {  // IE10/11用（download属性が機能しないため，msSaveBlobを使用）
        window.navigator.msSaveBlob( blob, filename );
      } else {
        const url = ( window.URL || window.webkitURL ).createObjectURL(blob);  // blodからオブジェクトURLを作成
        const download = document.createElement("a");  // ダウンロード用にリンクを作成する
        download.href = url;  // リンク先に上記で作成したURLを指定する
        download.download = filename;  // download属性にファイル名を指定する
        download.click();  // 作成したリンクをクリックしてダウンロードを実行する
        ( window.URL || window.webkitURL ).revokeObjectURL(url);  // createObjectURLで作成したオブジェクトURLを開放する
      }
    }

  settingBtn.addEventListener("click", () => {

    numStart = Number( start.value );
    numEnd = Number( end.value );
    numCount = Number( count.value );
    removeNumber1 = Number( removeNum1.value );
    removeNumber2 = Number( removeNum2.value );
    removeNumber3 = Number( removeNum3.value );
    removeNumber4 = Number( removeNum4.value );
    removeNumber5 = Number( removeNum5.value );
    removeAttendNumber1 = Number( removeAttendNum1.value );
    removeAttendNumber2 = Number( removeAttendNum2.value );
    removeAttendNumber3 = Number( removeAttendNum3.value );
    removeAttendNumber4 = Number( removeAttendNum4.value );
    removeAttendNumber5 = Number( removeAttendNum5.value );
    displaySpeed = parseInt(speedNum.value);

    if ( numStart > numEnd ) {
      alert("最後の数は最初の数より大きくしてください");
      end.value = null;
      settingBtn.classList.remove("pressed");
      return;
    } else if ( numCount === 0 ) {
      alert("抽選回数を指定してください");
      settingBtn.classList.remove("pressed");
      return;
    } else if ( numCount > ( numEnd - numStart + 1 ) ) {
      alert(`抽選回数は最大で ${numEnd - numStart + 1} です`);
      count.value = null;
      settingBtn.classList.remove("pressed");
      return;
    } else if ( removeNumber1 != 0 && ( removeNumber1 < numStart || removeNumber1 > numEnd ) ) {
      alert("除く数の１番めを指定した範囲内の数字にしてください");
      removeNum1.value = null;
      settingBtn.classList.remove("pressed");
      return;
    } else if ( removeNumber2 != 0 && ( removeNumber2 < numStart || removeNumber2 > numEnd ) ) {
      alert("除く数の２番めを指定した範囲内の数字にしてください");
      removeNum2.value = null;
      settingBtn.classList.remove("pressed");
      return;
    } else if ( removeNumber3 != 0 && ( removeNumber3 < numStart || removeNumber3 > numEnd ) ) {
      alert("除く数の３番めを指定した範囲内の数字にしてください");
      removeNum3.value = null;
      settingBtn.classList.remove("pressed");
      return;
    } else if ( removeNumber4 != 0 && ( removeNumber4 < numStart || removeNumber4 > numEnd ) ) {
      alert("除く数の４番めを指定した範囲内の数字にしてください");
      removeNum4.value = null;
      settingBtn.classList.remove("pressed");
      return;
    } else if ( removeNumber5 != 0 && ( removeNumber5 < numStart || removeNumber5 > numEnd ) ) {
      alert("除く数の５番めを指定した範囲内の数字にしてください");
      removeNum5.value = null;
      settingBtn.classList.remove("pressed");
      return;
    } else if ( settingCheck === false ) {
      for (let i = numStart; i <= numEnd; i++) {
        number.push(i);
      }
      settingBtn.classList.add("pressed");
      settingCheck = true;
    } else {
      return;
    }

    if ( removeNumber1 != 0 ) {
      removeNum = number.indexOf( removeNumber1 );  // indexOfで配列の何番目に取り除く数があるのかを調べている
      removeNumber(removeNum, removeNumber1);
      reduceNumCount++;
    }
    if ( removeNumber2 != 0 ) {
      removeNum = number.indexOf( removeNumber2 );
      removeNumber(removeNum, removeNumber2);
      reduceNumCount++;
    }
    if ( removeNumber3 != 0 ) {
      removeNum = number.indexOf( removeNumber3 );
      removeNumber(removeNum, removeNumber3);
      reduceNumCount++;
    }
    if ( removeNumber4 != 0 ) {
      removeNum = number.indexOf( removeNumber4 );
      removeNumber(removeNum, removeNumber4);
      reduceNumCount++;
    }
    if ( removeNumber5 != 0 ) {
      removeNum = number.indexOf( removeNumber5 );
      removeNumber(removeNum, removeNumber5);
      reduceNumCount++;
    }

    if ( numCount > (numEnd - numStart + 1 - reduceNumCount) ) {
      numCount = numEnd - numStart + 1 - reduceNumCount;
      alert(`抽選回数が正しくなかったため，抽選回数を${numCount}に訂正しました。`);
    }

    unlockBtn.addEventListener("click", () => {
      unlockCheck = true;
      unlockBtn.classList.remove("unpressed");
    });

    lotteryBtn.addEventListener("click", lottery, false);
    allLotteryBtn.addEventListener("click", allLottery, false);
    download_csv.addEventListener("click", downloadCSV, false);
  });

  resetBtn.addEventListener("click", () => {
    start.value = null;
    end.value = null;
    count.value = null;
    result.value = null;
    do {
      resultSave.removeChild(resultSave.children[1]);
    } while (resultSave.children[1] != null )
    number = [];
    removeNum = null;
    removeNum1.value = null;
    removeNum2.value = null;
    removeNum3.value = null;
    removeNum4.value = null;
    removeNum5.value = null;
    removeAttendNum1.value = null;
    removeAttendNum2.value = null;
    removeAttendNum3.value = null;
    removeAttendNum4.value = null;
    removeAttendNum5.value = null;
    speedNum.value = 800;
    speedLabel.textContent = speedNum.value;
    data = ["\r\n", "座席番号", "出席番号", "\r\n"];
    times = 1;
    reduceNumCount = 0;
    lotteryBtn.removeEventListener("click", lottery, false);
    allLotteryBtn.removeEventListener("click", allLottery, false);
    download_csv.removeEventListener("click", downloadCSV, false);
    unlockCheck = true;
    unlockBtn.classList.remove("unpressed");
    settingCheck = false;
    settingBtn.classList.remove("pressed");
  });


  settingBtn.addEventListener("mousedown", () => {
    settingBtn.classList.add("pressed");
  });
  resetBtn.addEventListener("mousedown", () => {
    resetBtn.classList.add("pressed");
  });
  resetBtn.addEventListener("mouseup", () => {
    resetBtn.classList.remove("pressed");
  });
  lotteryBtn.addEventListener("mousedown", () => {
    lotteryBtn.classList.add("pressed");
  });
  lotteryBtn.addEventListener("mouseup", () => {
    lotteryBtn.classList.remove("pressed");
  });
  speedNum.addEventListener("change", () => {
    speedLabel.textContent = speedNum.value;
  });

}

$(function() {

  // https://css-tricks.com/snippets/jquery/smooth-scrolling/ を利用　スムーズなスクロールのアニメーションができる
  // Select all links with hashes
$('a[href*="#"]')
// Remove links that don't actually link to anything
.not('[href="#"]')
.not('[href="#0"]')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
    &&
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 500);
    }
  }
});


});