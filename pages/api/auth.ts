import { logIn, saveUser } from '@/redux/UserSlice';
import { useAppDispatch } from '@/redux/selectors';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send({ error: true, message: 'Only POST' })
  }

  const { email, password } = JSON.parse(req.body)

  const validate = (email: string, password: string) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    const emailIsValid = regex.test(email)
    const passwordIsValid = password.length >= 6
    return emailIsValid && passwordIsValid
  }

  const isValid = validate(email, password);

  if (isValid) {
    res.status(200).send({ success: true, token: 'testToken' });
  } else {
    res.status(400).send({ error: true, message: 'Email or password are incorrect' });
  }
}