var pcs = pcs || {};

pcs.messagebox = (function () {
    "use strict";

    var messageButton = getId('messageButton');
    var modalDiv;
    var moveOverNextMsg = 0;
    var msgBoxzIndex = 1;
    var isModal = false;


    function createElement(type) {
        return document.createElement(type);
    }

    function getId(id) {
        return document.getElementById(id);
    }

    function modal() {
        modalDiv = createElement("div");

        document.body.appendChild(modalDiv);

        modalDiv.style.width = '100%';
        modalDiv.style.height = '100%';
        modalDiv.style.backgroundColor = 'lightgray';
        modalDiv.style.opacity = '.5';
        modalDiv.style.position = 'absolute';
        modalDiv.style.top = 0;
        modalDiv.style.zIndex = 25;
    }

    function show(msg, buttons) {

        moveOverNextMsg += 50;

        var div = createElement("div");
        var span = createElement("span");
        var buttonDiv = createElement("div");
        var okButton = createElement("button");
        if (buttons) {
            buttons.forEach(function (element) {
                var button = createElement('button');
                buttonDiv.appendChild(button);
                button.innerHTML = element;
            });
        }

        span.innerHTML = msg;
        div.appendChild(span);
        okButton.innerHTML = "OK";
        buttonDiv.appendChild(okButton);
        div.appendChild(buttonDiv);
        document.body.appendChild(div);

        div.style.backgroundColor = 'lightblue';
        div.style.padding = '20px';
        div.style.width = '400px';
        div.style.height = '100px';
        div.style.border = '1px solid blue';
        div.style.position = 'absolute';
        div.style.left = '50%';
        div.style.top = '50%';
        div.style.marginLeft = '' + (-250 + moveOverNextMsg) + 'px';
        div.style.marginTop = '' + (-100 + moveOverNextMsg) + 'px';
        div.style.boxSizing = 'border-box';
        div.style.display = 'inline-block';
        if (isModal) {
            div.style.zIndex = 50;
        }

        buttonDiv.style.position = 'absolute';
        buttonDiv.style.bottom = '6px';
        buttonDiv.style.textAlign = 'center';
        buttonDiv.style.width = '100%';
        buttonDiv.style.marginLeft = '-20px';

        okButton.addEventListener("click", function () {
            document.body.removeChild(div);
            if (isModal) {
                document.body.removeChild(modalDiv);
                isModal = false;
            }

            moveOverNextMsg -= 50;
        });

        div.addEventListener('click', function () {

            div.style.zIndex = 50 + msgBoxzIndex++;
        });

        buttonDiv.addEventListener('click', function () {
            whichButton(event, buttons);
        });

    }

    function whichButton(event, buttons) {

        buttons.forEach(function (element) {
            if (event.target.innerHTML === element) {
                console.log("The", element, "button was clicked");
            }
        });
    }

    messageButton.addEventListener('click', function () {

        if (getId('checkbox').checked) {
            isModal = true;
            modal();
        }
        var buttons = ['Test', 'Cancel', 'Hello'];
        show(getId('message').value, buttons);


    });

    return {
        show: show,
        modal: modal
    };
}());