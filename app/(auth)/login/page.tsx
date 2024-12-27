"use client";

import Button, { ButtonRank } from '@/components/Button'
import React from 'react'

import { useActionState } from "react";

import { signInAction, signUpAction } from "@/app/(auth)/actions";
import FormField from '@/components/FormField';
import CardContainer from '@/components/CardContainer';
import ErrorCard from '@/components/ErrorCard';

export default function Index({ searchParams }: {
    searchParams?: {
        success?: string,
        error?: string,
    }
}) {

    const [state, action, pending] = useActionState(signInAction, undefined);

    return <>
        <h1>Zaloguj się</h1>
        {state?.success && <ErrorCard message={"Błędny email lub hasło"} />}
        <CardContainer>
            <form action={action}>
                <FormField type={"email"} label='Email' name='email' />
                <FormField type={"password"} label='Hasło' name='password' />
                <Button rank={ButtonRank.Primary} disabled={pending}>Zaloguj się</Button>
            </form>
        </CardContainer>
    </>

}