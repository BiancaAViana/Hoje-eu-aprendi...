import './style.css';
import Card from '../../components/Card';
import React, { useState, useEffect } from 'react';

//function component
function Home() {

  //pegar o nome de cada estudante
  const [studentName, setStudentName] = useState();

  //armazenar os estudantes na lista de presença.
  const [students, setStudents] = useState([]);

  //pegando o nome e avatar usando uma API
  const [user, setUser] = useState({
    name: '',
    avatar: ''
  });

  function handleAddStudent() {

    const input = document.querySelector('input');

    if(input.value != ''){
      const newStudent = {
            name: studentName,
            time: new Date().toLocaleTimeString('pt-br', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })

          };

          //Adicionando todos os estudantes na lista (o que tinha antes + o atual)
          setStudents(prevState => [...prevState, newStudent]);

         
    }
   
    input.value = '';
  }

  console.log(students)

  useEffect(() => {
    fetch('https://api.github.com/users/biancaaviana')
    .then(response => response.json())
    .then(data => {
        setUser({
          name: data.name,
          avatar: data.avatar_url
        })
      })
  }, [students])

  return (
    <div className="container">

      <header>
        <h1>Lista de presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="" />
        </div>
      </header>

      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={e => setStudentName(e.target.value)}
      />

      <button
        type="button"
        onClick={handleAddStudent}>
        Adicionar
      </button>

      {
        //percorrendo cada estudante da lista
        students.map((student, index) =>
          <Card
            key={index}
            name={student.name}
            time={student.time} />
        )
      }
    </div>
  );
}

export default Home;
