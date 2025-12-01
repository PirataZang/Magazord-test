export const fetchUserData = async (username: string) => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const fetchReposData = async (username: string) => {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const fetchStarredData = async (username: string) => {
    const response = await fetch(`https://api.github.com/users/${username}/starred`)
    debugger
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
