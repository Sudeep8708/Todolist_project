var count;
let add = document.querySelector(".add");
add.addEventListener("click",attach);

window.onload = function(){
  const check = document.getElementById('num').innerHTML;
  if(check==0){
    let cont = document.querySelector(".list");
    const img = document.createElement("img");
  img.src = "cycling.jpg";
  var h2 = document.createElement("h2");
  h2.classList.add('done_h2');
  h2.innerText = "You're all done ! Congrats ! Way to Go..!";
  cont.appendChild(img);
  cont.appendChild(h2);
  }
}

function attach()
{
    var count = document.getElementById('num').innerHTML;
    count++;
    document.getElementById('num').innerHTML = count;
    let cont = document.querySelector(".list");
    let title = document.getElementById("title").value;
    let task = document.getElementById("task").value;


    let newone = document.createElement("div");
    newone.classList.add("elem");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";


    let titlevalue = document.createElement("p");
    titlevalue.classList.add("title");
    titlevalue.innerText = title;


    let desvalue = document.createElement("p");
    desvalue.innerText = task;
    desvalue.classList.add('description');


    newone.appendChild(checkbox);
    newone.appendChild(titlevalue);
    newone.appendChild(desvalue);

    cont.append(newone);

}

var chckbxs = document.querySelectorAll("input[type='checkbox']");

for (var i = 0; i < chckbxs.length; i++) {
  var b = "box"+i;
  chckbxs[i].classList.add(b);
  document.querySelector('.'+b).addEventListener("click", (b) =>{
    var str = b.target.className;

    var title = document.querySelector('.'+str).nextElementSibling.innerHTML;
    title = title.trim();
    console.log("The title:"+title,title.length);
    location.href = "/delete?title="+title;
  })
}

const sort_out = document.getElementById('sortprior');
sort_out.addEventListener('click', () =>{
  console.log('Hi');
  location.href = "/sort";
});

var elems = document.querySelectorAll(".elem");
var modal = document.querySelector('.modal');
var popdesc = document.getElementById('popdesc');
var poptitle = document.getElementById('poptitle');
var inptitle = document.getElementById('editt');
var inpdesc =   document.getElementById('editd');
var origintil = document.getElementById('origintil');
var origindesc = document.getElementById('origindes');
var priorText = document.getElementById('priorText');
var inpprior = document.querySelector('.inpprior');


for (var i = 0; i < elems.length; i++) {
  var b = "elem"+(i+1);
  elems[i].setAttribute('id',b);
  document.querySelector('#'+b).addEventListener('click',(b)=>{
    modal.style.display = 'block';
    let str = b.target.id;
    console.log(str);
    b = document.querySelector('#'+str);
    let title = b.querySelector('.title').innerHTML;
    let description = b.querySelector('.description').innerHTML;
    let pri = b.querySelector('.priority').id;

    poptitle.innerHTML = title;
    popdesc.innerHTML = description;
    priorText.innerHTML = pri;

    origintil.value= title.trim();
    origindesc.value = description.trim();

  });
}

function meant_for_closing(){

    modal.style.display = 'none';
    origintil.value = '';
    origindesc.value = '';
    inptitle.value = '';
    inpdesc.value = ''; inpprior.style.display = 'none';priorText.style.display = 'inline-block';
    inpdesc.style.display = 'none';inptitle.style.display = 'none';
    poptitle.style.display = 'block';popdesc.style.display = 'block';
    document.querySelector('.editdiv').style.borderColor = 'lightgrey';
    
}

document.querySelector(".close").addEventListener('click',() =>{
  if((origintil.value!=inptitle.value) || (origindesc.value !=inpdesc.value))
      {
          document.querySelector('.continue').style.display = 'block';
      }
      else{meant_for_closing();}
});
document.querySelector("#cancel").addEventListener('click',meant_for_closing);


function edit(){
  /*priorText.style.display = 'none';*/
  inpprior.style.display = 'inline-block';
  poptitle.style.display ='none';
  popdesc.style.display = 'none';
  document.querySelector('.editdiv').style.borderColor = 'black';

  inptitle.style.display = 'block';
  inpdesc.style.display = 'block';
  inptitle.value = poptitle.innerHTML;
  inpdesc.value = popdesc.innerHTML;
}
document.querySelector('#poptitle').addEventListener('click', edit);
document.querySelector('#popdesc').addEventListener('click', edit);

window.onclick = function(e){
  if(e.target==modal){
    meant_for_closing();
  }
}
document.getElementById('fincancel').addEventListener('click',() =>{
  document.querySelector('.continue').style.display = 'none';
});
document.getElementById('exit').addEventListener('click',() =>{
  document.querySelector('.continue').style.display = 'none';
meant_for_closing();
});