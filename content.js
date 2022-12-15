const innerHTML = `
  <div class="modal-content">
    <span class="close">&times;</span>
    <br><br>
    <div id="scrollable">
    <ol id="sortable">
    </ol>
    </div>
    <button id="submit" type="submit">Submit</button>
  </div>

`;

const modalCSS = `
.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }
  
.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }
#scrollable{
    height:400px;
    overflow-y:auto;
}
  
  /* The Close Button */
  .close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
  #sortable {  margin:0; width: 60%; }
  #sortable li { margin: 0 5px 5px 5px; padding: 5px; font-size: 1.2em; height: 1.5em; }
  html>body #sortable li { height: 1.5em; line-height: 1.2em; }
  .ui-state-highlight { height: 1.5em; line-height: 1.2em; }
  #submit {
        text-align: center;
        border-radius: 40px;
        width: 100px;
        height: 40px;
        margin-left: 47%;
        margin-top: 20px;
    }

    #submit:hover {
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    }
  `;

  const style = document.createElement('style');
style.innerHTML = modalCSS;
var ref = document.querySelector('script');
ref.parentNode.insertBefore(style, ref);

const modal = document.createElement("div");
modal.className = "modal";
modal.innerHTML = innerHTML;
document.body.appendChild(modal);


const modalOn = function(){
    modal.style.display="block";
}

const modalOff = function(){
    modal.style.display="none";
}

const matrix2array = function (row, col, choices) {
  return choices * row + col;
}

const closeSpan = document.querySelector('.close');
closeSpan.onclick = modalOff

// console.log(modal);

let arr1 = [];
let subjects = [...document.querySelectorAll(".V4d7Ke.OIC90c:not(.wzWPxe)")];

$( "#sortable" ).sortable({
        placeholder: "ui-state-highlight"
    });
    $( "#sortable" ).disableSelection();

const btn = modal.querySelector("button");


btn.onclick = function () {
    var idsInOrder = $("#sortable").sortable('toArray', { attribute: 'data-id' });
    let arr2 = [...arr1];
    for(let i = 0; i < arr1.length; i++) {
        arr2[parseInt(idsInOrder[i])] = i;
    }
    
  let choices = arr2.length;
  let radios = document.querySelectorAll(".vd3tt");

    for (let i = 0; i < arr2.length; i++) {
      let row = i, col = arr2[i];
      radios[matrix2array(col, row, choices)].click();
    }
    modalOff();
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // console.log("Hello From content without if");
        if(request.greeting == "get-modal" && subjects.length > 2) {
            // console.log("Hello From content via popup");
            console.log(subjects.length);
            arr1 = [];
            var num = (subjects.length / 2);
            for (let i = 0; i < num; i++) {
                arr1.push(subjects[i].textContent);
            }
            const ul = modal.querySelector('ol');
            ul.innerHTML="";
            for(let i = 0; i < arr1.length; i++){
                const li = document.createElement("li");
                li.textContent = arr1[i];
                li.setAttribute("data-id",i.toString());
                li.className="ui-state-default";
                ul.appendChild(li);
            }            
            modalOn();
        }
        if(subjects.length <= 2) {
          alert('NOT VALID FORM!!!') 
        }
    });

