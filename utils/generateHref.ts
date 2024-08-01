import slugify from 'slugify'

export const generateHref = (title: string) => {
  return `/${slugify(title, { lower: true })}`
}
