"use client";

import style from "./SubmissionFormCard.module.scss";

import exifr from "exifr";
import { useActionState, useState } from "react";

import Button, { ButtonRank } from "@/components/Controls/Button";
import ImageDropzone from "@/components/Controls/ImageDropzone";
import TextInput from "@/components/Controls/TextInput";
import ErrorCard from "@/components/ErrorCard";
import { FormCard } from "@/components/FormCard";

import { submitForm } from "./submitForm";

interface GeoCodeResp {
  place_id     : string;
  licence      : string;
  osm_type     : string;
  osm_id       : string;
  lat          : number;
  lon          : number;
  display_name : string;
  address: {
    city?          : string;
    country?       : string;
    country_code?  : string;
    county?        : string;
    house_number?  : string;
    neighbourhood? : string;
    postcode?      : string;
    road?          : string;
    state?         : string;
  };
  boundingbox?: [number, number, number, number];
}

export function SubmissionFormCard() {

  const [ pos, setPos ] = useState<{ lat: number; lng: number } | undefined>(undefined);
  const [ isImageAdded, setImageAdded ] = useState<boolean>(false);
  const [ imageError, setImageError ] = useState<string | null>(null);
  const [ locationText, setLocationText ] = useState<string>("");
  const [ locationError, setLocationError ] = useState<string | undefined>(undefined);

  const [ formState, action, pending ] = useActionState(submitForm, { success: true, errors: {}});

  return <>{formState?.errors?.misc && <ErrorCard message={formState.errors.misc} />}
    <FormCard action={action}>
      <input type="hidden" name="lat" value={pos?.lat} />
      <input type="hidden" name="lng" value={pos?.lng} />
      <ImageDropzone fieldName="image" onImageChange={handleImageChange} note={formState.errors?.image ?? imageError ?? undefined} />

      <div className={style.location}>
        <TextInput type="text"
          name="loclabel"
          value={locationText ?? ""}
          placeholder={!pos ? "Pobierz lokalizację" : undefined}
          readOnly
          note={
            pos ? `${pos.lat}, ${pos.lng}` : undefined
          } />
        <Button
          type="button"
          disabled={!(isImageAdded && !pos)}
          onClick={handleGetGPS}>
          Wykryj
        </Button>
      </div>

      <TextInput
        name='desc'
        placeholder="przy sklepie"
        label="Opis miejsca"
        error={locationError}/>
      <Button
        rank={ButtonRank.Primary}
        disabled={pending}>
        {pending ? "Wysyłanie..." : "Wyślij"}
      </Button>
    </FormCard>
  </>;

  function handleGetGPS() {
    console.log("Trying to get gps");

    setLocationError(undefined);

    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser.");
      return setLocationError("Twoja przeglądarka nie wspiera geolokalizacji");
    } else {
      console.log("Geolocation is ok.");


      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          console.log(`Got location: ${pos.coords.latitude}, ${pos.coords.longitude}`);
          setPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLocationText(await getLocaltionString({ lat: pos.coords.latitude, lng: pos.coords.longitude }));
        },
        () => {
          setLocationError("Nie udało sie pobrac lokalizacji");
        },
        { enableHighAccuracy: true }
      );
    }
  }

  async function getLocaltionString(pos: { lat: number; lng: number }): Promise<string> {
    const res = await fetch(`https://eu1.locationiq.com/v1/reverse?key=${process.env.NEXT_PUBLIC_LOCATIONIQ_KEY}&lat=${pos.lat}&lon=${pos.lng}&normalizeaddress=1&format=json`, { headers: { "accept-language": "pl" }});
    const data: GeoCodeResp = await res.json();

    return `${data.address.road ?? ""} ${data.address.house_number ?? ""}, ${data.address.city}`;
  }

  async function handleImageChange(image: string | ArrayBuffer | null) {
    setImageAdded(false);
    setImageError(null);
    setPos(undefined);
    setLocationText("");

    if (!image) {
      return setImageError("Nie przekazano pliku");
    }

    setImageAdded(true);
    const { latitude, longitude } = await exifr.gps(image) ?? {};

    if (latitude && longitude) {
      setPos({ lat: latitude, lng: longitude });
      setLocationText(await getLocaltionString({ lat: latitude, lng: longitude }));
    } else {
      setImageError("Nie znaleziono lokalizacji");
    }
  }
}
