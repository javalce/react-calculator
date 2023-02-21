
import { useCalculator } from '@/hooks'
import { BUTTONS } from '@/models'
import Button from '../button/Button'

function NumbersPanel (): JSX.Element {
  const { calculatorState, performOperation } = useCalculator()

  return (
    <>
      <pre>{JSON.stringify(calculatorState)}</pre>
      <div className='grid grid-rows-5 grid-cols-4 gap-2'>
        {BUTTONS.map(btn => <Button key={btn.label} model={btn} onClick={performOperation} />)}
      </div>
    </>
  )
}

export default NumbersPanel
