import { createAuthStore } from './authStore'
import { MockAuthClient } from './mock/mockAuthClient'

// The ONE place that picks the auth backend.
// When the real API exists, swap MockAuthClient for an API-backed AuthClient here.
export const auth = createAuthStore(new MockAuthClient())
