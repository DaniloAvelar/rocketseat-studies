import { Avatar } from '../avatar/Avatar';
import styles from './Sidebar.module.css';
import {PencilLine} from 'phosphor-react';

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
        <img 
            className={styles.cover} 
            src="https://plus.unsplash.com/premium_photo-1661882403999-46081e67c401?q=50&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        />
        <div className={styles.profile}>
            {/* <img className={styles.avatar} src="https://github.com/daniloavelar.png" alt="" /> */}
            <Avatar src="https://github.com/daniloavelar.png" />
            <strong>Danilo Avelar</strong>
            <span>Web Developer</span>
        </div>

        <footer>
            <a href="#">
                <PencilLine size={20} />
                Editar Perfil
            </a>
        </footer>
    </aside>
  )
}
