import styles from "./NewTask.module.css";
import Plus from "../assets/plus.svg";
import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";

interface NewTaskProps {
  onNewTaskButtonClick: (text: string) => void;
}

export function NewTask({ onNewTaskButtonClick }: NewTaskProps) {
  const [text, setText] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onNewTaskButtonClick(text);
    setText("");
  };

  return (
    <form className={styles.wrapper} onSubmit={handleOnSubmit}>
      <input
        placeholder="Adicione uma tarefa..."
        value={text}
        onChange={handleInputChange}
        required
      />
      <button type="submit">
        <span>Criar</span>
        <img src={Plus} />
      </button>
    </form>
  );
}
