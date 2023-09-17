import st from '@/styles/pages/CartPage.module.scss'
import React, { useMemo } from 'react'
import { cartSelector, loggedInSelector, useAppSelector } from '@/redux/selectors'
import store from '@/redux'
import Head from 'next/head'
import BookInTheCart from '@/components/BookInTheCart'
import Button from '@/components/UI/Button'
import { useRouter } from 'next/navigation'

const Cart = () => {
  const cart = cartSelector.selectAll(store.getState())
  const currency = cart.length ? cart.find(el => el.currency)?.currency : null
  const logged_in = useAppSelector(loggedInSelector)

  const router = useRouter()

  const totalPrice = useMemo(() => {
    let price = 0
    cart.map(book => {
      if (book.price) {
        price += book.quantity * book.price
      }
    })
    return price
  }, [cart])

  const handleClick = () => {}

  if (logged_in) {
    return(
      <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Books in your cart" />
      </Head>
      <div className={st.cart_container}>
        <h2 className={st.h2}>SHOPPING CART</h2>
        <div className={st.table_head}>
          <span className={st.span}>ITEM</span>
          <span className={st.span}>QUANTITY</span>
          <span className={st.span}>PRICE</span>
          <span className={st.span}>DELIVERY</span>
        </div>
        <div className={st.table_body}>
          {!!cart.length && cart.map(book =>
            <BookInTheCart key={book.id} {...book} />
          )}
        </div>
        <h2 className={st.h2}>TOTAL PRICE: {totalPrice.toFixed(2)} {currency}</h2>
        <Button className={st.button} onClick={handleClick}>Checkout</Button>
      </div>
    </>
    )
  }
  else {
    router.push('/')
  }
}

export default Cart