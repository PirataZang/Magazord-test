// src/services/githubApi.ts
import "zustand";

interface Release {
  name: string;
  body: string;
}

const releaseCache = new Map<string, Release>();

export const getLatestRelease = async (repoName: string): Promise<Release | null> => {
  if (releaseCache.has(repoName)) {
    return releaseCache.get(repoName)!;
  }

  try {
    const response = await fetch(`https://api.github.com/repos/PirataZang/${repoName}/releases`);
    if (!response.ok) {
      console.error(`Failed to fetch releases for ${repoName}: ${response.statusText}`);
      return null;
    }
    const releases = await response.json();
    if (releases.length > 0) {
      const latestRelease = {
        name: releases[0].name,
        body: releases[0].body,
      };
      releaseCache.set(repoName, latestRelease);
      return latestRelease;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching releases for ${repoName}:`, error);
    return null;
  }
};
