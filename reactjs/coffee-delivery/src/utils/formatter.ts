export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})

export const priceOnlyFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2
})
