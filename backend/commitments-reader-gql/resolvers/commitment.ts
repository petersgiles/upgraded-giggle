import { DB_TABLE_COMMITMENT, DB_TABLE_MAP_POINT, DB_TABLE_COMMITMENT_MAPPOINT } from ".";

export class Commitment {
	connectorKeys: { db: string }

	constructor(connectorKeys: { db: string }) {
		this.connectorKeys = connectorKeys
	}

	knex = (context: any) => context.connectors[this.connectorKeys.db].connection

	async getById(id: any, context: any): Promise<any> {
		let result = await this.knex(context)
			.select()
			.from(DB_TABLE_COMMITMENT)
			.where('id', id)

		return result && result[0]
	}

	async getAll(context: any): Promise<any[]> {
		let result = await this.knex(context)
			.select()
			.from(DB_TABLE_COMMITMENT)
		return result
	}

	async upsert(payload: any, context: any): Promise<void> {
		if (payload.item.id) {
			return await this.knex(context)(DB_TABLE_COMMITMENT)
				.where({ id: payload.item.id })
				.update({ ...payload.item })
		} else {
			return await this.knex(context)(DB_TABLE_COMMITMENT).insert({
				...payload.item,
			})
		}
	}

	async delete(id: any, context: any): Promise<void> {
		return await this.knex(context)(DB_TABLE_COMMITMENT)
			.where({ id: id })
			.del()
	}
}

export const dropCommitmentTable = (knex: any) => {
	knex.schema.hasTable(DB_TABLE_COMMITMENT).then(function(exists: any) {
		if (!exists) {
			return knex.schema.dropTable(DB_TABLE_COMMITMENT)
		}
	})
}

export const createCommitmentTable = (knex: any) => {
	knex.schema.hasTable(DB_TABLE_COMMITMENT).then(function(exists: any) {
		if (!exists) {
			return knex.schema.createTable(DB_TABLE_COMMITMENT, function(t: any) {
				t.increments('id').primary()
				t.string('title', 512)
				t.text('description')
				t.string('cost', 512)
				t.string('date', 512)
				t.string('announcedby', 512)
			})
		}
	})
}

export const dropCommitmentMapPointTable = (knex: any) => {
	knex.schema.hasTable(DB_TABLE_COMMITMENT_MAPPOINT).then(function(exists: any) {
		if (!exists) {
			return knex.schema.dropTable(DB_TABLE_COMMITMENT_MAPPOINT)
		}
	})
}

export const createCommitmentMapPointTable = (knex: any) => {
	knex.schema.hasTable(DB_TABLE_COMMITMENT_MAPPOINT).then(function(exists: any) {
		if (!exists) {
			return knex.schema.createTable(DB_TABLE_COMMITMENT, function(t: any) {
				t.integer('commitment').unsigned().notNullable();
				t.string('mappoint').notNullable();
				t.foreign('commitment').references('id').inTable(DB_TABLE_COMMITMENT);
				t.foreign('mappoint').references('place_id').inTable(DB_TABLE_MAP_POINT);
			})
		}
	})
}