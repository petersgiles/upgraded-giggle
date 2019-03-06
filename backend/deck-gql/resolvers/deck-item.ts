export const DB_TABLE_DECKITEM = 'deckitem'

export class DeckItem {
	connectorKeys: { db: string }

	constructor(connectorKeys: { db: string }) {
		this.connectorKeys = connectorKeys
	}

	knex = (context: any) => context.connectors[this.connectorKeys.db].connection

	getById(id: any, context: any): any {
		let result
		this.knex(context)
			.select()
			.from(DB_TABLE_DECKITEM)
			.where('id', id)
			.then((rows: any) => (result = rows))
		console.log(result)
		return result
	}

	getByParent(id: any, context: any): any[] {
		let result
		this.knex(context)
			.select()
			.from(DB_TABLE_DECKITEM)
			.where('parent', id)
			.then((rows: any) => (result = rows))
		console.log(result)
		return result
	}

	upsert(item: any, context: any): void {
    let result
		if (item.id) {
			this.knex(context)(DB_TABLE_DECKITEM)
				.where({ id: item.id })
        .update({ ...item })
        .then((rows: any) => (result = rows))
		} else {
      this.knex(context)(DB_TABLE_DECKITEM)
        .insert({ ...item })
        .then((rows: any) => (result = rows))
    }
    
		console.log(result)
		return result
	}

	delete(item: any, context: any): void {
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
