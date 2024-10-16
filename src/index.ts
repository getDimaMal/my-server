import dotenv from 'dotenv';

import app from './app';


dotenv.config();

const PORT = Number(process.env.APP_PORT);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});