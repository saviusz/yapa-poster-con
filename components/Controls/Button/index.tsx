import React from 'react'
import style from './button.module.scss'
import clsx from 'clsx';

export enum ButtonRank {
  Normal,
  Primary
}

interface Props {
    children: string;
    rank?: ButtonRank;
    onClick?: () => void;
    [key: string]: any;
}

export default function Button({children, rank, onClick, ...rest}: Props) {

  let btnClass = style.normal;

  if (rank == ButtonRank.Primary) btnClass = style.primary;


  return (
    <button className={clsx(style.container, btnClass)} onClick={onClick} {...rest}>{children}</button>
  )
}
