import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'

//inheriting Post interface object from typings.d.ts file becos of the data type declaration
interface Props {
  posts: [Post]
}
// export default function Home(props: Props) {
//destructure of props
export default function Home({ posts }: Props) {
  console.log(posts)
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/*<h1>Welcome to Nextjs</h1>*/}
      <Header />

      <div className="flex items-center justify-between border-y border-black bg-yellow-400 py-10 lg:py-0">
        <div className="space-y-5 px-10">
          <h1 className="max-w-xl font-serif text-6xl">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{' '}
            is a place to write, read, and connect
          </h1>
          <h2>
            It's easy and free to post your thinking on any topic and connect
            with millions of readers.
          </h2>
        </div>
        <img
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          alt=""
          className="hidden h-32 md:inline-flex lg:h-full"
        />
      </div>

      {/* Posts */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"> styling for responsiveness*/}
      <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="group cursor-pointer overflow-hidden rounded-lg border">
              <img
                className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                src={urlFor(post.mainImage).url()!}
                alt=""
              />
              <div className="flex justify-between bg-white p-5">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-xs">
                    {post.description} by {post.author.name}
                  </p>
                </div>

                <img
                  src={urlFor(post.author.image).url()!}
                  alt={post.title}
                  className="h-12 w-12 rounded-full"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

//Server side rendering
export const getServerSideProps = async () => {
  const query = `*[_type == 'post']{
    _id, 
    title, 
    author ->{
      name, 
      image
    },
    description,
    mainImage,
    slug
  }`

  const posts = await sanityClient.fetch(query)

  //this is props will be use in react component
  return {
    props: {
      posts,
    },
  }
}
