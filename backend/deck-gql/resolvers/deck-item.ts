export const DB_TABLE_DECKITEM = 'deckitem'

export class DeckItem {
	connectorKeys: { db: string }

	constructor(connectorKeys: { db: string }) {
		this.connectorKeys = connectorKeys
	}

	knex = (context: any) => context.connectors[this.connectorKeys.db].connection

	async getById(id: any, context: any): Promise<any> {
		let result = await this.knex(context)
			.select()
			.from(DB_TABLE_DECKITEM)
      .where('id', id)

		return result && result[0]
	}

	async getByParent(parent: any, context: any): Promise<any[]> {
		let result = await this.knex(context)
			.select()
			.from(DB_TABLE_DECKITEM)
      .where('parent', parent)
      
    console.log('getByParent', result)
		return result
	}

	async upsert(payload: any, context: any): Promise<void> {
		if (payload.item.id) {
			return this.knex(context)(DB_TABLE_DECKITEM)
				.where({ id: payload.item.id })
				.update({ ...payload.item })
		} else {
			return this.knex(context)(DB_TABLE_DECKITEM).insert({ ...payload.item })
		}
	}

	async delete(item: any, context: any): Promise<void> {
		this.knex(context)(DB_TABLE_DECKITEM)
			.where({ id: item.id })
			.del()
	}
}

export const createDeckItemTable = (knex: any) => {
	knex.schema.hasTable(DB_TABLE_DECKITEM).then(function(exists: any) {
		if (!exists) {
			return knex.schema.createTable(DB_TABLE_DECKITEM, function(t: any) {
				t.increments('id').primary()
				t.string('title', 512)
				t.integer('parent').unsigned()
			})
		}
	})
}
