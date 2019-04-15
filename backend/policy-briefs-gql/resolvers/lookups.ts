import { TABLE } from './db'
import { logger } from '../../shared/logger'

export class Lookups {
	connectorKeys: { db: string }

	constructor(connectorKeys: { db: string }) {
		this.connectorKeys = connectorKeys
	}

	knex = (context: any) => context.connectors[this.connectorKeys.db].connection

	async getLookupByKey(
		id: any,
		context: any,
		tableName: string,
		key: string
	): Promise<any> {
		let result = await this.knex(context)
			.select()
			.from(tableName)
			.where(key, id)
		console.log('🏺', id, tableName, key, result)
		return result && result[0]
	}

	async getLookupsByKey(
		id: any,
		context: any,
		tableName: string,
		key: string
	): Promise<any> {
		let result = await this.knex(context)
			.select()
			.from(tableName)
			.where(key, id)
		console.log('🏺', id, tableName, key, result)
		return result
	}

	async getAll(context: any, tableName: string): Promise<any> {
		let result = await this.knex(context)
			.select()
			.from(tableName)
		return result
	}

	async getPackNavigation(context: any): Promise<any> {
		let navigatorData: any[] = []

		let policies = await this.knex(context)
			.select()
			.from(TABLE.POLICY)
			.map(this.navigateTreeMap)

		let subpolicies = await this.knex(context)
			.select()
			.from(TABLE.SUBPOLICY)
			.map(this.navigateTreeMap)

		navigatorData = [...policies, ...subpolicies]

		return navigatorData
	}


	public navigateTreeMap = (item: any) => {
		return {
				id: item.id,
				parent: item.policy,
				caption: item.title,
				meta: '',
				colour: 'GoldenRod',
				order: 999,
				active: false,
				expanded: false
			}
	} 


}
