import { ButtonModel } from '@/models'

interface Props {
  model: ButtonModel
  onClick: (model: ButtonModel) => void
}

function Button ({ model, onClick }: Props): JSX.Element {
  const { label } = model

  const handleClick = (): void => {
    onClick(model)
  }

  return (
    <>
      <button className='border-none bg-gray-300 rounded-full hover:bg-gray-400' onClick={handleClick}>
        {label}
      </button>
    </>
  )
}

export default Button
