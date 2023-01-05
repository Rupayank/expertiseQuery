import app from './server';

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
