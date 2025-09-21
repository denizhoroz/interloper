import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import Image from "next/image";
export default function About() {
    return (
        <div className="flex flex-col w-screen items-center justify-center">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#E3F6F5] drop-shadow-lg mb-8 text-center">
                Hakkında
            </h1>
            <div className="flex justify-center items-center font-serif rounded-2xl shadow-lg py-3 max-w-3xl w-full text-[#91ADC8] text-lg sm:text-xl md:text-2xl font-semibold space-y-6">
                canımız kod yazmak istedi, böyle bir site yaptık :)
            </div>
            <Image
                src="/annoying-dog-undertale.gif"
                alt="Annoying Dog"
                width={256}
                height={256}
                className="w-64 h-64 object-contain mt-[-32px]"
            />
            <StarsBackground starDensity={0.0003} />
            <ShootingStars />
        </div>
    );
}