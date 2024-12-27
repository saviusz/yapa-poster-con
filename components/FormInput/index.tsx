import React from 'react'
import style from "./FormInput.module.scss";

interface Props {
  name: string;
  [key: string]: any;
}

export default function FormInput({ name, ...rest }: Props) {
  return <input name={name} id={name} className={style.field} {...rest}  />;
}