// Types for pages loaded from remote micro frontends at runtime (see vite.config.ts → remotes).
// Every exposed module is a page component with no props.
declare module 'vendor/*' {
  const Page: import('react').ComponentType
  export default Page
}

declare module 'kitchen/*' {
  const Page: import('react').ComponentType
  export default Page
}

declare module 'delivery/*' {
  const Page: import('react').ComponentType
  export default Page
}

declare module 'admin/*' {
  const Page: import('react').ComponentType
  export default Page
}
