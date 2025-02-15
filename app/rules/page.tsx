import style from "./rules.module.scss";

import React from "react";

import CardContainer from "@/components/CardContainer";

export default function Page() {
  return <main className={style.main}>
    <h1>Regulamin konkursu</h1>

    <CardContainer>
      <h3>Cel Konkursu</h3>
      <p>Celem konkursu jest wyłonienie osoby, która powiesi najwięcej plakatów promujących
        festiwal Yapa, które odbędzie się w dniach: 14-16 marca 2025.
      </p>

      <h3>Czas trwania Konkursu</h3>
      <p>Konkurs trwa od 15.02.2025 r. do 09.03.2025 r. (włącznie).</p>

      <h3>Warunki Uczestnictwa</h3>
      <ul>
        <li>
          Uczestnik musi posiadać zgodę właścicieli
          lub zarządców lokali, w których zamierza umieścić plakaty.
        </li>
        <li>Udział w konkursie jest bezpłatny.</li>
      </ul>

      <h3>Zasady Konkursu</h3>
      <ul>
        <li>
          Uczestnicy konkursu mają za zadanie powieszenie jak największej liczby plakatów wydarzenia
          w miejscach publicznych lub w lokalach (np. sklepy, szkoły, biura, kluby, uczelnie).
        </li>
        <li>
          Plakaty będą dostarczane przez Organizatora z siedziby
          (Al. Politechniki 9a, z tyłu budynku) lub w sekretariacie wybranych szkół.
        </li>
        <li>
          Plakaty muszą być powieszane w sposób widoczny,
          zgodnie z obowiązującymi przepisami prawa
          oraz z poszanowaniem prywatności i zasad estetyki.
        </li>
        <li>
          Uczestnik ma obowiązek udokumentować
          każde powieszenie plakatu wprowadzając dane do aplikacji.
        </li>
      </ul>

      <h3>Nagrody</h3>
      <ul>
        <li>Zwycięzcą konkursu zostanie osoba, która powiesi najwięcej plakatów, spełniając wszystkie warunki konkursu.</li>
        <li>Nagrodą główną w konkursie są karnety na Yapę.</li>
        <li>Nagrody nie podlegają wymianie na gotówkę ani inne formy.</li>
      </ul>

      <h3>Przetwarzanie Danych Osobowych</h3>
      <ul>
        <li>Przystępując do konkursu, uczestnik wyraża zgodę na przetwarzanie swoich danych osobowych przez Organizatora w celu przeprowadzenia konkursu oraz kontaktu w sprawach związanych z wygraną.</li>
        <li>Dane osobowe uczestników nie będą wykorzystywane do innych celów marketingowych bez ich dodatkowej zgody.</li>
      </ul>

      <h3>Postanowienia Końcowe</h3>
      <ul>
        <li>Uczestnicy konkursu zobowiązani są do przestrzegania niniejszego regulaminu.</li>
        <li>Organizator zastrzega sobie prawo do zmiany regulaminu w trakcie trwania konkursu, o czym uczestnicy zostaną niezwłocznie poinformowani.</li>
        <li>W sprawach nieuregulowanych niniejszym regulaminem zastosowanie mają przepisy prawa cywilnego.</li>
      </ul>
    </CardContainer>

  </main>;
}
