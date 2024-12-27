"use client";

import Button, { ButtonRank } from "@/components/Button";
import ImageDropzone from "@/components/ImageDropzone";
import style from "./SubmissionFormCard.module.scss";
import { useState } from "react";

import exifr from "exifr";
import TextInput from "@/components/Controls/TextInput";

export function SubmissionFormCard() {

  const [latitude, setLatitude] = useState<number>(51.746208);
  const [longitude, setLongitude] = useState<number>(19.451543);
  const [isLocFromImage, setLocFromImage] = useState<boolean | undefined>(undefined);


  return <div className={style.container}>
    <form>
      <FieldGroup>
        <ImageDropzone fieldName="image" />
        <FormField type={"text"} label='Opis lokalizacji (opcjonalny)' name='desc' />
        <Button type={ButtonType.Primary}>Wyślij</Button>
      </FieldGroup>
      <input type="hidden" name="lat" value={latitude} />
      <input type="hidden" name="lng" value={longitude} />
      <div className={style['form-group']}>
        <ImageDropzone fieldName="image" onImageChange={handleImageChange} />

        <div className={style.location}>
          <TextInput type="text" name="loclabel" value="ul. Jana Pawła II 2" readOnly note={`${latitude}, ${longitude}`} />
          <Button type="button">Wykryj</Button>
        </div>

        <TextInput name='desc' placeholder="przy sklepie" label="Opis lokalizacji" />
      </div>
      <Button rank={ButtonRank.Primary}>Wyślij</Button>
    </form>
  </div>;

  async function handleImageChange(image: string) {
    let { latitude, longitude } = await exifr.gps(image);

    if (latitude && longitude) {
      setLocFromImage(true);

      setLatitude(latitude);
      setLongitude(longitude);
    } else {
      setLocFromImage(false);
    }
  }
}
