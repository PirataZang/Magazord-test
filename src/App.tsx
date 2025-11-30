/* eslint-disable @typescript-eslint/no-explicit-any */
import './App.css'
import { Perfil } from './components/Perfil'
import { useQuery } from '@tanstack/react-query'
import { fetchReposData, fetchUserData } from './services/api'
import { useUserStore } from './store/userStore'
import { Header } from './components/Header'
import { faBookBookmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReposSection } from './components/ReposSection'

function App() {
    const { username } = useUserStore()

    const { data: userData, isLoading: isUserLoading } = useQuery({
        queryKey: ['user', username],
        queryFn: () => fetchUserData(username),
    })

    const { data: reposData, isLoading: isReposLoading } = useQuery({
        queryKey: ['repos', username],
        queryFn: () => fetchReposData(username),
    })

    if (isUserLoading || isReposLoading) {
        return <div>Carregando...</div>
    }

    return (
        <div className="flex flex-col w-full items-center sm:items-baseline">
            <Header />
            <div id="content" className="flex flex-col sm:flex-row sm:gap-5">
                <Perfil image={userData.avatar_url} name={userData.name} bio={userData.bio} infos={{ company: userData.company, location: userData.location, blog: userData.blog }} />
                <div className="w-full">
                    <ReposSection reposData={reposData} />
                </div>
            </div>
        </div>
    )
}

export default App
