import { TABLE } from './db'
import { arrayToHash } from '../../shared/utils'

export class Commitment {
	connectorKeys: { db: string }

	constructor(connectorKeys: { db: string }) {
		this.connectorKeys = connectorKeys
	}

	knex = (context: any) => context.connectors[this.connectorKeys.db].connection

	async getById(id: any, context: any): Promise<any> {
		let result = await this.knex(context)
			.select()
			.from(TABLE.COMMITMENT)
			.where('id', id)

		return result && result[0]
	}

	async getAll(context: any): Promise<any[]> {
		let commitmentParties = await this.knex(context)
			.select(`${TABLE.COMMITMENT_PARTY}.commitment as id`, `Tag.title`)
			.from(TABLE.COMMITMENT_PARTY)
			.leftJoin(`${TABLE.TAG} as Tag`, function() {
				this.on(`${TABLE.COMMITMENT_PARTY}.party`, '=', `Tag.id`)
			})

		let parties = arrayToHash(commitmentParties)

		let commitmentCriticalDates = await this.knex(context)
			.select(`${TABLE.COMMITMENT_CRITICAL_DATE}.commitment as id`, `Tag.title`)
			.from(TABLE.COMMITMENT_CRITICAL_DATE)
			.leftJoin(`${TABLE.TAG} as Tag`, function() {
				this.on(`${TABLE.COMMITMENT_CRITICAL_DATE}.critical_date`, '=', `Tag.id`)
			})

		let criticalDates = arrayToHash(commitmentCriticalDates)

		let commitmentResponsiblePortfolios = await this.knex(context)
			.select(`${TABLE.COMMITMENT_RESPONSIBLE_PORTFOLIO}.commitment as id`, `Tag.title`)
			.from(TABLE.COMMITMENT_RESPONSIBLE_PORTFOLIO)
			.leftJoin(`${TABLE.TAG} as Tag`, function() {
				this.on(`${TABLE.COMMITMENT_RESPONSIBLE_PORTFOLIO}.responsible_portfolio`, '=', `Tag.id`)
			})

		let commitmentPortfolios = arrayToHash(commitmentResponsiblePortfolios)

		let commitmentCommitmentTypes = await this.knex(context)
			.select(`${TABLE.COMMITMENT_COMMITMENT_TYPE}.commitment as id`, `Tag.title`)
			.from(TABLE.COMMITMENT_COMMITMENT_TYPE)
			.leftJoin(`${TABLE.TAG} as Tag`, function() {
				this.on(`${TABLE.COMMITMENT_COMMITMENT_TYPE}.commitment_type`, '=', `Tag.id`)
			})

		let commitmentTypes = arrayToHash(commitmentCommitmentTypes)

		let result = await this.knex(context)
			.select()
			.from(TABLE.COMMITMENT)

		let commitments = result.map((p: any) => {
			return {
				...p,
				party: parties[p.id].title,
				criticalDate: criticalDates[p.id].title,
				portfolio: commitmentPortfolios[p.id].title,
				type: commitmentTypes[p.id].title,
			}
		})

		return commitments
	}

	async upsert(payload: any, context: any): Promise<void> {
		if (payload.item.id) {
			return await this.knex(context)(TABLE.COMMITMENT)
				.where({ id: payload.item.id })
				.update({ ...payload.item })
		} else {
			return await this.knex(context)(TABLE.COMMITMENT).insert({
				...payload.item,
			})
		}
	}

	async delete(id: any, context: any): Promise<void> {
		return await this.knex(context)(TABLE.COMMITMENT)
			.where({ id: id })
			.del()
	}
}
