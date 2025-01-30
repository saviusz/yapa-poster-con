import style from "./index.module.scss";

import Image from "next/image";

import poster from "@/assets/image.png";
import Button, { ButtonRank } from "@/components/Controls/Button";
import { createClient } from "@/utils/supabase/server";

import { SubmissionFormCard } from "./SubmissionFormCard";

export default async function Index() {

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  return <main className={style.main}>
    <header className={style.header}>
      <h1>YAPA Postercon</h1>
      <p>Postercon to konkurs powiązany z festiwalem piosenki turystycznej YAPA. Polega na robieniu zdjęć przy plakatach w miejscach, które tworzą logo YAPY na mapie. Uczestnicy przesyłają zdjęcia z geotagiem do tej aplikacji, aby stać się częścią unikalnego projektu artystycznego. To okazja do kreatywnego wyrażenia siebie i odkrywania pięknych miejsc!</p>
      {!user && <Button rank={ButtonRank.Primary} className={style.cta} href="/register">Zarejestruj się</Button>}
    </header>

    <section className={style.form}>
      { user
        ? <SubmissionFormCard />
        : <Poster />
      }
    </section>

  </main>;
}

function Poster() {
  return <div>
    <Image
      src={poster}
      alt="Plakat YAPY"
      className={style.poster}
    />
  </div>;
}

