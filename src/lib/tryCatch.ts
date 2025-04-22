/*
	Para melhor tipagem, data vai ser sempre o tipo esperado mas deve-se verificar se error existe
*/
export default async function tryCatch<T>(promise: Promise<T>): Promise<{ data: T; error: unknown }> {
	try {
		const data = await promise;
		return { data, error: null };
	} catch (error) {
		return { data: null as T, error: error as unknown };
	}
}
