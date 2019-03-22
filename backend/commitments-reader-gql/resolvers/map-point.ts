import { DB_TABLE_MAP_POINT } from '.'

export class MapPoint {
	connectorKeys: { db: string }

	constructor(connectorKeys: { db: string }) {
		this.connectorKeys = connectorKeys
	}

	knex = (context: any) => context.connectors[this.connectorKeys.db].connection

	async getById(id: any, context: any): Promise<any> {
		let result = await this.knex(context)
			.select()
			.from(DB_TABLE_MAP_POINT)
			.where('id', id)

		return result && result[0]
	}

	async getAll(context: any): Promise<any[]> {
		let result = await this.knex(context)
			.select()
			.from(DB_TABLE_MAP_POINT)
		return result
	}

	async upsert(payload: any, context: any): Promise<void> {
		if (payload.item.id) {
			return await this.knex(context)(DB_TABLE_MAP_POINT)
				.where({ id: payload.item.id })
				.update({ ...payload.item })
		} else {
			return await this.knex(context)(DB_TABLE_MAP_POINT).insert({
				...payload.item,
			})
		}
	}

	async delete(id: any, context: any): Promise<void> {
		return await this.knex(context)(DB_TABLE_MAP_POINT)
			.where({ id: id })
			.del()
	}
}

export const dropMapPointTable = (knex: any) => {
	knex.schema.hasTable(DB_TABLE_MAP_POINT).then(function(exists: any) {
		if (!exists) {
			return knex.schema.dropTable(DB_TABLE_MAP_POINT)
		}
	})
}

export const createMapPointTable = (knex: any) => {
	knex.schema.hasTable(DB_TABLE_MAP_POINT).then(function(exists: any) {
		if (!exists) {
			return knex.schema.createTable(DB_TABLE_MAP_POINT, function(t: any) {
				t.string('place_id').primary()
				t.string('address', 1024)
				t.string('latitude', 512)
				t.string('longitude', 512)
			})
		}
	})
}
