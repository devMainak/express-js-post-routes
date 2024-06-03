const express = require('express')
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Express server.")
})

const movies = [
  { id: 1, title: 'Inception', director: 'Christopher Nolan', year: 2010 },
  { id: 2, title: 'The Godfather', director: 'Francis Ford Coppola', year: 1972 }
]

app.post("/movies", (req, res) => {
  const newMovie = req.body
  if (!newMovie.title || !newMovie.director || !newMovie.year)
  {
    res.status(400).json({error: "title, director and year are required."})
  } else {
    movies.push(newMovie)
    res.status(201).json({message: "Movie added Successfully."})
  }
})


const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})