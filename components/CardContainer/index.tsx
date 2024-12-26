import React, { PropsWithChildren } from 'react'
import style from "./card-container.module.scss"

interface Props {
  className?: string;
}

export default function CardContainer({children, className} : PropsWithChildren<Props>) {
  return <div className={className + " " + style.container}>
    {children}
  </div>
}
