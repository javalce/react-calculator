import { useCalculator } from '@/hooks'

function OperationPanel (): JSX.Element {
  const { operation } = useCalculator()

  return (
    <>
      <span className='text-right font-sans text-2xl'>{operation.length === 0 ? '0' : operation}</span>
    </>
  )
}

export default OperationPanel
