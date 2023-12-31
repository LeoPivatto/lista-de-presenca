
import React, {useEffect, useState} from "react"
import './styles.css'




 export function Home() {
  const [studentName, setStudentName] = useState()
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({name:"", avatar:""})

function handleAddStudent(){
  const newStudent= {
    name: studentName,  
    time: new Date().toLocaleDateString("pt-br", {
      hour:"2-digit",
      minute:"2-digit",
      second:"2-digit",
    })
  }
  setStudents(prevState =>
    [...prevState, newStudent])
}

useEffect(()=>{
  async function fetchData(){
  const response = await fetch("https://api.github.com/users/LeoPivatto")
  const data = await response.json();
  setUser({
    avatar: data.avatar_url,
    name:data.name
  })
  }
  fetchData()
},[])




  return (
    <div className='container'>
      <header>   
        <h1>Lista de presença</h1>
        <div>
        <strong>{user.name}</strong>
        <img src={user.avatar} alt="foto perfil" />
        </div>
      </header>


    <input 
    type="text"   
    placeholder="Type here"
    onChange={e=> setStudentName(e.target.value)}
    />


    <button type="button" onClick={handleAddStudent}>
      Add </button>

  {students.map(student =>

     <div className="card">
      <strong>{student.name}</strong>
      <small>{student.time}</small>
    </div>)
}



    </div>)
  }


  export default Home
