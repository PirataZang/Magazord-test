import { faBuilding, faChevronDown, faChevronUp, faLink, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

interface PerfilProps {
    image: string
    name: string
    bio: string
    infos: {
        company: string
        location: string
        blog: string
    }
}

export const Perfil = ({ image, name, bio, infos }: PerfilProps) => {
    const [showInfo, setShowInfo] = useState(false)

    return (
        <div className="flex flex-col items-center w-[220px] p-4">
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
                    <FontAwesomeIcon className="text-sm text-blue-400" icon={showInfo ? faChevronUp : faChevronDown} />
                </div>
            </div>

            <div className="flex mt-2 text-start w-[380px] sm:w-full">
                {showInfo && (
                    <ul className="bg-gray-100 rounded-2xl w-full p-5 flex gap-4 flex-col">
                        <li className="text-sm flex gap-3 text-blue-400">
                            <FontAwesomeIcon icon={faBuilding} />
                            {infos.company || 'N/A'}
                        </li>
                        <li className="text-sm flex gap-3 text-blue-400">
                            <FontAwesomeIcon icon={faLocationDot} />
                            {infos.location || 'N/A'}
                        </li>
                        <li className="text-sm flex gap-3 text-blue-400">
                            <FontAwesomeIcon icon={faLink} />
                            {infos.blog || 'N/A'}
                        </li>
                    </ul>
                )}
            </div>
        </div>
    )
}
