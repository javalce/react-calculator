import { calculate } from '@/models'

enum CalculatorActionTypes {
  ADD_NUMBER = 'ADD_NUMBER',
  ADD_OPERATION = 'ADD_OPERATION',
  CLEAR = 'CLEAR',
  RESOLVE = 'RESOLVE',
  CHANGE_SIGN = 'CHANGE_SIGN',
  CLEAR_CHAR = 'CLEAR_CHAR'
}

export interface CalculatorState {
  operand1: string
  operand2: string
  operator: string
  result: string
}

interface CalculatorAction {
  type: keyof typeof CalculatorActionTypes
  payload: Partial<CalculatorState>
}

export const calculatorInitialState: CalculatorState = {
  operand1: '',
  operand2: '',
  operator: '',
  result: ''
}

function addNumber (prevState: CalculatorState, currentState: Partial<CalculatorState>): CalculatorState {
  let operand1: string
  let operand2: string

  if (currentState.operand1 === undefined || (currentState.operand1 === '.' && prevState.operand1.includes('.'))) {
    operand1 = prevState.operand1
  } else if (currentState.operand1 === '.' && prevState.operand1 === '') {
    operand1 = '0.'
  } else {
    operand1 = prevState.operand1.concat(currentState.operand1)
  }

  if (currentState.operand2 === undefined || (currentState.operand2 === '.' && prevState.operand2.includes('.'))) {
    operand2 = prevState.operand2
  } else if (currentState.operand2 === '.' && prevState.operand2 === '') {
    operand2 = '0.'
  } else {
    operand2 = prevState.operand2.concat(currentState.operand2)
  }

  const result = prevState.result !== '' ? '' : prevState.result

  return { ...prevState, operand1, operand2, result }
}

function addOperator (prevState: CalculatorState, currentState: Partial<CalculatorState>): CalculatorState {
  let newState: CalculatorState = { ...prevState }

  if (prevState.operand1 !== '' && prevState.operand2 !== '' && prevState.operator !== '') {
    const result = calculate(prevState.operand1, prevState.operand2, prevState.operator)
    newState = { ...calculatorInitialState, operand1: result }
  }

  const operator = currentState.operator ?? ''
  return { ...newState, operator }
}

function resolveOperation (state: CalculatorState): CalculatorState {
  const { operand1, operand2, operator } = state

  if (operand1 === '' || operand2 === '' || operator === '') {
    console.error('Operation not valid')
    return state
  }
  const result = calculate(operand1, operand2, operator)
  return { ...calculatorInitialState, result }
}

function changeSign (prevState: CalculatorState, currentState: Partial<CalculatorState>): CalculatorState {
  console.log({ prevState, currentState })

  let operand1: string
  let operand2: string

  if (currentState.operand1 === undefined) {
    operand1 = prevState.operand1
  } else if (currentState.operand1.includes('-')) {
    operand1 = currentState.operand1.slice(1)
  } else {
    operand1 = '-'.concat(currentState.operand1)
  }

  if (currentState.operand2 === undefined) {
    operand2 = prevState.operand2
  } else if (currentState.operand2.includes('-')) {
    operand2 = currentState.operand2.slice(1)
  } else {
    operand2 = '-'.concat(currentState.operand2)
  }

  return { ...prevState, operand1, operand2 }
}

function clearChar (state: CalculatorState): CalculatorState {
  const { operand1, operand2, operator } = state
  let newOperand1 = operand1
  let newOperand2 = operand2

  if (operator === '') {
    newOperand1 = operand1.slice(0, -1)
  } else {
    newOperand2 = operand2.slice(0, -1)
  }

  return { ...state, operand1: newOperand1, operand2: newOperand2 }
}

export function calculatorReducer (state: CalculatorState, action: CalculatorAction): CalculatorState {
  const { type, payload } = action
  let newState: CalculatorState

  switch (type) {
    case 'ADD_NUMBER':
      newState = addNumber(state, payload)
      break
    case 'ADD_OPERATION':
      newState = addOperator(state, payload)
      break
    case 'CHANGE_SIGN':
      newState = changeSign(state, payload)
      break
    case 'CLEAR':
      newState = { ...calculatorInitialState }
      break
    case 'CLEAR_CHAR':
      newState = clearChar(state)
      break
    case 'RESOLVE':
      newState = resolveOperation(state)
      break
    default:
      throw new Error('Unhandled action type')
  }

  return newState
}
