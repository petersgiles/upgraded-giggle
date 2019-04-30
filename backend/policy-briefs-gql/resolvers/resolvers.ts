

export const getById = async (
	modelName: string,
	obj: any,
	args: any,
	context: any,
	info: any
) => {
	let result = await context.models[modelName].getById(args.id, context)
	return result
}

export const getByAll = async (
	modelName: string,
	obj: any,
	args: any,
	context: any,
	info: any
) => {
	let result = await context.models[modelName].getAll(args, context)
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
