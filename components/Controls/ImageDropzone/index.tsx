"use client";

import style from "./style.module.scss";

import { useState, useRef, ChangeEvent } from "react";

import GenericInput from "../GenericInput";

interface Props {
  fieldName: string;

  label? : string;
  note?  : string;

  onImageChange: (image: string | ArrayBuffer | null) => void;
}

export default function ImageDropzone(props: Props) {
  const [ image, setImage ] = useState<string | null>(null);
  const [ error, setError ] = useState<string | undefined>(undefined);
  const inputElem = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    setError(undefined);
    if (file && file.type.startsWith("image/")) {
      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        setImage(fileReader.result as string);
        props.onImageChange(fileReader.result);
      };


      fileReader.readAsDataURL(file);
    } else {
      setError("Nieprawidłowa rozszerzenie pliku");
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();


    const file = event.dataTransfer.files?.[0];
    const dt = new DataTransfer();
    dt.items.add(file!);
    if (inputElem.current) inputElem.current.files = dt.files;
    handleFile(file);
  };

  const handleDragOver = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    inputElem.current?.click();
  };

  return <GenericInput label={props.label} note={error ?? props.note}>
    <div className={style.container} onDrop={handleDrop} onDragOver={handleDragOver} onClick={handleClick}>
      <div className={style.overlay}>
        <input type="file"
          name={props.fieldName}
          id={props.fieldName}
          className={style.input}
          onChange={handleFileChange}
          ref={inputElem}
          accept="image/*" />
        <span>Kliknij lub upuść zdjęcie</span>
      </div>
      {image && <img src={image} alt="Przesłane zdjecie" className={style.image} />}
    </div>
  </GenericInput>;
}

