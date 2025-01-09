

const getUsers = async () => {
  const response = await fetch('http://localhost:8080/api/users')
  const users = await response.json()
  console.log(users)
  return users
}

getUsers()