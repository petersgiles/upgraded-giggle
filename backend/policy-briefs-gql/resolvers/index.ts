import { arrayToHash } from '../../shared/utils'
import { logger } from "../../shared/logger";
import { getById, getByAll, upsert, remove, getByParent } from './resolvers'
import { TABLE } from './db';


export const resolvers: any = {
	Query: {
		brief: async (obj: any, args: any, context: any, info: any) =>
			getById('PolicyBrief', obj, args, context, info),
    	briefs: async (obj: any, args: any, context: any, info: any) =>
			getByAll('PolicyBrief', obj, args, context, info),
		policies: async (obj: any, args: any, context: any, info: any) =>
			await context.models.Lookups.getAll(context, TABLE.POLICY),
		navigatorTree: async (obj: any, args: any, context: any, info: any) =>
			await context.models.Lookups.getPackNavigation(context),
	},
	Brief: {
		securityClassification: async (obj: any, args: any, context: any, info: any) => 
			await context.models.Lookups.getLookupByKey(obj.securityClassification, context, TABLE.SECURITY_CLASSIFICATION, 'id'),
		dLM: async (obj: any, args: any, context: any, info: any) => 
			await context.models.Lookups.getLookupByKey(obj.dLM, context, TABLE.BRIEF_DLM, 'id'),
		policy: async (obj: any, args: any, context: any, info: any) => 
			await context.models.Lookups.getLookupByKey(obj.policy, context, TABLE.POLICY, 'id'),
		subPolicy: async (obj: any, args: any, context: any, info: any) => 
			await context.models.Lookups.getLookupByKey(obj.subPolicy, context, TABLE.SUBPOLICY, 'id'),
		briefStatus: async (obj: any, args: any, context: any, info: any) => 
			await context.models.Lookups.getLookupByKey(obj.briefStatus, context, TABLE.BRIEF_STATUS, 'id'),
		briefDivision: async (obj: any, args: any, context: any, info: any) => 
			await context.models.Lookups.getLookupByKey(obj.briefDivision, context, TABLE.BRIEF_DIVISION, 'id'),
		contactOfficer: async (obj: any, args: any, context: any, info: any) => 
			await context.models.Lookups.getLookupByKey(obj.contactOfficer, context, TABLE.USER, 'id'),
		createdBy: async (obj: any, args: any, context: any, info: any) => 
			await context.models.Lookups.getLookupByKey(obj.createdBy, context, TABLE.USER, 'id'),
		modifiedBy: async (obj: any, args: any, context: any, info: any) => 
			await context.models.Lookups.getLookupByKey(obj.modifiedBy, context, TABLE.USER, 'id'),
	},
	Policy: {
		subPolicies: async (obj: any, args: any, context: any, info: any) => 
			await context.models.Lookups.getLookupsByKey(obj.id, context, TABLE.SUBPOLICY, 'policy'),
	},
	SubPolicy: {
		policy: async (obj: any, args: any, context: any, info: any) => 
			await context.models.Lookups.getLookupByKey(obj.policy, context, TABLE.POLICY, 'id'),
		briefs: async (obj: any, args: any, context: any, info: any) => 
			await context.models.Lookups.getLookupsByKey(obj.id, context, TABLE.POLICY_BRIEF, 'subPolicy'),
	}
}

export * from './db'
export * from './resolvers'
export * from './policy-brief'