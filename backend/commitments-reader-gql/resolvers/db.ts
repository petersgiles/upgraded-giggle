export const TABLE = {
	COMMITMENT: 'commitment',
	MAP_POINT: 'mappoint',
	TAG: 'tag',
	NAVIGATION: 'navigation',
	COMMITMENT_MAPPOINT: 'commitment_mappoint',
	COMMITMENT_PARTY: 'commitment_party',
	COMMITMENT_CRITICAL_DATE: 'commitment_critical_date',
	COMMITMENT_RESPONSIBLE_PORTFOLIO: 'commitment_responsible_portfolio',
	COMMITMENT_COMMITMENT_TYPE: 'commitment_commitment_type',
	COMMITMENT_WHO_ANNOUNCED: 'commitment_who_announced'
}


export const getJoinedTag = async (knexContext: any, joinTable: string, id: string ): Promise<any[]> => {
	return await knexContext
			.select(
				`${joinTable}.commitment as id`,
				`Tag.title`,
				`Tag.id as tagId`
			)
			.from(joinTable)
			.leftJoin(`${TABLE.TAG} as Tag`, function() {
				this.on(
					`${joinTable}.${id}`,
					'=',
					`Tag.id`
				)
			})
} 