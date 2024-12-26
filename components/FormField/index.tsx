import React from 'react'
import style from "./form-field.module.scss";

interface Props {
  label: string;
  name: string;
  type: any;
}

export default function FormField({type, name, label} : Props) {
  return <div className={style.container}>
    <label htmlFor={name} className={style.label}>{label}: </label>
    <input type={type} name={name} id={name} className={style.field}/>
  </div>
}
