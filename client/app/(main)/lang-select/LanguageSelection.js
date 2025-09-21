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
            <div className="flex flex-col w-screen">
                {/* Header */}
                {/* Hero Section */}
                <main className="flex-1 flex flex-col items-center justify-center px-2 py-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 md:mb-16 text-[#E3F6F5] drop-shadow-lg text-center mt-10">
                        Bir Dil Seç
                    </h1>
                    <div className="bg-[#232526]/90 rounded-2xl shadow-lg p-6 mb-10 max-w-2xl w-full flex flex-col items-center border-2 border-[#647FBC]">
                        <p className="text-base sm:text-lg md:text-xl text-[#91ADC8] font-semibold text-center leading-relaxed mb-6">
                            Aşağıdan öğrenmek istediğin dili seç ve hemen pratiğe başla!
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl text-center">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    className={`flex-1 bg-gradient-to-r from-[#647FBC] via-[#91ADC8] to-[#AED6CF] text-white font-bold py-4 rounded-xl text-xl shadow-lg border-2 border-[#91ADC8] text-center
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
                <StarsBackground starDensity={0.0003} />
            </div>
        </>
    )
}