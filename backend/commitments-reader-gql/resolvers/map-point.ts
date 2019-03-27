import { TABLE, getJoinedTag } from './db'

export class MapPoint {
	connectorKeys: { db: string }

	constructor(connectorKeys: { db: string }) {
		this.connectorKeys = connectorKeys
	}

	knex = (context: any) => context.connectors[this.connectorKeys.db].connection

	async getById(id: any, context: any): Promise<any> {
		let result = await this.knex(context)
			.select()
			.from(TABLE.MAP_POINT)
			.where('id', id)

		return result && result[0]
	}

	async getAll(args: any, context: any): Promise<any[]> {
		let commitmentCriticalDates = await getJoinedTag(
			this.knex(context),
			TABLE.COMMITMENT_CRITICAL_DATE,
			'critical_date'
		)
		let commitmentResponsiblePortfolios = await getJoinedTag(
			this.knex(context),
			TABLE.COMMITMENT_RESPONSIBLE_PORTFOLIO,
			'responsible_portfolio'
		)
		let commitmentCommitmentTypes = await getJoinedTag(
			this.knex(context),
			TABLE.COMMITMENT_COMMITMENT_TYPE,
			'commitment_type'
		)

		let refinedCommitments: any[]
		if (args.input && args.input.tags && args.input.tags.length > 0) {
			const argtags = args.input.tags

			refinedCommitments = [
				...commitmentCommitmentTypes,
				...commitmentResponsiblePortfolios,
				...commitmentCriticalDates,
			]
				.filter((t) => argtags.includes(t.tagId))
				.map((t) => t.id)
		}

		let mapPoints = await this.knex(context)
			.select()
			.from(TABLE.MAP_POINT)

		// if(refinedCommitments.length> 0){
		// 	// let commitmentMapPoints = await this.knex(context)
		// 	// .select()
		// 	// .from(TABLE.COMMITMENT_MAPPOINT)

		// 	// commitmentMapPoints = commitmentMapPoints.filter((cmp: any) => refinedCommitments.includes(cmp.commitment))

		// 	console.log('refinedCommitments', refinedCommitments)

		// 	// mapPoints = mapPoints.filter((mp: any) => commitmentMapPoints.include(mp.id))
		// }

		return mapPoints
	}

	async upsert(payload: any, context: any): Promise<void> {
		if (payload.item.id) {
			return await this.knex(context)(TABLE.MAP_POINT)
				.where({ id: payload.item.id })
				.update({ ...payload.item })
		} else {
			return await this.knex(context)(TABLE.MAP_POINT).insert({
				...payload.item,
			})
		}
	}

	async delete(id: any, context: any): Promise<void> {
		return await this.knex(context)(TABLE.MAP_POINT)
			.where({ id: id })
			.del()
	}
}
