import Link from "next/link";
export default function LanguageSelection() {
    const languages = [
        { code: "de", name: "Almanca" },
        { code: "gb", name: "İngilizce" },

    ];
    return (
        <>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.3.2/css/flag-icons.min.css" />
            <div className="flex flex-col min-h-screen bg-[#FAFDD6]">
                {/* Header */}
                {/* Hero Section */}
                <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-[#91ADC8] via-[#647FBC] to-[#AED6CF]">
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-14 md:mb-30 text-[#FAFDD6] drop-shadow-lg text-center">
                        Bir Dil Seç
                    </h1>
                    <div className="bg-[#FAFDD6]/90 rounded-2xl shadow-lg p-10 mb-16 max-w-3xl w-full flex flex-col items-center">
                        <p className="text-2xl sm:text-3xl md:text-4xl text-[#647FBC] font-semibold text-center leading-relaxed mb-8">
                            Aşağıdan öğrenmek istediğin dili seç ve hemen pratiğe başla!
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 w-full max-w-2xl text-center">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    className="bg-[#647FBC] text-[#FAFDD6] font-bold py-8 rounded-2xl text-4xl shadow-xl hover:bg-[#91ADC8] hover:text-[#647FBC] transition min-h-[100px] hover:cursor-pointer"
                                >
                                    <span className={`fi fi-${lang.code}`}></span>&nbsp;&nbsp;
                                    {lang.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}