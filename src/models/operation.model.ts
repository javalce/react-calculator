function getDecimalsLength (num: string): number {
  const splits = num.split('.')
  return splits.length === 2 ? splits[1].length : 0
}

export function calculate (a: string, b: string, operator: string): string {
  const num1 = parseFloat(a)
  const num2 = parseFloat(b)

  const decimals1 = getDecimalsLength(a)
  const decimals2 = getDecimalsLength(b)
  const maxDecimals = Math.max(decimals1, decimals2)

  let result: number | null

  switch (operator) {
    case '+':
      result = num1 + num2
      break
    case '-':
      result = num1 - num2
      break
    case 'x':
      result = num1 * num2
      break
    case '/':
      result = num1 / num2
      break
    default:
      result = null
      break
  }

  return result?.toFixed(maxDecimals) ?? ''
}
