import { TABLE } from './db'
import { logger } from '../../shared/logger'
import { level } from 'winston';

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
			.map((r: any) => this.navigateTreeMap(r, 1))

		let subpolicies = await this.knex(context)
			.select()
			.from(TABLE.SUBPOLICY)
			.map((r: any) => this.navigateTreeMap(r, 2))

		navigatorData = [...policies, ...subpolicies]

		return navigatorData
	}


	public navigateTreeMap = (item: any, level?: any) => {
		return {
				id: item.id,
				parent: item.policy,
				caption: item.title,
				level: level,
				meta: '',
				colour: 'GoldenRod',
				order: 999,
				active: false,
				expanded: false
			}
	} 


}
