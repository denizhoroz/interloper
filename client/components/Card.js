import Image from 'next/image';
export default function Card({ title, description, image, onClick, children }) {
    return (
        <div
            className="bg-gradient-to-b from-[#232526] via-[#181A1B] to-[#1a2540] rounded-2xl shadow-lg p-4 mb-1 flex flex-col gap-3 sm:flex-row items-start cursor-pointer border-2 border-[#647FBC] hover:border-[#91ADC8]
                transition-all duration-300 ease-in-out hover:shadow-2xl"
            onClick={onClick}
            tabIndex={0}
            role="button"
        >
            {image && (
                <Image
                    src={image}
                    alt={title}
                    width={240}
                    height={120}
                    className="w-full sm:w-36 md:w-56 h-28 md:h-36 object-cover rounded-lg mb-2 sm:mb-0 flex-shrink-0"
                />
            )}
            <div className="flex flex-col gap-1">
                <h3 className="text-xl md:text-2xl font-extrabold text-[#AED6CF]">{title}</h3>
                <p className="text-base md:text-lg text-[#91ADC8] mb-1">{description}</p>
                {children}
            </div>
        </div>
    );
}