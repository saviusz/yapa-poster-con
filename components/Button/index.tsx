import React from 'react'
import style from './button.module.scss'
import clsx from 'clsx';

export enum ButtonType {
  Normal,
  Primary
}

interface Props {
    children: string;
    type?: ButtonType;
    disabled?: boolean;
    onClick?: () => void;
}

export default function Button({children, type, disabled, onClick}: Props) {

  let btnClass = style.normal;

  if (type == ButtonType.Primary) btnClass = style.primary;


  return (
    <button className={clsx(style.container, btnClass)} disabled={disabled} onClick={onClick}>{children}</button>
  )
}
