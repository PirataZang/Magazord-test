import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export const Header = () => {
    return (
        <div id="Header" className="hidden sm:flex w-full bg-[#24292E] gap-2 h-[75px] p-5 items-center text-white">
            <FontAwesomeIcon className="text-2xl" icon={faGithub} />
            <h1 className="text-2xl font-bold ml-2">GitHub</h1>
            <h1 className="text-2xl font-bold ml-2">/</h1>
            <span>profile</span>
        </div>
    )
}
