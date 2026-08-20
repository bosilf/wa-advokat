export type FilterProp = {
  yrkesroll: boolean,
}

export type IconData = {
  iconTypes: 'arrow' | 'arrowSimple'
}

export type ButtonData = {
  variant?: 'primary' | 'secondary' | 'simple' | 'simpleWhite',
  icon?: IconData['iconTypes'],
  title: string,
  ariaLabel?: string, 
  href: string,
  download?: boolean,
  target?: string,
  hasIcon: boolean,
  iconColor?: string,
}

export type EmployeeType = {
  _id: string,
  firstName: string | null,
  lastName: string | null,
  number: number | string | null,
  email: string | null,
  slug: string | null,
  image?: any | null,
  roles?: Array<{ title: string; slug: string }> | null 
}