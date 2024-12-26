
import style from "./index.module.scss";
import { SubmissionFormCard } from "./SubmissionFormCard";

export default function Index() {

  return <main className={style.main}>
    <header className={style.header}>
      <h1>YAPA Postercon</h1>
      <p>Postercon to konkurs powiązany z festiwalem piosenki turystycznej YAPA. Polega na robieniu zdjęć przy plakatach w miejscach, które tworzą logo YAPY na mapie. Uczestnicy przesyłają zdjęcia z geotagiem do tej aplikacji, aby stać się częścią unikalnego projektu artystycznego. To okazja do kreatywnego wyrażenia siebie i odkrywania pięknych miejsc!</p>
    </header>

    <section className={style.form}>
      <SubmissionFormCard />
    </section>

  </main>
}


