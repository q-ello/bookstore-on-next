import Head from 'next/head'
import Slider from '@/components/Slider'
import BookList from '@/components/BookList'

export default function Home() {
  return (
    <>
      <Head>
        <title>Bookstore</title>
        <meta name="description" content="Bookstore with a large collection of books" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Slider />
      <BookList />
    </>
  )
}
