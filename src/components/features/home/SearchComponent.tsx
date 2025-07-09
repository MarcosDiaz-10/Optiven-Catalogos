'use client'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { z } from 'zod';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useState } from "react"
import clsx from "clsx"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"


const recentSearches = [
    "Monturas Oftalmicas",
    "Lentes de Sol",
    "Cristales"
]


const searchSchema = z.object({
    search: z.string().min(1, "La busqueda debe contener al menos 1 caracter"),
})

export const SearchComponent = () => {
    const form = useForm<z.infer<typeof searchSchema>>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            search: "",
        },
    })

    const [isFocus, setIsFocus] = useState(false)
    const onSubmit = (data: z.infer<typeof searchSchema>) => {
        console.log(data)
    }

    return (
        <>
            <div
                className={clsx(
                    'fixed inset-0 z-10 bg-black/50 transition-opacity',
                    { 'opacity-100 visible': isFocus, 'opacity-0 invisible': !isFocus }
                )}
                onClick={() => setIsFocus(false)}
            />
            <div className="relative w-full  z-20" onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    setIsFocus(false)
                }
            }}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={clsx("flex items-center justify-center w-full rounded-lg transition-colors focus-within:ring-1 focus-within:ring-gray-700 focus-within:ring-offset-1 border-none")}>
                        <FormField
                            control={form.control}
                            name="search"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input id="search" onFocus={() => setIsFocus(true)} type="search" className={clsx("rounded-r-none bg-white border-0 focus-visible:ring-0 focus-visible:ring-offset-0")} placeholder="Buscar Catálogos" {...field} />

                                    </FormControl>
                                </FormItem>
                            )}

                        />
                        <Button type="submit" className={clsx("text-gray-300 rounded-none rounded-r-lg bg-gray-700 p-2 flex items-center justify-center")}><Search size={20} /></Button>
                    </form>
                    <Command className={clsx(
                        "absolute top-full mt-1 w-full h-min rounded-lg border bg-white shadow-md  transition-all duration-300 ease-in-out ",
                        {
                            'opacity-100 visible translate-y-0': isFocus, 'opacity-0 invisible -translate-y-2': !isFocus
                        })}>
                        <CommandList>
                            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                            <CommandGroup heading="Búsquedas Recientes">
                                {recentSearches.map((search) => (
                                    <CommandItem
                                        key={search}
                                        onSelect={() => {
                                            form.setValue("search", search);
                                            form.handleSubmit(onSubmit)();
                                        }}
                                    >
                                        {search}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </Form >
            </div >
        </>
    )
}
