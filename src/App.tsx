import { useState, useEffect } from 'react'
import './App.css'
import { Perfil } from './components/perfil'  

function App() {
    const [userData, setUserData] = useState<any>(null)
    const [reposData, setReposData] = useState<any[]>([])

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await fetch('https://api.github.com/users/PirataZang')
                const userData = await userResponse.json()
                setUserData(userData)
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error)
            }
        }

        const fetchReposData = async () => {
            try {
                const reposResponse = await fetch('https://api.github.com/users/PirataZang/repos')
                const reposData = await reposResponse.json()
                setReposData(reposData)
            } catch (error) {
                console.error('Erro ao buscar repositórios:', error)
            }
        }

        fetchUserData()
        fetchReposData()
    }, [])

    if (!userData) {
        return <div>Carregando...</div>
    }

    return (
        <>
            <Perfil image={userData.avatar_url} name={userData.name} bio={userData.bio} repos={reposData} />
        </>
    )
}

export default App
