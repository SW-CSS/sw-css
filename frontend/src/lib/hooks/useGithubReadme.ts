import { useGithubReadmeQuery } from './useApi';

export const useGithubReadme = (repoUrl: string) => {
  const [owner, repo] = repoUrl.replace('https://github.com/', '').split('/');
  return useGithubReadmeQuery(owner, repo, {
    enabled: !!repoUrl,
  });
};
