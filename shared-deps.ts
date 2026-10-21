// Libraries every micro frontend must load as ONE copy at runtime.
// Two copies of React break hooks; two copies of @smartbite/auth lose the signed-in user.
//
// React is `eager`: react-dom/client reads react-dom's internals the moment it loads, before a
// lazily shared copy is ready — without this, remotes opened on their own crash with
// "Cannot read properties of undefined (reading 'd')". Subpaths (react-dom/client, react/jsx-runtime)
// inherit it. Inside the shell the one shared copy is still used (singleton).
export const sharedDeps = {
  react: { singleton: true, eager: true },
  'react-dom': { singleton: true, eager: true },
  '@tanstack/react-query': { singleton: true },
  '@smartbite/auth': { singleton: true },
  '@smartbite/ui': { singleton: true },
}
