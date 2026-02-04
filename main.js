const btnList = document.querySelectorAll(".buttons button")
const display = document.querySelector(".display")

// 계산기 상태 변수들
let firstOperand = null // 첫 번째 피연산자
let operator = null // 연산자 (+, -, *, /)
let waitingOperand = false // 연산자를 눌렀는지 확인하는 플래그

btnList.forEach((btn) => {
  btn.addEventListener("click", () => {
    // 숫자 버튼 클릭
    if (btn.classList.contains("number")) {
      const MAX_LENGTH = 10 // 디스플레이 최대 글자 수

      if (waitingOperand) {
        // 연산자를 누른 직후 첫 숫자 입력
        display.textContent = btn.textContent
        waitingOperand = false
      } else if (display.textContent === "" || display.textContent === "0") {
        // 디스플레이가 비어있거나 0이면 새로 입력
        display.textContent = btn.textContent
      } else {
        // 기존 숫자에 이어서 입력 (글자 수 제한 체크)
        if (display.textContent.length < MAX_LENGTH) {
          display.textContent += btn.textContent
        }
      }
    }
    // 연산자 버튼 클릭 (+, -, *, /)
    else if (btn.classList.contains("operator")) {
      // 연속 연산 처리: 이미 firstOperand와 operator가 있고, 새 숫자를 입력한 경우
      if (firstOperand !== null && operator !== null && !waitingOperand) {
        // 1. 현재 디스플레이의 숫자를 secondOperand로 사용
        const secondOperand = display.textContent

        // 2. 이전 연산 수행 (firstOperand operator secondOperand)
        const result = calculate(firstOperand, operator, secondOperand)

        // 3. 계산 결과를 디스플레이에 표시하고, firstOperand에 저장
        display.textContent = String(result).slice(0, 10)
        firstOperand = result.toString()
      } else {
        // 첫 번째 연산자를 누르는 경우: 현재 숫자를 firstOperand에 저장
        firstOperand = display.textContent
      }

      // 4. 새로 누른 연산자를 저장하고, 다음 숫자 입력 대기
      operator = btn.textContent
      waitingOperand = true
    }
    // 기능 버튼 클릭 (., C, +/-, %, =)
    else if (btn.classList.contains("function")) {
      // 소수점(.) 버튼
      if (btn.textContent === ".") {
        // 디스플레이가 비어있지 않고, 이미 소수점이 없을 때만 추가
        if (display.textContent !== "" && !display.textContent.includes(".")) {
          display.textContent += btn.textContent
        }
      }

      // C 버튼
      if (btn.textContent === "C") {
        display.textContent = "0"
        firstOperand = null
        operator = null
        waitingOperand = false
      }

      // +/- 버튼 - 양수와 음수 전환
      if (btn.textContent === "±") {
        const currentValue = parseFloat(display.textContent)
        if (!isNaN(currentValue)) {
          // 현재 값에 -1을 곱해서 부호 변경
          const newValue = currentValue * -1
          display.textContent = String(newValue).slice(0, 10)
        }
      }

      // % 버튼 - 백분율 변환
      if (btn.textContent === "%") {
        const currentValue = parseFloat(display.textContent)
        if (!isNaN(currentValue)) {
          // 현재 값을 100으로 나누기
          const newValue = currentValue / 100
          display.textContent = String(newValue).slice(0, 10)
        }
      }

      // = 버튼
      if (btn.textContent === "=") {
        if (firstOperand !== null && operator !== null) {
          // 1. 현재 디스플레이의 숫자를 secondOperand로 사용
          const secondOperand = display.textContent

          // 2. 최종 계산 수행
          const result = calculate(firstOperand, operator, secondOperand)

          // 3. 결과를 디스플레이에 표시하고, firstOperand에 저장
          display.textContent = String(result).slice(0, 10)
          firstOperand = result.toString()

          // 연산자 초기화 및 다음 입력 대기
          operator = null
          waitingOperand = true
        }
      }
    }
  })
})

const calculate = (firstOperand, operator, secondOperand) => {
  // 문자열을 숫자로 변환
  const first = parseFloat(firstOperand)
  const second = parseFloat(secondOperand)

  switch (operator) {
    case "+":
      return first + second
    case "-":
      return first - second
    case "*":
      return first * second
    case "/":
      // 0으로 나누는 경우 에러 처리
      return second === 0 ? "Error" : first / second
    default:
      // 연산자가 없으면 두 번째 숫자 그대로 반환
      return second
  }
}
