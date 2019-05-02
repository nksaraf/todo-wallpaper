import fs from 'fs';
import os from 'os';
import path from 'path';
import { TodoTxt, TodoTxtItem } from 'jstodotxt';

export const types = {
	READ_TODOTXT: 'READ_TODOTXT'
}

export const readTodotxt = (todotxt_path) => {
	let todotxt = fs.readFileSync(path.join(os.homedir(), todotxt_path)).toString();
	let todos = TodoTxt.parse(todotxt);
	return {
		type: types.READ_TODOTXT,
		payload: { todos }
	}
}