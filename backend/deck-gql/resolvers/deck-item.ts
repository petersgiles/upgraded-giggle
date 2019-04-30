import { TABLE } from './db'
import { logger } from "../../shared/logger";
import { arrayToHash } from '../../shared/utils'

export class DeckItem {
	connectorKeys: { db: string }

	constructor(connectorKeys: { db: string }) {
		this.connectorKeys = connectorKeys
	}

	knex = (context: any) => context.connectors[this.connectorKeys.db].connection

	async getById(id: any, context: any): Promise<any> {
		let deckitems = await this.knex(context)
			.select()
			.from(TABLE.DECK_ITEM)
			.where('id', id)

		return deckitems && deckitems[0]
	}

	async getByParent(payload: any, context: any): Promise<any[]> {

		let deckitems = await this.knex(context)
			.select()
			.from(TABLE.DECK_ITEM)
			.where('parent', payload.parent)

	//	logger.info(`🍏 -  getByParent ${JSON.stringify(deckitems)}`)

		return deckitems
	}

	async upsert(payload: any, context: any): Promise<void> {
		if (payload.item.id) {
			return await this.knex(context)(TABLE.DECK_ITEM)
				.where({ id: payload.item.id })
				.update({ ...payload.item })
		} else {
			return await this.knex(context)(TABLE.DECK_ITEM).insert({
				...payload.item,
			})
		}
	}

	async delete(id: any, context: any): Promise<void> {
		return await this.knex(context)(TABLE.DECK_ITEM)
			.where({ id: id })
			.del()
	}
}