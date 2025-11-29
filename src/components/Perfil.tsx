import { faBuilding, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

interface PerfilProps {
    image: string
    name: string
    bio: string
    infos: {
        company: string
        location: string
    }
}

export const Perfil = ({ image, name, bio, infos }: PerfilProps) => {
    const [showInfo, setShowInfo] = useState(false)

    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex flex-col items-center justify-center gap-3 w-[217px] ">
                <img src={image} alt={`Foto de ${name}`} className="rounded-full w-[104px] mb-1" />

                <div className="flex items-center flex-col w-[217px] h-[58px]">
                    <h1 className="text-xl font-bold">{name}</h1>
                    <p className="text-[#989898] text-sm text-center">{bio}</p>
                </div>

                <div className="flex flex-col gap-1 items-center mt-4">
                    <button onClick={() => setShowInfo(!showInfo)} className="text-blue-500 text-sm">
                        Informações adicionais
                    </button>

                    <span className="text-sm text-blue-400">{showInfo ? '▲' : '▼'}</span>
                </div>
            </div>
        </div>
    )
}
