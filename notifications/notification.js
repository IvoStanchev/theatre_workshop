// const elements = {
//   info: document.querySelector('#infoBox'),
//   error: document.querySelector("#errorBox"),
//   loading: document.querySelector('#loadingBox')
// };

//elements.info.addEventListener('click', hideInfo);
// elements.error.addEventListener("click", hideError);

// export function showInfo(message) {
//     elements.info.children[0].textContent = message;
//     elements.info.style.display = 'block';

//     setTimeout(hideInfo, 3000);
// }

// function showError(message) {
//   elements.error.children[0].textContent = message;
//   elements.error.style.display = "block";
// }

let requests = 0;
let notify = false;

function beginRequest() {
  requests++;
  notify = true;
}

function endRequest() {
  requests--;
  if (requests === 0) {
    notify = false;
  }
}

// function hideInfo() {
//     elements.info.style.display = 'none';
// }

// function hideError() {
//   elements.error.style.display = "none";
// }

module.exports.showError = showError;
module.exports = beginRequest;
module.exports = endRequest;

// module.exports.registerValidation = registerValidation;
// module.exports.loginValidation = loginValidation;
