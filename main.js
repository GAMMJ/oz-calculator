const btnList = document.querySelectorAll(".buttons button")
const display = document.querySelector(".display")

let firstOperand = null
let operator = null
let waitingOperand = false // 연산자 플래그 변수

btnList.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("number")) {
      // 글자 수 제한 설정
      const MAX_LENGTH = 10

      // 숫자 클릭 시 이벤트
      if (waitingOperand) {
        // 연산자 누른 뒤 첫 숫자
        display.textContent = btn.textContent
        waitingOperand = false
        firstOperand = null // 다시 첫번째 피연산자 초기화
      } else if (display.textContent === "" || display.textContent === "0") {
        // 계산기 디스플레이가 비었거나 0이면
        display.textContent = btn.textContent
      } else {
        // 현재 글자 수가 MAX_LENGTH보다 작을 때만 숫자를 추가함
        if (display.textContent.length < MAX_LENGTH) {
          display.textContent += btn.textContent
        }
      }
    } else if (btn.classList.contains("operator")) {
      // 연산자 클릭 시 이벤트
      if (firstOperand === null) {
        firstOperand = display.textContent
      }

      operator = btn.textContent
      waitingOperand = true

      console.log(`firstOperand : ${firstOperand}`)
      console.log(`operator : ${operator}`)
    } else if (btn.classList.contains("function")) {
      // 기능 클릭 시 이벤트
      if (btn.textContent === ".") {
        // 소수점 이벤트
        if (display.textContent !== "" && !display.textContent.includes(".")) {
          display.textContent += btn.textContent
        }
      }

      if (btn.textContent === "C") {
        // clear 이벤트
        display.textContent = "0"
      }
    }
  })
})

const calculate = (firstOperand, operator, secondOperand) => {
  // 1. 문자열을 숫자로 변환
  const first = parseFloat(firstOperand)
  const second = parseFloat(secondOperand)

  // 2. 연산자에 따른 계산 수행
  switch (operator) {
    case "+":
      return first + second
    case "-":
      return first - second
    case "*":
      return first * second
    case "/":
      // 0으로 나누는 경우 예외 처리
      return second === 0 ? "Error" : first / second
    default:
      return second // 연산자가 없으면 두 번째 숫자 그대로 반환
  }
}
