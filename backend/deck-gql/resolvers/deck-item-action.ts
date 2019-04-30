import { TABLE } from './db'
import { logger } from "../../shared/logger";
import { arrayToHash } from '../../shared/utils'

export class DeckItemAction {
	connectorKeys: { db: string }

	constructor(connectorKeys: { db: string }) {
		this.connectorKeys = connectorKeys
	}

	knex = (context: any) => context.connectors[this.connectorKeys.db].connection

	async getById(id: any, context: any): Promise<any> {
		let deckitems = await this.knex(context)
			.select()
			.from(TABLE.DECK_ITEM_ACTION)
			.where('id', id)

		return deckitems && deckitems[0]
	}

	async getByParent(payload: any, context: any): Promise<any[]> {

		logger.info(`🍏 - DeckItem obj ${JSON.stringify(payload)} `)
		logger.info(`🍏 - DeckItem context ${JSON.stringify(context)} `)

		// var subquery = this.knex(context).select('id').from(TABLE.DECK_ITEM).where('parent', payload.parent)

		// let deckactionitems = await this.knex(context)
		// 	.select()
		// 	.from(TABLE.DECK_ITEM_ACTION)
		// 	.whereIn('deckItem', subquery)
		
		// let actionHash = arrayToHash(deckactionitems, 'deckItem')

		let deckitemactions = await this.knex(context)
			.select()
			.from(TABLE.DECK_ITEM_ACTION)
			.where('deckItem', payload.id)

		logger.info(`🍏 -  getByDeckItem ${JSON.stringify(deckitemactions)}`)

		return deckitemactions
	}

	async upsert(payload: any, context: any): Promise<void> {
		if (payload.item.id) {
			return await this.knex(context)(TABLE.DECK_ITEM_ACTION)
				.where({ id: payload.item.id })
				.update({ ...payload.item })
		} else {
			return await this.knex(context)(TABLE.DECK_ITEM_ACTION).insert({
				...payload.item,
			})
		}
	}

	async delete(id: any, context: any): Promise<void> {
		return await this.knex(context)(TABLE.DECK_ITEM_ACTION)
			.where({ id: id })
			.del()
	}
}