/**
 * Container: centres content and applies the site's consistent side gutters.
 *
 * @param {'default'|'narrow'|'wide'} size  max width of the content
 * @param {string} as  element to render (div, section, header...)
 */
const SIZES = {
  narrow: 'max-w-3xl',
  default: 'max-w-7xl',
  wide: 'max-w-[1440px]',
}

export default function Container({ as: Tag = 'div', size = 'default', className = '', children, ...props }) {
  return (
    <Tag className={`mx-auto w-full px-4 sm:px-6 lg:px-10 ${SIZES[size]} ${className}`} {...props}>
      {children}
    </Tag>
  )
}
