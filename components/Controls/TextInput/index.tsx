import style from "./TextInput.module.scss";

import React from "react";

import GenericInput, { NoteStatus } from "../GenericInput";

interface Props {
  label? : string;
  note?  : string;
  error? : string;

  value?       : string | number;
  placeholder? : string;

  onChange?: (value: string) => void;

  name? : string;
  role? : "text" | "password" | "email";

  [key: string]: unknown;
}

export default function TextInput(props: Props) {

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
      value={props.value}
    />
  </GenericInput>;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (props.onChange) props.onChange(event.target.value);
  }
}

