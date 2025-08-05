'use client';
import { useEffect, useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog"
import { Button } from "./ui/button";

export const ErrorComponent = ({ msgError, isError }: { msgError: string, isError: boolean }) => {
    const [open, setOpen] = useState(isError);

    useEffect(() => {
        setOpen(isError);
    }, [isError])


    return (
        <>
            <div className=" relative z-50 w-screen h-screen">
                <AlertDialog open={open} >
                    <AlertDialogContent className="absolute top-20  -translate-y-0 bg-red-100 border-none">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-xl text-red-600">Lo sentimos. Ha ocurrido un error </AlertDialogTitle>
                            <AlertDialogDescription className="text-red-800">
                                {msgError}. En caso de que el problema persista contacte a soporte.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <Button onClick={() => setOpen(false)} className="bg-red-200 border-red-500 text-red-800" variant={"outline"}>Continuar</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

        </>
    )
}
