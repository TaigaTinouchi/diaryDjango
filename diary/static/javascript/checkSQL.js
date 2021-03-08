const getSQL = document.getElementById("getSQL")
//SQLiteにGET
function getData(dataPath,pk){
  let xhr = new XMLHttpRequest();
  xhr.onload = ()=>{
    const response = xhr.responseText;
  });
  request.open('GET',dataPath,true);
  request.send();
}

getData("{% url getSQL/ %}");
