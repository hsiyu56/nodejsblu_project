//用AJAX調用後臺資料
function getdata() {
    var req = new XMLHttpRequest();
    var url = '/nurse';

    req.open('POST', url, true);
    req.addEventListener('load',onLoad);
    req.addEventListener('error',onError);

    req.send();
}

function onLoad() {
    var response = this.responseText;
    var parsedResponse = JSON.parse(response);

    // access your data newly received data here and update your DOM with appendChild(), findElementById(), etc...
    var messageToDisplay = parsedResponse['username'];
    console.log(messageToDisplay);
    // append child (with text value of messageToDisplay for instance) here or do some more stuff
}

function onError() {
    // handle error here, print message perhaps
    console.log('error receiving async AJAX call');
  }