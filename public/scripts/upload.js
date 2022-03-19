const displayVideoUpload = () => {
  let checkedType = document.querySelector(
    'input[name="video-option"]:checked'
  ).value;

  let optionUrlEl = document.getElementById("upload-type-url");
  let optionComputerEl = document.getElementById("upload-type-computer");
  if (checkedType == "computer") {
    optionComputerEl.classList.remove("hidden");
    if (!optionUrlEl.classList.contains("hidden"))
      optionUrlEl.classList.add("hidden");
  } else {
    optionUrlEl.classList.remove("hidden");
    if (!optionComputerEl.classList.contains("hidden"))
      optionComputerEl.classList.add("hidden");
  }
};

(function () {
  displayVideoUpload();
  const videoOptionEl = document.querySelectorAll('input[name="video-option"]');

  videoOptionEl.forEach((option) => {
    option.addEventListener("change", function () {
      displayVideoUpload();
    });
  });

  displayVideoUpload();
})();
