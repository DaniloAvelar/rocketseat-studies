import { Header } from "./components/header/Header";
import {Sidebar} from "./components/sidebar/Sidebar"
import { Post, PostType } from "./components/post/Post";


import styles from "./App.module.css";
import "./global.css";

const posts:PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: "https://avatars.githubusercontent.com/u/83288346?v=4",
      name: "Danilo Avelar",
      role: "Developer ReactJS",
    },
    content: [
      {type: 'paragraph', content: 'Fala galera ...',},
      {type: 'paragraph', content: 'Acabei de chegar nessa rede, e curti muito, parabens',},
      {type: 'link', content: 'https://github.com/DaniloAvelar',} 
    ],
    publishedAt: new Date('2024-12-05 11:00:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://avatars.githubusercontent.com/u/99692339?v=4",
      name: "Ruan Arjona",
      role: "Developer --> Python",
    },
    content: [
      {type: 'paragraph', content: 'E ai Cambada',},
      {type: 'paragraph', content: 'Acabei de chegar nessa rede, e curti muito, Shoooowwww',},
      {type: 'link', content: 'https://github.com/DaniloAvelar',} 
    ],
    publishedAt: new Date('2024-12-05 11:03:00'),
  },
  {
    id: 3,
    author: {
      avatarUrl: "https://avatars.githubusercontent.com/u/1038385?v=4",
      name: "Igot Curvelo",
      role: "Java Developer",
    },
    content: [
      {type: 'paragraph', content: 'Fodaaaaaaaa ...',},
      {type: 'paragraph', content: 'Acabei de chegar nessa rede, e curti muito, TOPPPPPPPP',},
      {type: 'link', content: 'https://github.com/DaniloAvelar',} 
    ],
    publishedAt: new Date('2024-12-05 11:00:00'),
  },

];

function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <aside>
          <Sidebar />
        </aside>
        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                post={post}
                // author={post.author}
                // content = {post.content}
                // publishedAt = {post.publishedAt} 
              />
            )
          })}
        </main>
      </div>
    </div>
  );
}

export default App;
