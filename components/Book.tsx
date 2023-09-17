import React from 'react'
import st from '@/styles/components/Book.module.scss'
import Image from 'next/image'
import { BookType, toggleCart } from '@/redux/BookSlice'
import { loggedInSelector, useAppDispatch, useAppSelector } from '@/redux/selectors'
import Rating from './Rating'
import { open_sans } from './Layout'
import Button from './UI/Button'

interface BookProps extends BookType {
  inTheCart: boolean
}

const Book = ({ cover, authors, title, rating, reviews, description, price, id, inTheCart, currency }: BookProps) => {
  const book = { cover, authors, title, rating, reviews, price, id, description, currency }
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(toggleCart(book))
  }
  const logged_in = useAppSelector(loggedInSelector)

  return (
    <div className={st.book}>
      <Image
        src={cover}
        alt='thumbnail'
        width={212}
        height={300}
        className={st.book_cover}
      />
      <div className={`${st.book_info} ${open_sans.className}`}>
        {authors && <div className={st.book_authors}>{authors}</div>}
        <div className={st.book_title}>{title}</div>
        {rating && <Rating rating={rating} reviews={reviews} />}
        <p className={st.book_description}>{description}</p>
        {(price && currency) && <div className={st.book_price}>{price} {currency}</div>}
        {logged_in && <Button
          className={`${st.book_btn} ${inTheCart ? st.in_the_cart : st.to_buy}`}
          id={id}
          onClick={handleClick}>
          {inTheCart ? 'in the cart' : 'buy now'}
        </Button>
        }
      </div>
    </div>
  )
}

export default Book