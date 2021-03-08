//エレメント定義
const mainTable = document.getElementById('mainTable');
const modal = document.getElementById("modal");
const inputForm = document.getElementById("inputForm");
const date = document.getElementById("date");
const saveBtn = document.getElementById("saveBtn");
const modalClose = document.getElementById("modalClose");
let startHour = document.getElementById("startHour");
let startMinutes = document.getElementById("startMinutes");
let endHour = document.getElementById("endHour");
let endMinutes = document.getElementById("endMinutes");
//表作成
function getCsvData(dataPath){
  const request = new XMLHttpRequest();
  request.addEventListener('load',(event) =>{
    const response = event.target.responseText;
    let tableArray = csvToArray(response);
    let tableData = convertArray(tableArray);
    mainTable.appendChild(tableData);
  });
  request.open('GET',dataPath,true);
  request.send();
}

function csvToArray(data){
  let dataArray = [];
  let instantArray = data.split('|');
  let day = new Date();
  let year = day.getFullYear();
  let month = day.getMonth();
  const monthEng = ["Jan.","Feb.","Mar.","Apr.","May","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."]
  // 月の最後の日を取得
  let endDate = new Date(year, month,  0)
  instantArray.forEach((tr,index)=>{
    if(index>endDate+2){
      //空文
    }else{
      dataArray[index] = tr.split(',');
    }
  });
  dataArray[0][0] = monthEng[month];
  return dataArray;
}

function convertArray(tableArray){
  let table = document.createElement('table');
  tableArray.forEach((trArray,rowNum)=>{
    let tr = document.createElement('tr');
    trArray.forEach((tdData,cellNum)=>{
      if(rowNum===0){//0行目
        let th = document.createElement('th');
        th.textContent = tdData;
        tr.appendChild(th);
      }else{//1行目以降
        if(cellNum===0){//日付部分をボタンにする
          let td = document.createElement('td');
          let dayButton = document.createElement('button');
          dayButton.type = 'button';
          dayButton.className = "btn btn-outline-secondary";
          dayButton.textContent = tdData;
          dayButton.addEventListener('click', (e)=>{
            //日付ボタンクリック時の処理
            let dayNum = document.createElement("div");
            dayNum.textContent = "day"+tdData;
            dayNum.id = "daySelect";
            dayNum.className =  "text-center p-3 border bg-light";
            //のちに消したいのでエレメントとして定義しておく
            let daySelect = document.getElementById("daySelect");
            date.appendChild(dayNum);
            let dayToPython = document.createElement("output");
            dayToPython.setAttribute("name","date");
            dayToPython.setAttribute("type","hidden");
            dayToPython.setAttribute("value",tdData);
            date.appendChild(dayToPython);
            //modal表示
            modal.style.display = 'block';
          });
          td.appendChild(dayButton);
          tr.appendChild(td);
        }else{//時間部分の設定
          tdData = tdData.split('%');
          //セルの内容によって表示を変更
          let td = document.createElement('td');
          if(tdData[0] === 'null'){//何も設定されていない場合
            //空文
          }else if(tdData[0] === 'red'){//指定色が'red'
            td.className = "table-danger";
            td.textContent = tdData[1];
          }else if(tdData[0] === 'gray'){//指定色が'gray'
            td.className = "table-secondary";
            td.textContent = tdData[1];
          }else if(tdData[0] === 'blue'){//指定色が'blue'
            td.className = "table-primary";
            td.textContent = tdData[1];
          }else if(tdData[0] === 'yellow'){//指定色が'yellow'
            td.className = "table-warning";
            td.textContent = tdData[1];
        }
          tr.appendChild(td);
        }
      }
    });
    table.appendChild(tr);//tableにtr追加
  });
  return table;
}

//フォーム関連関数
function swch(sh,hm,eh,em){

}

//テーブル作成実行
//getCsvData("{% static "csv/diary.csv" %}");//DjangoにおけるURLが欲しい

//各種ボタン設定
//modalを閉じるボタン
modalClose.addEventListener('click',(e)=>{
  daySelect.remove();
  modal.style.display = 'none';
});
//SAVEボタン
saveBtn.addEventListener('click',(e)=>{

  modal.style.display = 'none';
  inputForm.submit();
  daySelect.remove();
  saveInputData(startHour,startMinutes,endHour,endMinutes,dates);
});
