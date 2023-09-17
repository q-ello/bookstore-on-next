'use client'
import React, { useEffect, useState } from 'react'
import st from '@/styles/components/Slider.module.scss'
import Image from 'next/image'
import Banner1 from '@/public/banner1.png'
import Banner2 from '@/public/banner2.png'
import Banner3 from '@/public/banner3.png'
import Link from 'next/link'
import Arrow from '@/public/arrow.svg'
import Button from './UI/Button'

const Slider = () => {
  const banners = [Banner1, Banner2, Banner3]
  const [slideId, setSlideId] = useState<number>(0)
  const changeSlide = (id: number) => {
    setSlideId(id)
  }

  useEffect(() => {
    const interval = setTimeout(() => {
      changeSlide((slideId + 1) % 3)
    }, 5000)

    return () => clearTimeout(interval)
  }, [slideId])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = (e.target as HTMLElement).id
    changeSlide(+id[3])
  }

  return (
    <section className={st.slider}>
      <div className={st.slide}>
        {banners.map((banner, id) =>
          <Image
            src={banner}
            alt={`Banner${id + 1}`}
            className={`${st.image} ${slideId === id ? st.active : ''}`}
            key={id}
          />
        )}
      </div>
      <div className={st.dots}>
        {banners.map((banner, id) =>
          <Button
            key={id}
            id={`dot${id}`}
            className={`${st.dot} ${slideId === id ? st.active : ''}`}
            onClick={handleClick}
          />
        )}
      </div>
      <Link className={`${st.promo} ${st.promo1}`} href='/'>Change old book on new <Image src={Arrow} alt='' /></Link>
      <Link className={`${st.promo} ${st.promo2}`} href='/'>top 100 books 2022 <Image src={Arrow} alt='' /></Link>
    </section>
  )
}

export default Slider