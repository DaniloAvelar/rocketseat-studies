import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Avatar } from "../avatar/Avatar";
import { Comment } from "../comment/Comment";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import styles from "./Post.module.css";

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

export interface PostType {
  author: Author;
  publishedAt: Date;
  content: Content[];
  id:number
}

interface PostProps {
  post: PostType;
}

export function Post({post}: PostProps) {

  const publishedDateFormatted = format(
    post.publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  const [comments, setComments] = useState(["Post muito bacana, hein!"]);

  const [newCommentText, setNewCommentText] = useState('');

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Este campo é obrigatório");
  }

  //Recebe qual comentario quero deletar
  function deleteComment(commentToDelete: string) {
    const commentsListWithoutDeleteOne = comments.filter(comment => {
      return comment !== commentToDelete;
    })

    setComments(commentsListWithoutDeleteOne);
  }

  const isNewCommentEmpty = newCommentText.length == 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar className={styles.avatar} src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>
        {/* DATA */}
        <time
          title={publishedDateFormatted}
          dateTime={post.publishedAt.toISOString()}
        >
          {publishedDateRelativeNow}
        </time>
      </header>
      <div className={styles.content}>
        {post.content.map((item) => {
          if (item.type === "paragraph") {
            return (
              <p>{item.content}</p>
            );
          } else if (item.type === "link") {
            return (
              <p>
                <a href="">{item.content}</a>
              </p>

            );
          }
        })}
      </div>
      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map((comment) => {
          return <Comment key={comment} content={comment} deleteComment={deleteComment} />;
        })}
      </div>
    </article>
  );
}
