import React, { ChangeEvent, useState } from 'react'
import st from '@/styles/components/UserLogIn.module.scss'
import Input from './UI/Input'
import { InputType } from '@/data'
import { loggedInSelector, nameSelector, useAppDispatch, useAppSelector } from '@/redux/selectors'
import { logIn, logOut, saveUser } from '@/redux/UserSlice'
import { usePathname, useRouter } from 'next/navigation'
import Button from './UI/Button'
import Link from 'next/link'


const UserLogIn = () => {
    const [emailValue, setEmailValue] = useState<string>('')
    const [passwordValue, setPasswordValue] = useState<string>('')
    const [emailValid, setEmailValid] = useState<boolean>(true)
    const [passwordValid, setPasswordValid] = useState<boolean>(true)

    const logged_in = useAppSelector(loggedInSelector)
    const name = useAppSelector(nameSelector)

    const router = useRouter()
    const pathname = usePathname()

    const dispatch = useAppDispatch()

    const checkEmailValidity = (string: string) => {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        return regex.test(string)
    }
    const checkPasswordValidity = (string: string) => {
        return string.length >= 6
    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value)
        if (!emailValid) {
            setEmailValid(checkEmailValidity(e.target.value))
        }
    }
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value)
        if (!passwordValid) {
            setPasswordValid(checkPasswordValidity(e.target.value))
        }
    }

    const handleClick = async () => {
        const res = await fetch('/api/auth', {
            method: 'POST',
            body: JSON.stringify({ email: emailValue, password: passwordValue })
        })
        if (res.status === 200) {
            dispatch(saveUser({ email: emailValue, password: passwordValue }))
            dispatch(logIn())
            setEmailValue('')
            setPasswordValue('')
            router.push('/profile')
        } else {
            setEmailValid(checkEmailValidity(emailValue))
            setPasswordValid(checkPasswordValidity(passwordValue))
        }
    }

    return (
        logged_in
            ? <div className={st.user_logout}>
                < Link className={pathname === '/profile' ? st.active : ''
                } href={'/'} > <h4 className={st.head_text}>{name}</h4></Link>
                <Button className={st.button} onClick={() => { dispatch(logOut()) }}>
                    LOG OUT
                </Button>
            </div>
            : <div className={st.user_login}>
                <h4 className={st.head_text}>Log in</h4>
                <div className={st.input_div}>
                    <Input
                        label={InputType.Email}
                        valid={emailValid}
                        value={emailValue}
                        error='Invalid email'
                        onChange={handleEmailChange}
                    />
                    <Input
                        label={InputType.Password}
                        type={'password'}
                        valid={passwordValid}
                        error='Your password must be at least 6 characters long'
                        onChange={handlePasswordChange}
                        value={passwordValue}
                    />
                </div>
                <Button className={st.button} onClick={handleClick}>LOG IN</Button>
            </div>
    )
}


export default UserLogIn