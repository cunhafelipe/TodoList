import React, { useState, useEffect } from "react";
import "./TodoList.css";
import imageTodo from "./assets/todolist.png";

function TodoList() {
  const listaStorage = localStorage.getItem("Lista");
  const [lista, setLista] = useState(
    listaStorage ? JSON.parse(listaStorage) : []
  ); // a lista será responsavel por mostrar os itens que temos.
  const [novoItem, setNovoItem] = useState(""); //pegara o que for escrito no Input principal.

  useEffect(() => {
    localStorage.setItem("Lista", JSON.stringify(lista));
  }, [lista]);

  function adicionaItem(form) {
    form.preventDefault();
    if (!novoItem) {
      return;
    }
    setLista([...lista, { text: novoItem, isCompleted: false }]);
    setNovoItem("");
    document.getElementById("input-entrada").focus();
  }

  function clicou(index) {
    const listaAux = [...lista];
    listaAux[index].isCompleted = !listaAux[index].isCompleted;
    setLista(listaAux);
  }

  function deleta(index) {
    const listaAux = [...lista];
    listaAux.splice(index, 1);
    setLista(listaAux);
  }

  function deletaTudo() {
    setLista([]);
  }

  return (
    <div className="main">
      <h1>Todo List 📋</h1>
      <form onSubmit={adicionaItem}>
        <input
          id="input-entrada"
          type="text"
          placeholder="Adicone uma tarefa"
          value={novoItem}
          onChange={(e) => {
            setNovoItem(e.target.value);
          }}
        />
        <button className="add" type="submit">
          Adiconar
        </button>
      </form>
      <div className="listaTarefas">
        <div className="wrpper" style={{ textAlign: "center" }}>
          {lista.length < 1 ? (
            <img
              className="image-todo"
              width={350}
              style={{ textAlign: "center" }}
              src={imageTodo}
            />
          ) : (
            lista.map((item, index) => (
              <div
                key={index}
                className={item.isCompleted ? "item completo" : "item"}
              >
                <span
                  onClick={() => {
                    clicou(index);
                  }}
                >
                  {item.text}
                </span>
                <button
                  className="del"
                  onClick={() => {
                    deleta(index);
                  }}
                >
                  Excluir
                </button>
              </div>
            ))
          )}

          {lista.length > 0 && (
            <button
              onClick={() => {
                deletaTudo();
              }}
              className="deleteAll"
            >
              Deletar Todos
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
