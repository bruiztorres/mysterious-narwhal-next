export function toCurrency(amountInCents: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  }).format(amountInCents / 100);
}
