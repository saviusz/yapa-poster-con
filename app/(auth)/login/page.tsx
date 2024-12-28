"use client";

import React from "react";
import { useActionState } from "react";

import { signInAction } from "@/app/(auth)/actions";
import Button, { ButtonRank } from "@/components/Controls/Button";
import TextInput from "@/components/Controls/TextInput";
import ErrorCard from "@/components/ErrorCard";
import { FormCard } from "@/components/FormCard";

export default function Index() {

  const [ state, action, pending ] = useActionState(signInAction, {});

  return <section>
    <h1>Zaloguj się</h1>
    {state?.misc && <ErrorCard message={state.misc} />}
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
    </FormCard>
  </section>;

}
