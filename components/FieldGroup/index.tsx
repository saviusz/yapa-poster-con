import React, { Component, ReactElement } from 'react'
import style from "./field-group.module.scss"

interface Props {
    children: ReactElement[];
}

export default function FieldGroup({children} : Props) {
  return <div className={style.container}>{children}</div>
}
