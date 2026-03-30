import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const adapter = new JSONFile('database.json')

const defaultData = { holdings: [] }

const db = new Low(adapter, defaultData)

await db.read()

export default db