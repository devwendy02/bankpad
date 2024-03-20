export const formatTelegramFromInput = (val) => {
  if (!val || val.startsWith('https://t.me/')) return val
  return `https://t.me/${val}`
}

export const formatTelegramToInput = (val) => {
  if (!val?.startsWith('https://t.me/')) return val
  else return val.substring(13)
}

export const formatTwitterFromInput = (val) => {
  if (!val || val.startsWith('https://twitter.com/')) return val
  return `https://twitter.com/${val}`
}

export const formatTwitterToInput = (val) => {
  if (!val?.startsWith('https://twitter.com/')) return val
  else return val.substring(20)
}

export const formatWebsiteFromInput = (val) => {
  if (!val || val.startsWith('https://')) return val
  return `https://${val}`
}

export const formatWebsiteToInput = (val) => {
  if (!val?.startsWith('https://')) return val
  else return val.substring(8)
}
