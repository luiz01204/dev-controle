"use client"

import { RegisterOptions, UseFormRegister } from "react-hook-form"

interface inputProps{
    type: string,
    placeholder: string,
    name: string,
    register: UseFormRegister<any>,
    error?: string,
    rule?: RegisterOptions;
}

export default function Input({ type, name, placeholder, register, error, rule }: inputProps) {
  return (
    <>
        <input
            className="w-full border-2 rounded h-11 px-2"
            type={type} 
            placeholder={placeholder}
            {...register(name,rule)}
            id={name}
        />

        {error && (
            <p className="text-red-500 my-2">
                {error}
            </p>
        )}
    </>
  )
}
