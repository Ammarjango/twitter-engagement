export function circleEngagementOrder(order: string, array: []) {
  if (order === 'Ascending') {
    return array?.sort((a, b) => a - b)
  } else return array?.sort((a, b) => b - a)
}
