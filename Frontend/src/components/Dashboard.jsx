import React from 'react'

const Dashboard = () => {
  let name = localStorage.getItem("username")
  console.log(name) 
  return (
      <>
    <div>Dashboard</div>
      <h1>HI , {name}</h1>
    </>
  )
}

export default Dashboard