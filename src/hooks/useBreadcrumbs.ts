import { useLocation } from 'react-router-dom'

export interface Breadcrumb {
  label: string
  href?: string
}

/**
 * Generate breadcrumbs based on the current route
 */
export function useBreadcrumbs(): Breadcrumb[] {
  const location = useLocation()
  const path = location.pathname

  // Landing page has no breadcrumbs
  if (path === '/') {
    return []
  }

  // Portal route
  if (path.startsWith('/portal')) {
    return [
      { label: 'Home', href: '/' },
      { label: 'Portal' },
    ]
  }

  // Component routes
  if (path.startsWith('/components')) {
    if (path === '/components') {
      return [
        { label: 'Home', href: '/' },
        { label: 'Components' },
      ]
    }

    // Component detail page (e.g., /components/button)
    const componentName = path.split('/')[2]
    const formattedName = componentName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    return [
      { label: 'Home', href: '/' },
      { label: 'Components', href: '/components' },
      { label: formattedName },
    ]
  }

  // Fallback for unknown routes
  return [
    { label: 'Home', href: '/' },
  ]
}
