import express from 'express'
import Routes from './routes/finance'



const app = express()

app.use(Routes)

app.use((req, res) => {
    res.status(404)
})



export default app;