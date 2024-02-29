const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Sum = require('./utils');
const app = express();
const port = process.env.PORT || 3001;
console.log(Sum(102, 106));
const mongoUri = process.env.mongoUri || 'mongodb://admin:admin@localhost:27017/admin'
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected!');
}).catch((err) => {
  console.error('Failed to connect MongoDB:', err);
});
const id = "123"
const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  id: String,
  createdDate: { type: Date, default: Date.now },
});
const Article = mongoose.model('Article', articleSchema);


// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get('/api/article', async (req, res) => {
  const article = await Article.findOne({id: id});
  res.json(article)
});


app.post('/api/article', async (req, res) => {
  const { title, content } = req.body;

  try {
    const article = await Article.findOne({ id: id });
    if(article) return res.json(article)
    const createArticle = await Article.create(
      {id, title, content}    
    );
    
    return res.json(createArticle);
  } catch (error) {
    console.error('Failed to update article:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
});


app.put('/api/article', async (req, res) => {
  const { title, content } = req.body;

  try {
    const article = await Article.findOneAndUpdate(
      { id: id },
      { title, content },
      { new: true }
    );

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    console.error('Failed to update article:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// curl -X POST -H "Content-Type: application/json" -d '{"title":"New Title","content":"New Content"}' https://hocptit-redesigned-spoon-4w6646vxp54h4jj-3001.preview.app.github.dev/api/article

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});