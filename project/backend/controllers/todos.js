const router = require('express').Router()
const { sequelize } = require('../util/db')
const { QueryTypes } = require('sequelize')
const morgan = require('morgan')

router.use(morgan('dev'))

// Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await sequelize.query("SELECT * FROM todo", { type: QueryTypes.SELECT })
        res.json(todos)
    } catch (error) {
        console.error('Failed to fetch todos:', error)
        res.status(500).json({ error: 'Failed to fetch todos' })
    }
})

// Add a new todo
router.post('/', async (req, res) => {
    try {
        const { content } = req.body
        if (!content) {
            return res.status(400).json({ error: 'Content is required' })
        }
        if (content.length > 140) {
            return res.status(400).json({ error: 'Content exceeds the 140 character limit' });
        }
        
        const insertedTodo = await sequelize.query("INSERT INTO todo (content) VALUES (:content) RETURNING *", {
            replacements: { content },
            type: QueryTypes.INSERT
        })
        const newTodo = insertedTodo[0][0]
        res.status(200).json(newTodo)
    } catch (error) {
        console.error('Failed to add todo:', error)
        res.status(500).json({ error: 'Failed to add todo' })
    }
})

module.exports = router
