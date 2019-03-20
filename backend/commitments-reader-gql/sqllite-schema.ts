import {
	dropCommitmentTable,
	createCommitmentTable,
	dropTagTable,
    createTagTable,
    dropMapPointTable,
    createMapPointTable
} from './resolvers'


export const createDB = (knex: any, drop?: boolean) => {
	if (drop) {
		dropCommitmentTable(knex)
        dropTagTable(knex)
        dropMapPointTable(knex)
	}

	createCommitmentTable(knex)
    createTagTable(knex)
    createMapPointTable(knex)
}

export const getById = async (
	modelName: string,
	obj: any,
	args: any,
	context: any,
	info: any
) => {
	let result = await context.models[modelName].getById(args.id, context)
	console.log('By ID', modelName, result)
	return result
}

export const getByAll = async (
	modelName: string,
	obj: any,
	args: any,
	context: any,
	info: any
) => {
	let result = await context.models[modelName].getAll(context)
	console.log('All', modelName, result)
	return result
}

export const getByParent = async (
	modelName: string,
	obj: any,
	args: any,
	context: any,
	info: any
) => {
	let result = await context.models[modelName].getByParent(args, context)
	console.log('ByParent', modelName, result)
	return result
}

export const upsert = async (
	modelName: string,
	obj: any,
	args: any,
	context: any,
	info: any
) => {
	let result = await context.models[modelName]
		.upsert(args, context)
		.then((res: any) => {
			let result: any = {
				success: true,
				error: null,
			}
			return result
		})
	return result
}

export const remove = async (
	modelName: string,
	obj: any,
	args: any,
	context: any,
	info: any
) => {
	let result = await context.models[modelName]
		.delete(args.id, context)
		.then((res: any) => {
			let result: any = {
				success: true,
				error: null,
			}
			return result
		})
	return result
}
