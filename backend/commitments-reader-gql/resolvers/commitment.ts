import { TABLE, getJoinedTag } from "./db";
import { arrayToHash } from "../../shared/utils";

export class Commitment {
  connectorKeys: { db: string };

  constructor(connectorKeys: { db: string }) {
    this.connectorKeys = connectorKeys;
  }

  knex = (context: any) => context.connectors[this.connectorKeys.db].connection;

  async getById(id: any, context: any): Promise<any> {
    let result = await this.knex(context)
      .select()
      .from(TABLE.COMMITMENT)
      .where("id", id);

    return result && result[0];
  }

  async getAll(args: any, context: any): Promise<any[]> {
    let commitmentCriticalDates = await getJoinedTag(
      this.knex(context),
      TABLE.COMMITMENT_CRITICAL_DATE,
      "critical_date"
    );
    let commitmentResponsiblePortfolios = await getJoinedTag(
      this.knex(context),
      TABLE.COMMITMENT_RESPONSIBLE_PORTFOLIO,
      "responsible_portfolio"
    );
    let commitmentCommitmentTypes = await getJoinedTag(
      this.knex(context),
      TABLE.COMMITMENT_COMMITMENT_TYPE,
      "commitment_type"
    );

    let criticalDates = arrayToHash(commitmentCriticalDates);
    let commitmentPortfolios = arrayToHash(commitmentResponsiblePortfolios);
    let commitmentTypes = arrayToHash(commitmentCommitmentTypes);

    let result = await this.knex(context)
      .select()
      .from(TABLE.COMMITMENT);

    let commitments = result.map((p: any) => {
      return {
        ...p,
        party: null,
        criticalDate: criticalDates[p.id].title,
        portfolio: commitmentPortfolios[p.id].title,
        type: commitmentTypes[p.id].title
      };
    });

    let refinedCommitments = commitments;
    if (args.input && args.input.tags && args.input.tags.length > 0) {
      const argtags = (args.input.tags as any[]).reduce((acc, t) => {
        acc[t] = true;
        return acc;
      }, {});

      const commitmentTypeHash = commitmentCommitmentTypes
        .filter(t => argtags[t.tagId])
        .reduce((acc, t) => {
          acc[t.id] = true;
          return acc;
        }, {});

      const portfolioHash = commitmentResponsiblePortfolios
        .filter(t => argtags[t.tagId])
        .reduce((acc, t) => {
          acc[t.id] = true;
          return acc;
        }, {});

      const criticalDateHash = commitmentCriticalDates
        .filter(t => argtags[t.tagId])
        .reduce((acc, t) => {
          acc[t.id] = true;
          return acc;
        }, {});

      refinedCommitments = commitments.filter(
        (r: any) =>
          (!Object.keys(commitmentTypeHash).length ||
            commitmentTypeHash[r.id]) &&
          (!Object.keys(portfolioHash).length || portfolioHash[r.id]) &&
          (!Object.keys(criticalDateHash).length || criticalDateHash[r.id])
      );
    }

    return refinedCommitments;
  }

  async upsert(payload: any, context: any): Promise<void> {
    if (payload.item.id) {
      return await this.knex(context)(TABLE.COMMITMENT)
        .where({ id: payload.item.id })
        .update({ ...payload.item });
    } else {
      return await this.knex(context)(TABLE.COMMITMENT).insert({
        ...payload.item
      });
    }
  }

  async delete(id: any, context: any): Promise<void> {
    return await this.knex(context)(TABLE.COMMITMENT)
      .where({ id: id })
      .del();
  }
}
