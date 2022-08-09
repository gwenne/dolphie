import { drawResponse, selectedLanguage } from "./dolphie";

// function to send request to API and receive response
function apiProcessing(message) {
  //get selected language to use for the api request
  const lang = selectedLanguage();
  //api request details
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const apiDomain = "https://wsapi.simsimi.com";
  const path = "/190410/talk";
  const endpoint = proxy + apiDomain + path;
  const apiKey = process.env.DOLPHIE_APIKEY;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      utext: message,
      lang: lang,
    }),
  };

  function handleData(data) {
    drawResponse(data.atext);
  }

  fetch(endpoint, options)
    .then(turnResIntoObject)
    .then(handleData)
    .catch(handleError);
}

// handler for converting response from json to js object
function turnResIntoObject(res) {
  handleTokenError(res);
  return res.json();
}

// error handler
function handleError(error) {
  console.error(error);
}

// handler for 403 error - when there is no permission from the proxy
function handleTokenError(error) {
  if (error.status === 403) {
    const msgText =
      "You have not been permitted to use Dolphie. \n" +
      "Click OK to request access then refresh browser.";
    if (window.confirm(msgText)) {
      const url = "https://cors-anywhere.herokuapp.com/corsdemo";
      const windowName = "Token Permission Request";
      window.open(url, windowName, "height=300,width=800");
    }
  }
  return;
}

//test response only so I dont consume all the 100 api requests limit of the chatbot
function testResponseOnly() {
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const domain = "https://zenquotes.io";
  const path = "/api/random";
  const endpoint = proxy + domain + path;

  function handleData(data) {
    drawResponse(`${data[0].q} - ${data[0].a}`);
  }

  fetch(endpoint).then(turnResIntoObject).then(handleData).catch(handleError);
}

export { apiProcessing, testResponseOnly };
