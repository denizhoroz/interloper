import Card from '../../../../components/Card';

export default function Sessions() {

    return (
        <div className='min-h-screen p-8 bg-[#E3F6F5] flex flex-col gap-6'>
            <h1 className='text-6xl font-bold text-[#647FBC] text-center'>Senaryolar</h1>
            <div className='w-full max-w-5xl mx-auto gap-4 mt-8'>
                <Card
                    title="Restoran Diyaloğu"
                    description="Bir Alman arkadaşınla restoranda geçen bir konuşma oturumu."
                    image="placeholder.png"
                />
                <Card
                    title="Restoran Diyaloğu"
                    description="Bir Alman arkadaşınla restoranda geçen bir konuşma oturumu."
                    image="placeholder.png"
                />
            </div>

        </div>
    );
}
