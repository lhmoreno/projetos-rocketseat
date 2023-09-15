type GithubUserData = {
  name: string
  login: string
  bio: string
  company: string | null
  avatar_url: string
  html_url: string
  followers: number
}

type IssueQueryData = {
  items: {
    number: number
    title: string
    body: string
    created_at: string
    updated_at: string
  }[]
}

type PostData = {
  title: string
  body: string
  created_at: string
  updated_at: string
  comments: number
  user: {
    login: string
  }
  html_url: string
}

export const githubApi = {
  async getUser(username: string) {
    const res = await fetch(`https://api.github.com/users/${username}`)
    const data = await res.json() as GithubUserData & {message?: string}

    if (data.message === 'Not Found') {
      return null
    }

    return data
  },

  async getPostsByQuery(username: string, repository: string, query: string) {
    const res = await fetch(`https://api.github.com/search/issues?q=${query}repo:${username}/${repository}`)
    const data = await res.json() as IssueQueryData

    return data.items
  },

  async getPostById(username: string, repository: string, issueId: string) {
    const res = await fetch(`https://api.github.com/repos/${username}/${repository}/issues/${issueId}`)
    const data = await res.json() as PostData & {message?: string}

    if (data.message === 'Not Found') {
      return null
    }

    return data
  }
}
