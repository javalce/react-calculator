
import { CalculatorContext, CalculatorContextProps } from '@/context'
import { useContext } from 'react'

export function useCalculator (): CalculatorContextProps {
  const context = useContext(CalculatorContext)

  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider')
  }

  return context
}
