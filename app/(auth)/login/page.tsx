"use client";

import Button, { ButtonRank } from '@/components/Controls/Button'
import React from 'react'

import { useActionState } from "react";

import { signInAction } from "@/app/(auth)/actions";
import ErrorCard from '@/components/ErrorCard';
import { FormCard } from '@/components/FormCard';
import TextInput from '@/components/Controls/TextInput';

export default function Index() {

    const [state, action, pending] = useActionState(signInAction, undefined);

    return <>
        <h1>Zaloguj się</h1>
        {state?.success && <ErrorCard message={"Błędny email lub hasło"} />}
        <FormCard action={action}>
            <TextInput type="email" label='Email' name='email' />
            <TextInput type="password" label='Hasło' name='password' />
            <Button rank={ButtonRank.Primary} disabled={pending}>Zaloguj się</Button>
        </FormCard>
    </>

}