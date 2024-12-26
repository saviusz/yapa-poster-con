import React from 'react'
import CardContainer from '../CardContainer';

import style from "./error-card.module.scss";

interface Props {
    title? : string;
    message: string;
}

export default function ErrorCard({title, message} : Props) {
  return <CardContainer className={style.container}>
    <span>{title ?? "Błąd"}:</span> {message}
  </CardContainer>
}
