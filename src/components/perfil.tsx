/* eslint-disable @typescript-eslint/no-explicit-any */
interface PerfilProps {
    image: string;
    name: string;
    bio: string;
    repos: any[];
}

export const Perfil = ({ image, name, bio, repos }: PerfilProps) => {
    return (
        <div className="flex flex-col items-center p-4">
            <img src={image} alt={`Foto de ${name}`} style={{ width: '100px', borderRadius: '50%' }} />
            <h1>{name}</h1>
            <p>{bio}</p>

            <h2>Repositórios:</h2>
            <ul>
                {repos.map(repo => (
                    <li key={repo.id}>{repo.name}</li>
                ))}
            </ul>
        </div>
    )
}
