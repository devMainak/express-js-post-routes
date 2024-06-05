const express = require('express')
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello, Express server.")
})

const movies = [
  { id: 1, title: 'Inception', director: 'Christopher Nolan', year: 2010 },
  { id: 2, title: 'The Godfather', director: 'Francis Ford Coppola', year: 1972 },
  { id: 3, title: 'The Shawshank Redemption', director: 'Frank Darabont', year: 1994 }
]

// POST method on /movies route
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

// DELETE method on /movies route
app.delete("/movies/:id", (req, res) => {
  const movieId = req.params.id
  const index = movies.findIndex(movie => movie.id == movieId)
  if (index == -1)
  {
    res.status(404).json({error: "Movie not found."})
  } else {
    movies.splice(index, 1)
    res.status(201).json({message: "Movie deleted successfully."})
  }
})

// GET method on /movies route
app.get("/movies", (req, res) => {
  res.send(movies)
})

// POST method to update on /movies route
app.post("/movies/:id", (req, res) => {
  const movieId = parseInt(req.params.id)
  const updatedMovie = req.body
  const movieToUpdate = movies.find(movie => movie.id === movieId)
  if (!movieToUpdate)
  {
    res.status(404)
    .json({error: "Movie not found."})
  } else {
    if (!updatedMovie.title || !updatedMovie.director || !updatedMovie.year){
      res.status(400)
      .json({error: "Title, director and year required!"})
    } else {
      Object.assign(movieToUpdate, updatedMovie)
      res.status(201).json({message: "Movie updated successfully."})
    }
  }
})

// items dummy DB
const items = [
  { id: 1, itemName: 'Spoon', color: 'Silver', quantity: 8},
 { id: 2, itemName: 'Fork', color: 'Silver', quantity: 8 },
 { id: 3, itemName: 'Plate', color: 'Off-White', quantity: 6 }

]

// POST method on /items route
app.post("/items", (req, res) => {
  const newItem = req.body
  if (!newItem.itemName || !newItem.color || !newItem.quantity)
  {
    res.status(400).json({error: "itemName, color and quantity are required"})
  } else {
    items.push(newItem)
    res.status(201).json({message: "Item added successfully."})
  }
})

// DELETE method on /items route
app.delete("/items/:id", (req, res) => {
  const itemId = req.params.id
  const index = items.findIndex(item => item.id == itemId)
  if (index == -1)
  {
    res.status(404).json({error: "Item not found."})
  } else {
    items.splice(index, 1)
    res.status(201).json({message: "Item deleted successfully."})
  }
})

// POST method to update doc by id on /items route
app.post("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id)
  const updatedItem = req.body
  const itemToUpdate = items.find(item => item.id === itemId)
  if (!itemToUpdate){
    res.status(404)
    .json({error: "Item not found."})
  } else {
    if (!updatedItem.itemName || !itemToUpdate.color || !itemToUpdate.quantity){
      res.status(400)
      .json({error: "itemName, color and quantity are required"})
    } else {
      Object.assign(itemToUpdate, updatedItem)
      res.status(201)
      .json({message: "Item updated successfully."})
    }
  }
})


// GET method on /items route
app.get("/items", (req, res) => {
  res.send(items)
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})