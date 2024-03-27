const axios = require('axios');
const { Sequelize, Model, DataTypes } = require('sequelize');

// Set up Sequelize connection
const sequelize = new Sequelize(process.env.DATABASE_URL || `postgresql://postgres:${process.env.POSTGRES_PASSWORD}@postgres-project-svc:5432/postgres`, {
  dialect: 'postgres',
  logging: false, // turn off logging
});

class Todo extends Model {}

Todo.init(
  {
    content: DataTypes.STRING,
  },
  { sequelize, modelName: 'todo' }
);

async function getRandomWikipediaArticle() {
  try {
    const response = await axios.get('https://en.wikipedia.org/wiki/Special:Random', {
      maxRedirects: 0, // prevent following redirects
      validateStatus: function (status) {
        return status >= 200 && status < 400; // default
      },
    });
    return response.headers.location; // Get the URL from the location header
  } catch (error) {
    console.error('Error fetching Wikipedia article:', error);
    return null;
  }
}

async function createTodo(content) {
  try {
    await Todo.create({ content });
  } catch (error) {
    console.error('Error creating todo:', error);
  }
}

async function main() {
  try {
    await sequelize.authenticate();
    await Todo.sync(); // Ensure the table exists

    const articleUrl = await getRandomWikipediaArticle();
    if (articleUrl) {
      const todoContent = `Read ${articleUrl}`;
      await createTodo(todoContent);
      console.log('New todo created:', todoContent);
    } else {
      console.log('Could not retrieve a Wikipedia article.');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}

console.log("launching...")
main();
