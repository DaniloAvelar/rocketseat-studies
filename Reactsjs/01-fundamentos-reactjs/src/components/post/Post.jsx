/* eslint-disable react/prop-types */
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Avatar } from "../avatar/Avatar";
import { Comment } from "../comment/Comment";
import { useState } from "react";
import styles from "./Post.module.css";


export function Post({ author, publishedAt, content }) {

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  const [comments, setComments] = useState(["Post muito bacana, hein!"]);

  const [newCommentText, setNewCommentText] = useState('');

  function handleNewCommentChange(){
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  function handleCreateNewComment() {
    event.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  function handleNewCommentInvalid() {
    event.target.setCustomValidity("Este campo é obrigatório");
  }

  //Recebe qual comentario quero deletar
  function deleteComment(commentToDelete){
    const commentsListWithoutDeleteOne = comments.filter(comment => {
      return comment !==  commentToDelete;
    })

    setComments(commentsListWithoutDeleteOne);
  }

  const isNewCommentEmpty = newCommentText.length == 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar className={styles.avatar} src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        {/* DATA */}
        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeNow}
        </time>
      </header>
      <div className={styles.content}>
        {content.map((item) => {
          if (item.type === "paragraph") {
            return (
                <p key={item.id}>{item.content}</p>
            );
          } else if (item.type === "link") {
            return (
                <p key={item.id}>
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
