'use client'
import React, { useEffect, useState } from 'react'
import Categories from './Categories'
import st from '@/styles/components/BookList.module.scss'
import Book from './Book'
import { cartSelector, categorySelector, useAppDispatch, useAppSelector } from '@/redux/selectors'
import { BookType, Currency, changeCategory } from '@/redux/BookSlice'
import defaultThumbnail from '@/public/thumbnail.jpg'
import store from '@/redux'
import { APIkey } from '@/data'
import Button from './UI/Button'

const BookList = () => {
  const [index, setIndex] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [books, setBooks] = useState<BookType[]>([])
  const [error, setError] = useState<null | string>(null)
  const cart = cartSelector.selectAll(store.getState())
  const category = useAppSelector(categorySelector)
  const dispatch = useAppDispatch()

  const getBooks = async (category: string, index: number) => {
    setLoading(true)
    const url = `https://www.googleapis.com/books/v1/volumes?q="subject:${category}"&key=${APIkey}&printType=books&startIndex=${index}&maxResults=6`
    const res = await fetch(url)
    const data = await res.json()
    const booksData: BookType[] = []
    if (!data.items) {
      setError('Something in your request went wrong')
      setLoading(false)
      return
    }
    data.items.forEach((item: any) => {
      booksData.push({
        cover: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : defaultThumbnail,
        authors: item.volumeInfo.authors ? item.volumeInfo.authors.filter(Boolean).join(', ') : '',
        title: item.volumeInfo.title,
        rating: item.volumeInfo.averageRating ? item.volumeInfo.averageRating : '',
        reviews: item.volumeInfo.averageRating ? item.volumeInfo.ratingsCount : '',
        description: item.volumeInfo.description,
        price: item.saleInfo.retailPrice ? item.saleInfo.retailPrice.amount : '',
        id: item.id,
        currency: item.saleInfo.retailPrice ? Currency[item.saleInfo.retailPrice.currencyCode as keyof typeof Currency] : undefined
      })
    })
    if (index === 1) {
      setBooks(booksData)
    } else {
      setBooks([...books, ...booksData])
    }
    setLoading(false)
    setError(null)
  }

  const loadMore = () => {
    getBooks(category, index + 1)
    setIndex(prev => prev + 1)
  }

  useEffect(() => {
    setBooks([])
    getBooks(category, 1)
    setIndex(1)
  }, [category])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(changeCategory((e.target as HTMLElement).id))
  }

  return (
    <section>
      <div className={st.books_cont}>
        <Categories active={category} onClick={handleClick}/>
        <div className={st.books}>
          {books.map(book =>
            <Book {...book} key={book.id} inTheCart={cart.some(el => el.id === book.id)} />
          )}
          {error && error}
          {loading && 'Loading...'}
        </div>
        {books.length !== 0 && <Button className={st.btn} onClick={loadMore}>load more</Button>}
      </div>
    </section>
  )
}

export default BookList