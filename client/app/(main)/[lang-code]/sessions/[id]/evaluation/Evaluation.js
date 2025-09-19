"use client";
// these will be updated by api in the future
const criteria = [
	{ key: "grammar", label: "Gramer" },
	{ key: "vocabulary", label: "Kelime Dağarcığı" },
	{ key: "fluency", label: "Akıcılık" },
	{ key: "clarity", label: "Açıklık" },
];

const scores = {
	grammar: 7,
	vocabulary: 8,
	fluency: 6,
	clarity: 9,
};

const critiques = {
	grammar: "Cümle yapılarında küçük hatalar mevcut, ancak genel olarak anlaşılır.",
	vocabulary: "Kelime seçiminiz zengin ve çeşitliydi.",
	fluency: "Konuşma sırasında bazı duraksamalar oldu.",
	clarity: "İletmek istediğiniz mesaj net ve anlaşılırdı.",
};

const scenario = {
	title: "Restoran Diyaloğu",
	description: "Bir arkadaşınla restoranda geçen bir konuşma oturumu.",
	details: [
		"Konuşma başlangıcı: Garson ile selamlaşma.",
		"Yemek siparişi verme.",
		"Fatura isteme ve ödeme.",
	],
};

export default function EvaluationPage() {
	return (
		<div className="flex items-center justify-center p-4">
			<div className="bg-[#FAFDD6] rounded-xl shadow-lg p-4 sm:p-8 w-full max-w-5xl flex flex-col md:flex-row gap-8 items-stretch justify-center">
				{/* Scenario Overview */}
				<div className="md:w-2/5 w-full flex flex-col justify-center items-center bg-gradient-to-br from-[#E3F6F5] via-[#FAFDD6] to-[#AED6CF] rounded-2xl shadow-lg p-6 mb-8 md:mb-0 border-4 border-[#AED6CF] text-center min-h-[20rem]">
					<div className="flex items-center justify-center gap-4 mb-4">
						<span className="text-4xl">🍽️</span>
						<h2 className="text-3xl font-extrabold text-[#647FBC] text-left drop-shadow-lg">
							Senaryo Özeti
						</h2>
					</div>
					<h3 className="text-2xl font-bold text-[#647FBC] mb-2">
						{scenario.title}
					</h3>
					<p className="text-xl text-[#647FBC] mb-4 italic">
						{scenario.description}
					</p>
					<ul className="list-disc list-inside text-[#647FBC] space-y-2 pl-2 text-center">
						{scenario.details.map((item, idx) => (
							<li key={idx} className="text-lg font-medium">
								{item}
							</li>
						))}
					</ul>
				</div>
				{/* Evaluation Section */}
				<div className="md:w-3/5 w-full flex flex-col items-center justify-center text-center">
					<h1 className="text-3xl md:text-4xl font-bold text-[#647FBC] mb-6 text-center">
						Senaryo Değerlendirmesi
					</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full justify-items-center">
						{criteria.map((c) => (
							<div
								key={c.key}
								className="flex flex-col items-center bg-[#F5F8E3] rounded-xl p-4 shadow text-center w-full max-w-md min-h-[14rem]"
							>
								<label className="text-xl font-semibold text-[#647FBC] mb-2">
									{c.label}
								</label>
								<div className="w-full h-8 bg-[#E3F6F5] rounded-full overflow-hidden border-2 border-[#AED6CF] mb-2 flex items-center">
									<div
										className="h-full bg-gradient-to-r from-[#91ADC8] via-[#647FBC] to-[#AED6CF] transition-all"
										style={{ width: `${(scores[c.key] / 10) * 100}%` }}
									/>
								</div>
								<span className="text-lg text-[#647FBC] mb-2">
									Puan: {scores[c.key]}/10
								</span>
								<div className="w-full bg-[#E3F6F5] rounded-lg p-2 border-4 border-[#AED6CF] text-base text-[#647FBC] text-center min-h-[3rem] flex items-center justify-center">
									{critiques[c.key]}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}