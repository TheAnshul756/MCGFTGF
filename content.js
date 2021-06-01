const innerHTML = `
  <div class="modal-content">
    <span class="close">&times;</span>
    <p>Some text in the Modal..</p>
    <ul id="sortable">
    </ul>
    <button id="submit" type="submit">Submit</button>
  </div>

`

console.log("Hello");
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
`
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

const closeSpan = document.querySelector('.close');
closeSpan.onclick = modalOff

// console.log(modal);

let arr1 = [];
let subjects = document.getElementsByClassName("freebirdFormviewerComponentsQuestionGridRowHeader");

$( "#sortable" ).sortable(
    {
        stop: function( event, ui ) 
        {
            var idsInOrder = $("#sortable").sortable('toArray', { attribute: 'data-id' });
            console.log(idsInOrder);
        }
    });

    // div.appsMaterialWizToggleRadiogroupEl.exportToggleEl.isActive.isCheckedNext

const btn = modal.querySelector("button");


btn.onclick = function() {
    var idsInOrder = $("#sortable").sortable('toArray', { attribute: 'data-id' });
    // const baap = subjects[i+1].parentElement
    let arr2 = [...arr1];
    for(let i = 0; i < arr1.length; i++) {
        arr2[parseInt(idsInOrder[i])] = i;
    }
    for(let i = 0; i < arr1.length; i++){
        let currNode = subjects[i+1]; 
        for(let j = 0; j < arr2[i] + 1; j++){
            currNode= currNode.nextSibling;
        }
        console.log(currNode);
        currNode = currNode.firstElementChild.firstElementChild;
        console.log(currNode);
        currNode.click();

    }
    modalOff();
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("Hello From content without if");
        if(request.greeting == "get-modal") {
            console.log("Hello From content via popup");
            arr1 = [];
            var num = (subjects.length / 2);
            for(let i = 1; i < num;i++) {
                arr1.push(subjects[i].textContent);
            }
            console.log(arr1);
            const ul = modal.querySelector('ul');
            ul.innerHTML="";
            for(let i = 0; i < arr1.length; i++){
                const li = document.createElement("li");
                li.textContent = arr1[i];
                li.setAttribute("data-id",i.toString());
                ul.appendChild(li);
            }            
            modalOn();
        }
    });

