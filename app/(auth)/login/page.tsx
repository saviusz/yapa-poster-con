"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { useActionState } from "react";

import { signInAction } from "@/app/(auth)/actions";
import Button, { ButtonRank } from "@/components/Controls/Button";
import TextInput from "@/components/Controls/TextInput";
import { FormCard } from "@/components/FormCard";
import StatusCard from "@/components/StatusCard";

export default function Index() {

  return <main>
    <h1>Zaloguj się</h1>
    <Suspense><Form /></Suspense>
  </main>;

}


function Form() {
  const [ state, action, pending ] = useActionState(signInAction, {});
  const success = useSearchParams().get("success");
  return <>
    {(state?.misc && <StatusCard message={state.misc} />)
    || (success && <StatusCard message="Pomyślnie zarejestrowano. Sprawdź maila, by zweryfikować konto" type="success" title="Sukces" />)}
    <FormCard action={action}>
      <TextInput
        type="email"
        label='Email'
        name='email'
        error={state?.email}
        placeholder="email@example.com"
      />
      <TextInput
        type="password"
        label='Hasło'
        name='password'
        error={state?.password}
        placeholder="Hasło" />
      <Button
        rank={ButtonRank.Primary}
        disabled={pending}>
        {pending ? "Logowanie..." : "Zaloguj się"}
      </Button>
      <p>Nie masz konta? <Link href="/register">Zarejestruj się!</Link></p>
    </FormCard></>;
}
