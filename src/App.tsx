import './App.css'
import { NumbersPanel, OperationPanel } from './components'

function App (): JSX.Element {
  return (
    <>
      <div className='max-w-xs m-6 flex flex-col gap-5'>
        <OperationPanel />
        <NumbersPanel />
      </div>
    </>
  )
}

export default App
