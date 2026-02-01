const btnList = document.querySelectorAll(".buttons button")
const display = document.querySelector(".display")

btnList.forEach((btn) => {
    btn.addEventListener("click" ,() => {
      if(btn.classList.contains("number")) {
        // 숫자 클릭 시 이벤트
        if(display.textContent === "" || display.textContent === "0") {
          display.textContent = btn.textContent
        } else {
          display.textContent += btn.textContent
        }
      } else if(btn.classList.contains("operator")) {
        // 연산자 클릭 시 이벤트
      } else if(btn.classList.contains("function")) {
        // 기능 클릭 시 이벤트
        if(btn.textContent === ".") {
          // 소수점 이벤트
          if(display.textContent !== "" && !display.textContent.includes(".")) {
            display.textContent += btn.textContent
          }
        }

        if(btn.textContent === "C") {
          // clear 이벤트
          display.textContent = "0"
        }
      }
    })
})