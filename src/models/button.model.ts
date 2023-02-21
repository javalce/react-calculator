export type ButtonType = 'clear' | 'clear char' | 'operation' | 'number' | 'dot' | 'equal' | 'sign'

export interface ButtonModel {
  label: string
  type: ButtonType
}

export const BUTTONS: ButtonModel[] = [
  { label: 'AC', type: 'clear' },
  { label: 'C', type: 'clear char' },
  { label: '%', type: 'operation' },
  { label: '/', type: 'operation' },
  { label: '7', type: 'number' },
  { label: '8', type: 'number' },
  { label: '9', type: 'number' },
  { label: 'x', type: 'operation' },
  { label: '4', type: 'number' },
  { label: '5', type: 'number' },
  { label: '6', type: 'number' },
  { label: '-', type: 'operation' },
  { label: '1', type: 'number' },
  { label: '2', type: 'number' },
  { label: '3', type: 'number' },
  { label: '+', type: 'operation' },
  { label: '+/-', type: 'sign' },
  { label: '0', type: 'number' },
  { label: '.', type: 'dot' },
  { label: '=', type: 'equal' }
]
