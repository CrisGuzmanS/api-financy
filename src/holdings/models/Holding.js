import { HoldingCollection } from '../../../../frontend/src/holdings/HoldingCollection.js'
import database from '../../../database.js'

export class Holding {

	static async create(data) {
		await database.read()

		const newHolding = {
			id: Date.now(),
			ticker: data.ticker,
			quantity: data.quantity,
			cost: {
				average: data.cost.average,
				total: data.cost.total
			},
			vix: data.vix,
			sp500: data.sp500,
			created_at: new Date(),
			updated_at: new Date()
		}

		database.data.holdings.push(newHolding)

		await database.write()

		return newHolding
	}

	static async all() {
		await database.read()
		return new HoldingCollection(database.data.holdings || [])
	}

	static async delete(id) {
		await database.read()
		const index = database.data.holdings.findIndex(holding => holding.id === id)
		database.data.holdings.splice(index, 1)
		await database.write()
	}
}