import { arrayToHash } from '../../shared/utils'

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
	COMMITMENT_WHO_ANNOUNCED: 'commitment_who_announced',
}

export const getJoinedTag = async (
	knexContext: any,
	joinTable: string,
	id: string
): Promise<any[]> => {
	return await knexContext
		.select(`${joinTable}.commitment as id`, `Tag.title`, `Tag.id as tagId`)
		.from(joinTable)
		.leftJoin(`${TABLE.TAG} as Tag`, function() {
			this.on(`${joinTable}.${id}`, '=', `Tag.id`)
		})
}

export const getCommitmentTypes = async (knexContext: any) => {
	return await getJoinedTag(
		knexContext,
		TABLE.COMMITMENT_COMMITMENT_TYPE,
		'commitment_type'
	)
}

export const getCommitmentResponsiblePortfolios = async (knexContext: any) => {
	return await getJoinedTag(
		knexContext,
		TABLE.COMMITMENT_RESPONSIBLE_PORTFOLIO,
		'responsible_portfolio'
	)
}

export const getCommitmentCriticalDates = async (knexContext: any) => {
	return await getJoinedTag(
		knexContext,
		TABLE.COMMITMENT_CRITICAL_DATE,
		'critical_date'
	)
}

export const getCommitment = async (knexContext: any) => {
  return await knexContext
	.select()
	.from(TABLE.COMMITMENT);
}

export const getRefinedCommitments = async (knexContext: any, args: any) => {
    let commitmentCriticalDates = await getCommitmentCriticalDates(knexContext);
    let commitmentResponsiblePortfolios = await getCommitmentResponsiblePortfolios(knexContext);
    let commitmentCommitmentTypes = await getCommitmentTypes(knexContext);
    let criticalDates = arrayToHash(commitmentCriticalDates);
    let commitmentPortfolios = arrayToHash(commitmentResponsiblePortfolios);
    let commitmentTypes = arrayToHash(commitmentCommitmentTypes);
    let result = await getCommitment(knexContext);
    let commitments = result.map((p: any) => {
      return {
        ...p,
        party: null,
        criticalDate: criticalDates[p.id].title,
        portfolio: commitmentPortfolios[p.id].title,
        type: commitmentTypes[p.id].title,
      };
    });
    let refinedCommitments = commitments;
    if (args.input && args.input.tags && args.input.tags.length > 0) {
      const argtags = (args.input.tags as any[]).reduce((acc, t) => {
        acc[t] = true;
        return acc;
      }, {});
      const commitmentTypeHash = commitmentCommitmentTypes
        .filter((t) => argtags[t.tagId])
        .reduce((acc, t) => {
          acc[t.id] = true;
          return acc;
        }, {});
      const portfolioHash = commitmentResponsiblePortfolios
        .filter((t) => argtags[t.tagId])
        .reduce((acc, t) => {
          acc[t.id] = true;
          return acc;
        }, {});
      const criticalDateHash = commitmentCriticalDates
        .filter((t) => argtags[t.tagId])
        .reduce((acc, t) => {
          acc[t.id] = true;
          return acc;
        }, {});
      refinedCommitments = commitments.filter((r: any) => (!Object.keys(commitmentTypeHash).length ||
        commitmentTypeHash[r.id]) &&
        (!Object.keys(portfolioHash).length || portfolioHash[r.id]) &&
        (!Object.keys(criticalDateHash).length || criticalDateHash[r.id]));
    }
    return refinedCommitments;
  }

