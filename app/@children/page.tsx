import style from "./index.module.scss";

import Image from "next/image";

import poster from "@/assets/poster.png";
import Button, { ButtonRank } from "@/components/Controls/Button";
import { createClient } from "@/utils/supabase/server";

import { SubmissionFormCard } from "./SubmissionFormCard";

export default async function Index() {

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  return <main className={style.main}>
    <header className={style.header}>
      <h1>YAPA Postercon</h1>
      <p>Postercon to konkurs powiązany z ogólnopolskim festiwalem piosenki turystycznej "YAPA".</p>
      <p>
        Zadaniem uczestników jest wywiesić jak najwięcej
        yapowych plakatów w różnych miejscach w Łodzi, a
        nagrodą są dwa darmowe karnety na tegoroczną
        Yapę dla trzech pierwszych miejsc, oraz koszulka i yapowy gadżet dla zwycięzcy.
      </p>
      <p>Na tej stronie uczestnicy mogą weryfikować lokalizacje wywieszanych plakatów,
        czyli przesyłać zdjęcia (już powieszonych) plakatów wraz z lokalizacją.
        Na podstawie liczby nadesłanych lokalizacji zostaną wyłonieni zwycięzcy!</p>
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

