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

  // Portal (home) has no breadcrumbs
  if (path === '/') {
    return []
  }

  // Menu/Landing page has no breadcrumbs
  if (path === '/menu') {
    return []
  }

  // Component routes
  if (path.startsWith('/components')) {
    if (path === '/components') {
      return [
        { label: 'Menu', href: '/menu' },
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
      { label: 'Menu', href: '/menu' },
      { label: 'Components', href: '/components' },
      { label: formattedName },
    ]
  }

  // Fallback for unknown routes
  return [
    { label: 'Menu', href: '/menu' },
  ]
}
