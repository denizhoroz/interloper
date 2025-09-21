"use client";
import { useRouter } from "next/navigation";
import { StarsBackground } from "@/components/ui/stars-background";


export default function LanguageSelection() {
    const router = useRouter();
    const languages = [
        { code: "gb", name: "İngilizce", disabled: false },
        { code: "de", name: "Almanca", disabled: true }
    ];
    
    return (
        <>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.3.2/css/flag-icons.min.css" />
            <div className="flex flex-col">
                {/* Header */}
                {/* Hero Section */}
                <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-14 md:mb-30 text-[#E3F6F5] drop-shadow-lg text-center">
                        Bir Dil Seç
                    </h1>
                    <div className="bg-[#232526]/90 rounded-2xl shadow-lg p-10 mb-16 max-w-3xl w-full flex flex-col items-center border-2 border-[#647FBC]">
                        <p className="text-xl sm:text-2xl md:text-3xl text-[#91ADC8] font-semibold text-center leading-relaxed mb-8">
                            Aşağıdan öğrenmek istediğin dili seç ve hemen pratiğe başla!
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 w-full max-w-2xl text-center">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    className={`flex-1 bg-gradient-to-r from-[#647FBC] via-[#91ADC8] to-[#AED6CF] text-white font-bold py-6 rounded-xl text-3xl shadow-lg border-2 border-[#91ADC8] text-center
                                        transition-all duration-300 ease-in-out
                                        ${lang.disabled ? "opacity-50 cursor-not-allowed" : "hover:text-[#232526] hover:scale-105 hover:shadow-2xl cursor-pointer"}`
                                    }
                                    onClick={() => {
                                        if (!lang.disabled) router.push(`/${lang.code}/sessions`);
                                    }}
                                    disabled={lang.disabled}
                                >
                                    <span className={`fi fi-${lang.code}`}></span>&nbsp;&nbsp;
                                    {(lang.disabled ? "Yakında" : lang.name )}
                                </button>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
            <StarsBackground starDensity={0.0003} />
        </>
    )
}