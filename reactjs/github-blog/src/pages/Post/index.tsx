import styles from "./styles.module.css";
import githubSvg from "../../assets/icons/github.svg";
import calendarSvg from "../../assets/icons/calendar.svg";
import chatSvg from "../../assets/icons/chat.svg";
import shareSvg from "../../assets/icons/share.svg";
import arrowLeftSvg from "../../assets/icons/arrow-left.svg";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useQuery } from "react-query";
import { githubApi } from "../../lib/githubApi";

type Post = {
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  commentsAmount: number;
  author: string;
  githubUrl: string;
};

export function Post() {
  const params = useParams();
  const id = params.id ?? "";

  const { data } = useQuery<Post>(["post", id], async () => {
    const res = await githubApi.getPostById("lhmoreno", "github-blog", id);
    if (!res) throw new Error("Post not found");

    const post: Post = {
      title: res.title,
      author: res.user.login,
      commentsAmount: res.comments,
      githubUrl: res.html_url,
      createdAt: res.created_at,
      updatedAt: res.updated_at,
      description: res.body,
    };

    return post;
  });

  if (!data) {
    return <span>Carregando...</span>;
  }

  const createdAt = formatDistanceToNow(new Date(data.createdAt), {
    addSuffix: true,
    locale: ptBR,
  });

  const updatedAt = formatDistanceToNow(new Date(data.updatedAt), {
    addSuffix: true,
    locale: ptBR,
  });

  const publishedAt =
    createdAt === updatedAt ? "criado " + createdAt : "atualizado " + updatedAt;

  return (
    <div>
      <div className={styles.postInfo}>
        <div>
          <NavLink to="/">
            <img src={arrowLeftSvg} alt="" />
            Voltar
          </NavLink>
          <a href={data.githubUrl} target="_blank" rel="noopener noreferrer">
            Ver no Github
            <img src={shareSvg} alt="" />
          </a>
        </div>
        <h1>{data.title}</h1>
        <footer>
          <span>
            <img src={githubSvg} alt="" />
            {data.author}
          </span>
          <span>
            <img src={calendarSvg} alt="" />
            {publishedAt}
          </span>
          <span>
            <img src={chatSvg} alt="" />
            {data.commentsAmount} comentários
          </span>
        </footer>
      </div>

      <div className={styles.description}>
        <ReactMarkdown
          children={data.description}
          components={{
            code({ _, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
    </div>
  );
}
