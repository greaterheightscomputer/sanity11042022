// import { createImageUrlBuilder } from 'next-sanity'
import { createCurrentUserHook, createClient } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2021-03-25',
  useCdn: process.env.NODE_ENV === 'production',
}

//set up the client for fetching data from sanity cms backend
export const sanityClient = createClient(config)

//fetch image from sanity cms backend
export const urlFor = (source) => createImageUrlBuilder(config).image(source)

//fetch current user who logged onto our app
export const useCurrentUser = createCurrentUserHook(config)
