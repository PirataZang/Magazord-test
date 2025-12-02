// Seu novo arquivo src/components/ReposSection.tsx

import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookBookmark, faStar, faChevronDown, faMagnifyingGlass, faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import { getLatestRelease } from '../services/githubApi'
import collect from 'collect.js'

type RepoData = any[]
type StarredData = any[]
interface ReposSectionProps {
    reposData: RepoData
    starredData: StarredData
}

const RepoRelease: React.FC<{ repo: any; starred?: boolean }> = ({ repo, starred }) => {
    const [releaseName, setReleaseName] = useState('Loading...')
    const [releaseBody, setReleaseBody] = useState('Loading...')

    useEffect(() => {
        const fetchRelease = async () => {
            const release = await getLatestRelease(repo.name)
            if (release) {
                setReleaseName(release.name)
                setReleaseBody(release.body)
            } else {
                setReleaseName('No release found')
                setReleaseBody(repo.description ?? 'Sem descrição')
            }
        }

        fetchRelease()
    }, [repo.name, repo.description])

    return (
        <div className="flex flex-col gap-3">
            <div>
                <span className="">
                    {repo?.name} / <span className="text-blue-500">{releaseName}</span>
                </span>
            </div>
            <div>
                <span className="text-sm text-gray-400">{releaseBody}</span>
            </div>
            <div className="flex gap-10">
                <span className="">
                    <FontAwesomeIcon hidden={starred} icon={faStar} /> {starred ? repo.language : repo?.stargazers_count}
                </span>
                <span className="">
                    <FontAwesomeIcon icon={faCodeBranch} /> {repo?.forks_count}
                </span>
            </div>
        </div>
    )
}

export const ReposSection: React.FC<ReposSectionProps> = ({ reposData, starredData }) => {
    const [activeTab, setActiveTab] = useState<'repos' | 'starred'>('repos')
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
    const [showLanguageFilter, setShowLanguageFilter] = useState(false)

    const languages = collect(reposData).pluck('language').unique().all()

    const getTabClasses = (tabName: 'repos' | 'starred') => {
        const isActive = activeTab === tabName
        let classes = 'py-3 px-4 text-sm font-semibold cursor-pointer flex items-center gap-2 transition-all duration-150'

        if (isActive) {
            classes += ' border-b-2 border-red-500 text-gray-900'
        } else {
            classes += ' border-b-2 border-transparent text-gray-500 hover:text-gray-900'
        }

        return classes
    }

    const handleLanguageChange = (language: string) => {
        setSelectedLanguages((prev) => (prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language]))
    }

    const filteredRepos = reposData.filter((repo) => {
        const nameMatch = repo.name.toLowerCase().includes(searchTerm.toLowerCase())
        const languageMatch = selectedLanguages.length === 0 || selectedLanguages.includes(repo.language)
        return nameMatch && languageMatch
    })

    const starredRepos: any[] = starredData
    const filteredStarredRepos = starredRepos.filter((repo) => {
        const nameMatch = repo.name.toLowerCase().includes(searchTerm.toLowerCase())
        const languageMatch = selectedLanguages.length === 0 || selectedLanguages.includes(repo.language)
        return nameMatch && languageMatch
    })

    return (
        <div className="w-full">
            <div className="flex ">
                <div className={getTabClasses('repos')} onClick={() => setActiveTab('repos')}>
                    <FontAwesomeIcon icon={faBookBookmark} />
                    <span>Repositories</span>
                    <span className="bg-gray-100 text-gray-500 text-xs font-bold py-0.5 px-2 rounded-full">{reposData.length}</span>
                </div>

                <div className={getTabClasses('starred')} onClick={() => setActiveTab('starred')}>
                    <FontAwesomeIcon icon={faStar} />
                    <span>Starred</span>
                    <span className="bg-gray-100 text-gray-500 text-xs font-bold py-0.5 px-2 rounded-full">{starredData.length}</span>
                </div>
            </div>

            <div className="flex flex-col-reverse lg:flex-row gap-3 p-4 text-gray-500">
                <div className="flex gap-2 items-center ">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input type="text" placeholder="Search Here" className="p-2 rounded-md w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-blue-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>

                <div className="flex gap-2">
                    <button className="flex items-center h-[35px] gap-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-3 rounded-full text-sm transition-colors duration-150">
                        <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
                        Type
                    </button>
                    <div className="relative">
                        <button onClick={() => setShowLanguageFilter(!showLanguageFilter)} className="flex items-center h-[35px] gap-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-3 rounded-full text-sm transition-colors duration-150">
                            <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
                            Language
                        </button>
                        {showLanguageFilter && (
                            <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                                {languages.map((lang: any, index) => (
                                    <label key={index} className="flex items-center p-2">
                                        <input type="checkbox" checked={selectedLanguages.includes(lang)} onChange={() => handleLanguageChange(lang)} className="form-checkbox h-4 w-4 text-blue-600" />
                                        <span className="ml-2 text-sm text-gray-700">{lang}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-4">
                {activeTab === 'repos' && (
                    <div className="space-y-4">
                        <div className="flex gap-10 flex-col">
                            {filteredRepos.map((repo, index) => (
                                <RepoRelease key={index} repo={repo} />
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'starred' && (
                    <div className="space-y-4">
                        {filteredStarredRepos.length > 0 ? (
                            <div className="flex gap-10 flex-col">
                                {filteredStarredRepos.map((repo, index) => (
                                    <RepoRelease key={index} repo={repo} starred/>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600">Nenhum repositório estrelado encontrado.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
