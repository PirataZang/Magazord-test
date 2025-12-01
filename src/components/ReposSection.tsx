// Seu novo arquivo src/components/ReposSection.tsx

import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookBookmark, faStar, faChevronDown, faMagnifyingGlass, faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import { getLatestRelease } from '../services/githubApi'

type RepoData = any[]
interface ReposSectionProps {
    reposData: RepoData
}

const RepoRelease: React.FC<{ repo: any }> = ({ repo }) => {
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
                    <FontAwesomeIcon icon={faStar} /> {repo?.language}
                </span>
                <span className="">
                    <FontAwesomeIcon icon={faCodeBranch} /> {repo?.language}
                </span>
            </div>
        </div>
    )
}

export const ReposSection: React.FC<ReposSectionProps> = ({ reposData }) => {
    const [activeTab, setActiveTab] = useState<'repos' | 'starred'>('repos')
    const starredCount = 12

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

    const FilterButton: React.FC<{ label: string }> = ({ label }) => (
        <button className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-3 rounded-full text-sm transition-colors duration-150">
            <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
            {label}
        </button>
    )

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
                    <span className="bg-gray-100 text-gray-500 text-xs font-bold py-0.5 px-2 rounded-full">{starredCount}</span>
                </div>
            </div>

            <div className="flex flex-col-reverse lg:flex-row gap-3 p-4 text-gray-500">
                <div className="flex gap-2 items-center ">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input type="text" placeholder="Search Here" className="p-2 rounded-md w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>

                <div className="flex gap-2">
                    <FilterButton label="Type" />
                    <FilterButton label="Language" />
                </div>
            </div>

            <div className="p-4">
                {activeTab === 'repos' && (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Repositórios de {reposData.length}</h3>
                        <div className="flex gap-10 flex-col">
                            {reposData.map((repo, index) => (
                                <RepoRelease key={index} repo={repo} />
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'starred' && (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold}">Estrelados ({starredCount})</h3>
                        <p className="text-gray-600">Lista dos repositórios estrelados viria aqui...</p>
                    </div>
                )}
            </div>
        </div>
    )
}
