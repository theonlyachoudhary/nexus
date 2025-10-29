import { getPayload as realGetPayload, type InitOptions } from 'payload'

// Minimal stubbed payload used during builds when we want to skip real DB access.
const stubPayload = {
  find: async () => ({ docs: [] }),
  findByID: async () => null,
  findVersions: async () => ({ docs: [] }),
  create: async () => null,
  update: async () => null,
  // generic fallback for any other calls
  query: async () => ({ docs: [] }),
}

export async function getPayload(options?: InitOptions) {
  if (process.env.SKIP_PAYLOAD_DURING_BUILD === '1') {
    return stubPayload as unknown as ReturnType<typeof realGetPayload>
  }

  return realGetPayload(options as InitOptions)
}

export default getPayload
