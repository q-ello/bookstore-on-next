import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import st from '@/styles/components/Input.module.scss'
import { InputType } from '@/data'
import { montserrat } from '../Layout'

interface InputProps {
    label: InputType,
    type?: string,
    valid: boolean,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    error: string
}

const Input = ({ label, type = 'text', value, valid, onChange, error }: InputProps) => {
    return (
        <div className={st.input_div}>
            <label htmlFor={`${label}`} className={st.label}>
                {`${label}`}
            </label>
            <input type={type} name={`${label}`} className={`${st.input} ${montserrat.className} ${valid ? '' : st.error}`} value={value} onChange={onChange}/>
            {!valid && <span className={st.span_error}>{error}</span>}
        </div>
    )
}

export default Input