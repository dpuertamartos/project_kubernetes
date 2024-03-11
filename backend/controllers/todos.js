const router = require('express').Router()

let todos = ['Learn React', 'Build a todo app', 'Explore Kubernetes']

router.get('/', async (req, res) => {
    res.json(todos)
})

router.post('/', async (req, res) => {
    todos = todos.concat(req.body.content)
    res.status(200).json('success')
})

module.exports = router