import React from 'react'
import style from "./form-field.module.scss";
import FormInput from '../FormInput';

interface Props {
  label: string;
  name: string;
  type: any;
  [key: string]: any;
}

export default function FormField({type, name, label, ...rest} : Props) {
  return <div className={style.container}>
    <label htmlFor={name} className={style.label}>{label}: </label>
    <FormInput type={type} name={name} {...rest} />
  </div>
}

