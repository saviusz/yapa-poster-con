import React, { useRef } from 'react'

import style from "./TextInput.module.scss"
import GenericInput, { NoteStatus } from '../GenericInput';

interface Props {
    label?: string;
    note?: string;
    error?: string;

    value?: string | number;
    placeholder?: string;

    onChange?: (value: string) => void;

    name?: string;
    role?: "text" | "password" | "email";

    [key: string]: any
}

export default function TextInput(props: Props) {

    const ref = useRef<HTMLInputElement>(null)

    return <GenericInput
        label={props.label}
        note={props.error ?? props.note}
        noteStatus={props.error ? NoteStatus.Error : undefined}>
        <input
            {...props}
            className={style.input}
            onChange={handleChange}
            placeholder={props.placeholder ?? "Pisz tu"}
            name={props.name}
            ref={ref}
            value={props.value}
        />
    </GenericInput>

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (props.onChange) props.onChange(event.target.value);
    }
}

