/* eslint-disable @typescript-eslint/no-explicit-any */
import './App.css'
import { Perfil } from './components/Perfil'
import { useQuery } from '@tanstack/react-query'
import { fetchReposData, fetchUserData } from './services/api'
import { useUserStore } from './store/userStore'

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
        <div className="flex flex-col">
            <Perfil image={userData.avatar_url} name={userData.name} bio={userData.bio} infos={{ company: userData.company, location: userData.location }} />
        </div>
    )
}

export default App
