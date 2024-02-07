"strict";
//variable
const qrText = document.getElementById("qrText");
const history = document.getElementById("history");
const imgBtn = document.getElementById("imgbutton");
const qrImg = document.getElementById("qrImg");
const sampleQr = document.getElementById("sample-qr");
const downloadBtn = document.getElementById("downloadBtn");
const loader = document.getElementById("loader");

//all functions

//spinnder
function showLoader() {
  loader.style.display = "block";
}
function hideLoader() {
  loader.style.display = "none";
}

//reset everything functions
function reset() {
  sampleQr.classList.add("remove_qr");
  qrText.value = "";
  downloadBtn.style.display = "block";
}
//code generater
function generateQRCode() {
  if (qrText.value.length > 0) {
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrText.value}`;
    qrImg.style.opacity = 1;
    reset();
  } else {
    alert("Opps! You didn't write anything 😑");
  }
}
// action button
function action() {
  qrImg.src = "";
  downloadBtn.style.display = "none";
  sampleQr.classList.add("remove_qr");

  showLoader();
  setTimeout(() => {
    generateQRCode();
    hideLoader();
  }, 500);
}

imgBtn.addEventListener("click", action);
qrText.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    qrImg.style.opacity = 0;
    action();
  }
});
// Event listener for download button click
downloadBtn.addEventListener("click", function () {
  const downloadLink = document.createElement("a");
  downloadLink.href = qrImg.src;
  downloadLink.download = "qr_code.png";
  document.body.appendChild(downloadLink);
  downloadLink.click();
});

// add date in footer
const currentDate = new Date();
const footer = document.getElementById("footer");
footer.innerHTML = `&copy ${currentDate.getFullYear()} QR-MKR. JR<i class="fa-solid fa-bolt"></i>`;
