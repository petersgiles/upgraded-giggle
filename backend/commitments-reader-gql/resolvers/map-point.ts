import { TABLE, getRefinedCommitments } from './db'
import { logger } from "../../shared/logger";
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
		
		// logger.info(
		// 	`ℹ getAll ${args}`
		//   );

		let refinedCommitments = await getRefinedCommitments(this.knex(context), args)
		let mapPoints = await this.knex(context)
			.select()
			.from(TABLE.MAP_POINT)

		if(refinedCommitments.length > 0){
			let commitmentMapPoints = await this.knex(context)
			.select()
			.from(TABLE.COMMITMENT_MAPPOINT)

			const refinedCommitmentsIds = refinedCommitments.map((rc: any) => rc.id)
			const commitmentMapPointsIds = commitmentMapPoints.filter((cmp: any) => refinedCommitmentsIds.includes(cmp.commitment)).map((cmp: any) => cmp.mappoint)

			// logger.info(
			// 	`🚩- refinedCommitments: ${refinedCommitmentsIds.length}, 📍 - mapPoints: ${mapPoints.length}, 🍏 - commitmentMapPointsIds: ${JSON.stringify(commitmentMapPointsIds)}`
			//   );

			mapPoints = mapPoints.filter((mp: any) => commitmentMapPointsIds.includes(mp.place_id))

			// logger.info(
			// 	`🚩- refinedCommitments: ${refinedCommitmentsIds.length}: 📍 - mapPoints ${mapPoints.length}`
			//   );
		}

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
