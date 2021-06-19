import apolloClient from 'src/utils/graphql'

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
export async function apolloProviderBeforeCreate ({ apolloProviderConfigObj, app, router, store, ssrContext, urlPath, redirect }) {
  // if needed you can modify here the config object used for apollo provider
  // instantiation
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  apolloProviderConfigObj.defaultClient = apolloClient
}

export async function apolloProviderAfterCreate (/* { apolloProvider, app, router, store, ssrContext, urlPath, redirect } */) {
  // if needed you can modify here the created apollo provider
}
