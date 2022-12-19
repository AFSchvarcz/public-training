import styles from "./Info.module.css";

interface InfoComponentProps {
    created: number;
    completed: number
}

export function Info({created, completed}: InfoComponentProps) {
  return (
    <div className={styles.info}>
      <div>
        <span>Tarefas criadas</span>
        <div>
          <span>{created}</span>
        </div>
      </div>
      <div>
        <span>Concluídas</span>
        <div>
          <span>{created ? `${completed} de ${created}` : 0}</span>
        </div>
      </div>
    </div>
  );
}
