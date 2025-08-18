
import { LoginForm } from "@/components/features/auth/login";
import SideImg from "../assets/Logo_optiven8.jpg";
import { Glasses } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid bg-white min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center text-3xl text-blue-800 gap-2 font-black">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Glasses className="size-5" />
            </div>
            <div className="flex">

              <p className="italic mr-1" >OP</p>
              TIVEN
            </div>
          </a>
        </div>
        <div className="flex  w-full">
          <h1 className="text-2xl font-bold">Sistema Web Catálogos</h1>

        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative bg-white hidden lg:flex lg:justify-center lg:items-center">
        <Image
          width={1000}
          height={1000}
          src={SideImg.src}
          alt="Image"
          className=" inset-0  h-[100%] w-[100%] object-contain dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
