import React, { useRef } from 'react'

import style from "./TextInput.module.scss"
import clsx from 'clsx';

interface Props {
    label?: string;
    note?: string;

    value?: string | number;
    placeholder?: string;

    onChange?: (value: string) => void;

    name?: string;

    [key: string]: any
}

export default function TextInput(props: Props) {

    const ref = useRef<HTMLInputElement>(null)

    return <div className={style.container}>
        {props.label && <span className={style.label}>{props.label}</span>}
        <input
            {...props}
            className={style.input}
            onChange={handleChange}
            placeholder={props.placeholder ?? "Pisz tu"}
            name={props.name}
            ref={ref}
            value={props.value}
        />
        {props.note && <span className={style.note}>{props.note}</span>}
    </div>

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (props.onChange) props.onChange(event.target.value);
    }
}

