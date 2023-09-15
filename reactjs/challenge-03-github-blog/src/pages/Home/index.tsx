import styles from "./styles.module.css"
import githubSvg from "../../assets/icons/github.svg"
import buildingSvg from "../../assets/icons/building.svg"
import usersSvg from "../../assets/icons/users.svg"
import shareSvg from "../../assets/icons/share.svg"
import { NavLink } from "react-router-dom"
import { FormEvent, useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { githubApi } from "../../lib/githubApi"
import { useQuery } from "react-query"

type User = {
  name: string
  username: string
  bio: string
  company: string | null
  followersAmount: number
  avatarUrl: string
  githubUrl: string
}

type Post = {
  id: number
  title: string
  description: string
  createdAt: string
  updatedAt: string
}

export function Home() {
  const [query, setQuery] = useState('')

  const { data: user } = useQuery<User>(
    ['user'],
    async () => {
      const res = await githubApi.getUser('lhmoreno')
      if (!res) throw new Error('User not found')
      
      const user: User = {
        name: res.name,
        username: res.login,
        avatarUrl: res.avatar_url,
        bio: res.bio,
        company: res.company,
        githubUrl: res.html_url,
        followersAmount: res.followers
      }

      return user
    }
  )

  const { data: posts } = useQuery<Post[]>(
    ['posts', query],
    async () => {
      const res = await githubApi.getPostsByQuery('lhmoreno', 'github-blog', query)
      if (!res) throw new Error('Posts not found')
      
      const posts: Post[] = res.map((issue) => {
        return {
          id: issue.number,
          title: issue.title,
          description: issue.body,
          createdAt: issue.created_at,
          updatedAt: issue.updated_at
        }
      })

      return posts
    }
  )

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const formData = new FormData(ev.currentTarget)
    const queryText = formData.get('query')?.toString() ?? ''

    setQuery(queryText)
  }

  if (!user) {
    return <span>Carregando...</span>
  }

  return (
    <div>
      <div className={styles.profile}>
        <img src={user.avatarUrl} alt="" />
        <div>
          <h2>{user.name}</h2>
          <a 
            href={user.githubUrl}
            target="_blank" 
            rel="noopener noreferrer"
          >
            Github
            <img src={shareSvg} alt="" />
          </a>
          <p>{user.bio}</p>
          <footer>
            <span>
              <img src={githubSvg} alt="" />
              {user.username}
            </span>
            {user.company &&
              <span>
                <img src={buildingSvg} alt="" />
                {user.company}
              </span>
            }
            <span>
              <img src={usersSvg} alt="" />
              {user.followersAmount} seguidores
            </span>
          </footer>
        </div>
      </div>

      <div className={styles.searchContainer}>
        <div>
          <h4>Publicações</h4>
          <span>{posts?.length} publicações</span>
        </div>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="query"
            placeholder="Buscar conteúdo"
            defaultValue={query}
            onChange={ev => ev.target.value === '' && setQuery('')}
          />
        </form>
      </div>

      <div className={styles.postsContainer}>
        {posts?.map((post) => {
          const createdAt = formatDistanceToNow(new Date(post.createdAt), {
            addSuffix: true,
            locale: ptBR
          })

          const updatedAt = formatDistanceToNow(new Date(post.updatedAt), {
            addSuffix: true,
            locale: ptBR
          })

          const publishedAt = createdAt === updatedAt ? 'criado ' + createdAt : 'atualizado ' + updatedAt

          return (
            <NavLink to={`/posts/${post.id}`} key={post.id}>
              <header>
                <h3>{post.title}</h3>
                <span>{publishedAt}</span>
              </header>
              <main>
                <p>{post.description}</p>
              </main>
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}
