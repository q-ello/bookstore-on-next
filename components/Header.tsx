import React, { useCallback, useEffect, useRef, useState } from 'react'
import st from '@/styles/components/Header.module.scss'
import Link from 'next/link'
import User from '@/public/user.svg'
import ShopBag from '@/public/shop_bag.svg'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cartSelector, loggedInSelector, useAppDispatch, useAppSelector } from '@/redux/selectors'
import store from '@/redux'
import Button from './UI/Button'
import UserLogIn from './UserLogIn'
import { montserrat } from './Layout'

const Header = () => {
  const pathname = usePathname()
  const cart = cartSelector.selectAll(store.getState())
  const [userOpen, setUserOpen] = useState<boolean>(false)
  const userLoginRef = useRef(null)
  const dispatch = useAppDispatch()

  const logged_in = useAppSelector(loggedInSelector)

  const openUser = () => {
    setUserOpen(prev => !prev)
  }

  const closeLoginMenu = useCallback((e: MouseEvent) => {
    if (userLoginRef.current && userOpen && !(userLoginRef.current as HTMLElement).contains(e.target as HTMLElement)) {
      setUserOpen(false)
    }
  }, [userOpen])

  useEffect(() => {
    document.addEventListener('mousedown', closeLoginMenu)
  }, [closeLoginMenu])

  return (
    <header className={`${st.header_section} ${montserrat.className}`}>
      <div className={`container ${st.header}`}>
        <Link href='/' className={`${st.logo} ${pathname === '/' ? st.active : ''}`}>Bookshop</Link>
        <nav className={st.menu}>
          <ul className={st.menu_list}>
            <Link className={`${st.menu_link} ${st.books} ${pathname === '/' ? st.active : ''}`} href='/'>books</Link>
            <Link className={st.menu_link} href='/'>audiobooks</Link>
            <Link className={st.menu_link} href='/'>Stationery & gifts</Link>
            <Link className={st.menu_link} href='/'>blog</Link>
          </ul>
        </nav>
        <div className={st.icons}>

          <div className={st.user} ref={userLoginRef}>
            <Button onClick={openUser}>
              <Image
                src={User}
                alt='user'
              />
            </Button>
            {userOpen && <UserLogIn />}
          </div>
          <div className={st.cart}>
            <Link href={'/cart'} className={pathname === '/cart' || !logged_in ? st.active : ''}>
              <Image
                src={ShopBag}
                alt='shop bag'
              />
              {(!!cart.length && logged_in) && <div className={st.cart_badge}>{cart.length}</div>}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header