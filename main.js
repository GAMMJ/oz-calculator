const btnList = document.querySelectorAll(".buttons button")
const display = document.querySelector(".display")

let firstOperand = null
let operator = null
let waitingOperand = false  // 연산자 플래그 변수


btnList.forEach((btn) => {
    btn.addEventListener("click" ,() => {
      if(btn.classList.contains("number")) {
        // 숫자 클릭 시 이벤트
        if (waitingOperand) {
         // 연산자 누른 뒤 첫 숫자
         display.textContent = btn.textContent
         waitingOperand = false
         firstOperand = null  // 다시 첫번째 피연산자 초기화
        } else if(display.textContent === "" || display.textContent === "0") {
          // 계산기 디스플레이가 비었거나 0이면
          display.textContent = btn.textContent
        } else {
          // 이미 표시된 숫자가 있다면
          display.textContent += btn.textContent
        }

      } else if(btn.classList.contains("operator")) {
        // 연산자 클릭 시 이벤트
        if(firstOperand === null) {
           firstOperand = display.textContent
        }

        operator = btn.textContent
        waitingOperand = true

        console.log(`firstOperand : ${firstOperand}`)
        console.log(`operator : ${operator}`)

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

const calculate = (firstOperand, operator, secondOperand) => {
  
}