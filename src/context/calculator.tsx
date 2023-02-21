import { ButtonModel } from '@/models'
import { calculatorInitialState, calculatorReducer, CalculatorState } from '@/reducers'
import { createContext, useCallback, useMemo, useReducer } from 'react'

export interface CalculatorContextProps {
  calculatorState: CalculatorState
  operation: string
  performOperation: (buttonModel: ButtonModel) => void
}

export const CalculatorContext = createContext<CalculatorContextProps | undefined>(undefined)

export function useCalculatorReducer (): CalculatorContextProps {
  const [calculatorState, dispatch] = useReducer(calculatorReducer, calculatorInitialState)

  const operation = useMemo(() => {
    const { operand1, operand2, operator, result } = calculatorState
    if (result === '') {
      return `${operand1}${operator}${operand2}`
    }

    return result
  }, [calculatorState])

  const performOperation = useCallback(({ label, type }: ButtonModel): void => {
    switch (type) {
      case 'number':
      case 'dot':
        dispatch({
          type: 'ADD_NUMBER',
          payload: calculatorState.operator === ''
            ? { operand1: label }
            : { operand2: label }
        })
        break
      case 'clear':
        dispatch({ type: 'CLEAR', payload: {} })
        break
      case 'clear char':
        dispatch({ type: 'CLEAR_CHAR', payload: {} })
        break
      case 'operation':
        dispatch({
          type: 'ADD_OPERATION',
          payload: { ...calculatorState, operator: label }
        })
        break
      case 'equal':
        dispatch({
          type: 'RESOLVE',
          payload: {}
        })
        break
      case 'sign':
        dispatch({
          type: 'CHANGE_SIGN',
          payload: calculatorState.operator === ''
            ? { operand1: calculatorState.operand1 }
            : { operand2: calculatorState.operand2 }
        })
        break
    }
  }, [calculatorState])

  return { calculatorState, operation, performOperation }
}

interface Props {
  children: JSX.Element
}

export function CalculatorProvider ({ children }: Props): JSX.Element {
  const calculatorReducer = useCalculatorReducer()

  return (
    <CalculatorContext.Provider value={{ ...calculatorReducer }}>
      {children}
    </CalculatorContext.Provider>
  )
}
