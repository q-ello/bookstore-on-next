import { BookInTheCartType, changeBookQuantity } from '@/redux/BookSlice'
import React from 'react'
import Image from 'next/image'
import st from '@/styles/components/BookInTheCart.module.scss'
import Rating from './Rating'
import Minus from '@/public/minus.svg'
import Plus from '@/public/plus.svg'
import { useAppDispatch } from '@/redux/selectors'
import { open_sans } from './Layout'
import Button from './UI/Button'

const BookInTheCart = ({ cover, title, authors, rating, reviews, quantity, price, id, currency }: BookInTheCartType) => {
    const dispatch = useAppDispatch()
    const decrease = () => {
        dispatch(changeBookQuantity({ id: id, changes: {quantity: quantity - 1}}))
    }
    const increase = () => {
        dispatch(changeBookQuantity({ id: id, changes: {quantity: quantity + 1}}))
    }
    return (
        <>
            <div className={st.book}>
                <Image
                    src={cover}
                    alt={'thumbnail'}
                    width={102}
                    height={145}
                    className={st.thumbnail}
                />
                <div className={st.book_info}>
                    <span className={st.book_title}>{title}</span>
                    <span className={`${st.book_authors} ${open_sans.className}`}>{authors}</span>
                    {rating && <Rating rating={rating} reviews={reviews} className={st.book_rating_in_the_cart} />}
                </div>
            </div>
            <div className={st.quantity}>
                <Button onClick={decrease} disabled={quantity === 0}>
                    <Image
                        src={Minus}
                        alt={'-'}
                        className={st.minus}
                    />
                </Button>
                {quantity}
                <Button onClick={increase}>
                    <Image
                        src={Plus}
                        alt={'+'}
                        className={st.plus}
                    />
                </Button>
            </div>
            <div className={st.price}>{price || 0} {currency}</div>
            <div className={st.delivery}>Shipping: delivery</div>
        </>
    )
}

export default BookInTheCart