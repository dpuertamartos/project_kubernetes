const axios = require('axios')
const { Sequelize } = require('sequelize')

// Set up Sequelize connection
const sequelize = new Sequelize(process.env.DATABASE_URL || `postgresql://postgres:${process.env.POSTGRES_PASSWORD}@postgres-project-svc:5432/postgres`, {
  dialect: 'postgres',
  logging: false, // turn off logging
})


async function getRandomWikipediaArticle() {
  try {
    const response = await axios.get('https://en.wikipedia.org/wiki/Special:Random', {
      maxRedirects: 0, // prevent following redirects
      validateStatus: function (status) {
        return status >= 200 && status < 400 // default
      },
    })
    return response.headers.location // Get the URL from the location header
  } catch (error) {
    console.error('Error fetching Wikipedia article:', error)
    return null
  }
}

async function createTodo(content) {
    try {
      const query = 'INSERT INTO todo (content) VALUES (:content) RETURNING *;'
      const result = await sequelize.query(query, {
        replacements: { content },
        type: Sequelize.QueryTypes.INSERT
      })
      console.log('Todo inserted:', result)
    } catch (error) {
      console.error('Error creating todo with raw SQL:', error)
    }
  }

async function main() {
  try {
    await sequelize.authenticate()
    const articleUrl = await getRandomWikipediaArticle()
    if (articleUrl) {
      const todoContent = `Read ${articleUrl}`
      await createTodo(todoContent)
      console.log('New todo created:', todoContent)
    } else {
      console.log('Could not retrieve a Wikipedia article.')
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  } finally {
    await sequelize.close()
  }
}

console.log("launching...")
main()
