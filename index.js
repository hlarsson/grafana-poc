import express from 'express'
import prometheusClient from 'prom-client'

const { collectDefaultMetrics, register } = prometheusClient
const activeUsers = new prometheusClient.Gauge({ name: 'active_users', help: 'The number of currently active users' })

collectDefaultMetrics()

const app = express()

app.get('/metrics', async (_req, res) => {
  try {
    res.set('Content-Type', register.contentType)
    res.end(await register.metrics())
  } catch (err) {
    res.status(500).end(err)
  }
})

app.get('/login', async (_req, res) => {
  try {
    activeUsers.inc()
    res.end('login ok')
  } catch (err) {
    res.status(500).end(err)
  }
})

app.get('/logout', async (_req, res) => {
  try {
    activeUsers.dec()
    res.end('logout ok')
  } catch (err) {
    res.status(500).end(err)
  }
})

app.listen(4001, '0.0.0.0')