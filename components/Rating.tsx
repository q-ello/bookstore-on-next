import React from 'react'
import st from '@/styles/components/Rating.module.scss'
import onStar from '@/public/star_on.svg'
import offStar from '@/public/star_off.svg'
import Image from 'next/image'

interface RatingProps {
    rating: number,
    reviews?: number,
    className?: string
}

const Rating = ({ rating, reviews, className }: RatingProps) => {
    const countstars: number[] = [1, 2, 3, 4, 5]
    return (
        <div className={`${st.book_rating} ${className}`}>
            <div className={st.stars}>
                {countstars.map(star =>
                    <Image
                        src={star < Math.round(rating) ? onStar : offStar}
                        alt=''
                        key={star}
                    />
                )}
            </div>
            <div className={st.reviews}>{reviews} review</div>
        </div>
    )
}

export default Rating