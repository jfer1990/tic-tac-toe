

var divModal = document.createElement("div");
var divModalContent = document.createElement("div");
var divModalHeader = document.createElement("div");
var divModalBody = document.createElement("div");
var divModalFooter = document.createElement("div");
var divSpan = document.createElement("span");

divModal.id="myModal";
divModal.className="modal";
divModalContent.className="modal-content";
divModalHeader.className="modal-header";
divModalFooter.className="modal-footer";
divSpan.className="close";


divSpan.innerHTML= "&times;" 
divSpan.style.color="red";
divSpan.onclick =  function() {
    divModal.style.display = "none";
    window.location.reload();
    }

var headerText = document.createTextNode("");
var h2=document.createElement("h2");
h2.appendChild(headerText);
divModalHeader.appendChild(divSpan);
divModalHeader.appendChild(h2);


var bodyText = document.createTextNode("");
var p=document.createElement("p");
p.appendChild(bodyText);
divModalBody.appendChild(p);

var footerText = document.createTextNode("");
var h3=document.createElement("h3");
h3.appendChild(footerText);
divModalFooter.appendChild(h3);



divModalContent.appendChild(divModalHeader);
divModalContent.appendChild(divModalBody);
divModalContent.appendChild(divModalFooter);

divModal.appendChild(divModalContent);

    
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
function showModal(bodyText) {
    var body = document.getElementsByTagName("body")[0];
    var p = document.createElement("p");
    p.innerHTML=bodyText;
    divModalBody.appendChild(p);
    divModalBody.style.color="red";
    divModalBody.style.fontWeight ="bold";
    body.appendChild(divModal);
    divModal.style.display = "block";
    p.style.textAlign = "center";
}



// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == divModal) {
    divModal.style.display = "none";
    window.location.reload();
  }
}