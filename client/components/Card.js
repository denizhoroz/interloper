import Image from 'next/image';
export default function Card({ title, description, image, onClick, children }) {
    return (
        <div
            className="bg-gradient-to-b from-[#232526] via-[#181A1B] to-[#1a2540] rounded-2xl shadow-lg p-6 mb-2 flex flex-col gap-5 sm:flex-row items-start cursor-pointer border-2 border-[#647FBC] hover:border-[#91ADC8]
                transition-all duration-300 ease-in-out hover:shadow-2xl"
            onClick={onClick}
            tabIndex={0}
            role="button"
        >
            {image && (
                <Image
                    src={image}
                    alt={title}
                    width={320}
                    height={160}
                    className="w-full sm:w-50 md:w-80 h-40 md:h-56 object-cover rounded-lg mb-3 sm:mb-0 flex-shrink-0"
                />
            )}
            <div className="flex flex-col gap-2">
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#AED6CF]">{title}</h3>
                <p className="text-xl md:text-2xl text-[#91ADC8] mb-2">{description}</p>
                {children}
            </div>
        </div>
    );
}