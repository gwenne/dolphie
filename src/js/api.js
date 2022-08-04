import { drawResponse, selectedLanguage } from "./dolphie";

// function to send request to API and receive response
function apiProcessing(message) {
  //get selected language to use for the api request
  const lang = selectedLanguage()
  //api request
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

function turnResIntoObject(res) {
  return res.json();
}

function handleData(data) {
  drawResponse(data.atext);
}

function handleError(error){
  console.error(error);
  alert(error);
}

fetch(endpoint, options).then(turnResIntoObject).then(handleData).catch(handleError);

}



//test response only so I dont consume all the 100 api requests limit of the chatbot
function testResponseOnly() {
const proxy = "https://cors-anywhere.herokuapp.com/";
const domain = "https://zenquotes.io";
const path = "/api/random";
const endpoint = proxy + domain + path;

function turnResIntoObject(res) {
  return res.json();
}

function handleData(data) {
  drawResponse(`${data[0].q} - ${data[0].a}`);
}

fetch(endpoint).then(turnResIntoObject).then(handleData);
  
}

export {apiProcessing, testResponseOnly};