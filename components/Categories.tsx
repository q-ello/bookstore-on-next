import React from 'react'
import st from '@/styles/components/Categories.module.scss'
import { categories } from '@/data'
import { useAppDispatch } from '@/redux/selectors'
import Button from './UI/Button'

interface CategoriesProps {
  active: string,
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Categories = ({active, onClick}: CategoriesProps) => {
  const categoriesList = categories
  const dispatch = useAppDispatch()
  return (
    <ul className={st.categories_list}>
      {categoriesList.map((category, ind) => 
      <li key={ind}>
        <Button className={`${st.category} ${active === category ? st.active : ''}`} onClick={onClick} id={category}>{category}</Button>
      </li>
        )}
    </ul>
  )
}

export default Categories