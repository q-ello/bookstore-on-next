import React from 'react'
import Image from 'next/image'
import ProfileImage from '@/public/profile.png'
import { emailSelector, loggedInSelector, nameSelector, useAppSelector } from '@/redux/selectors'
import { useRouter } from 'next/navigation'
import st from '@/styles/pages/ProfilePage.module.scss'
import Button from '@/components/UI/Button'
import Head from 'next/head'


const Profile = () => {
  const logged_in = useAppSelector(loggedInSelector)
  const router = useRouter()
  const email = useAppSelector(emailSelector)
  const name = useAppSelector(nameSelector)


  const handleClick = () => { }

  if (logged_in) {
    return (
      <>
        <Head>
          <title>{name}</title>
          <meta name="description" content="Your profile" />
        </Head>
        <div className={st.profile_container}>
          <div>
            <h2 className={st.h2}>PROFILE</h2>
            <div className={st.profile_info}>
              <Image
                src={ProfileImage}
                alt='Profile Image' />
              <div className={st.text_info}>
                <span className={st.label}>YOUR NAME</span>
                <span className={st.span_info}>John Smith</span>
                <span className={st.label}>YOUR EMAIL</span>
                <span className={st.span_info}>{email}</span>
                <Button className={st.button} onClick={handleClick}>EDIT PROFILE</Button>
              </div>
            </div>
          </div>
          <div className={st.about}>
            <h5 className={st.h5}>ABOUT ME</h5>
            <p className={st.lorem_ipsum}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in ante consequat,
              ornare nisi et, ultrices libero. Nunc nibh dolor, maximus quis auctor nec, tempor
              quis ipsum. Proin mollis pellentesque nulla ac varius.</p>
          </div>
        </div>
      </>
    )
  } else {
    router.push('/')
  }

}

export default Profile