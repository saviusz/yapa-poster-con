import React, { PropsWithChildren, useRef } from 'react'

import style from "./GenericInput.module.scss"

interface Props {
    label?: string;
    note?: string;
}

export default function GenericInput(props: PropsWithChildren<Props>) {

    const ref = useRef<HTMLInputElement>(null)

    return <div className={style.container}>
        {props.label && <span className={style.label}>{props.label}</span>}
        {props.children}
        {props.note && <span className={style.note}>{props.note}</span>}
    </div>
}

