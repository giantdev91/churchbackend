import { execa } from 'execa'
import path from 'node:path'
import waitPort from 'wait-port'

execa('docker', ['compose', 'up'], {
	stdio: 'inherit',
	cwd: path.join(process.cwd(), '..')
})

// Wait for the PostgreSQL port to be ready (which indicates that Docker is ready)
await waitPort({ port: 5432 })

await execa('npx', ['nodemon', '--exec', 'babel-node', './src/bin/www'], {
	stdio: 'inherit'
})
