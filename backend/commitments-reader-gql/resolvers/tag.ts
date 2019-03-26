import { TABLE } from './db'

export class Tag {
	connectorKeys: { db: string }

	constructor(connectorKeys: { db: string }) {
		this.connectorKeys = connectorKeys
	}

	knex = (context: any) => context.connectors[this.connectorKeys.db].connection

	async getById(id: any, context: any): Promise<any> {
		let result = await this.knex(context)
			.select()
			.from(TABLE.TAG)
			.where('id', id)

		return result && result[0]
	}

	async getAll(context: any): Promise<any[]> {
		let result = await this.knex(context)
			.select()
			.from(TABLE.TAG)
		return result
	}

	async getByParent(payload: any, context: any): Promise<any[]> {
		let result = await this.knex(context)
			.select()
			.from(TABLE.TAG)
			.where('parent', payload.parent)
		return result
	}

	async getResolverTree(payload: any, context: any): Promise<any[]> {
		let result = await this.knex(context)
			.from(TABLE.TAG)
			.where(function () {
				this
				  .where('id', 'portfolio-group')
				  .orWhere('id', 'critical-date-group')
				  .orWhere('id', 'commitment-type-group')
				  .orWhere('parent', 'portfolio-group')
				  .orWhere('parent', 'critical-date-group')
				  .orWhere('parent', 'commitment-type-group')
			  })
			
			.select()

		return result.map((t: any) => ({
			...t,
			expanded: false,
			selected: false,
			groupId: t.parent,
		}))
	}

	async upsert(payload: any, context: any): Promise<void> {
		if (payload.item.id) {
			return await this.knex(context)(TABLE.TAG)
				.where({ id: payload.item.id })
				.update({ ...payload.item })
		} else {
			return await this.knex(context)(TABLE.TAG).insert({
				...payload.item,
			})
		}
	}

	async delete(id: any, context: any): Promise<void> {
		return await this.knex(context)(TABLE.TAG)
			.where({ id: id })
			.del()
	}
}
