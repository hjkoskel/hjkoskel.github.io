/* tslint:disable */
/**
* @param {number} a 
* @param {number} b 
* @returns {number} 
*/
export function add(a: number, b: number): number;
/**
* @param {string} s 
* @returns {string} 
*/
export function isonna(s: string): string;
/**
* @param {Float32Array} data 
* @param {number} decayfactor 
* @param {number} downth 
* @param {number} upth 
* @returns {Uint32Array} 
*/
export function processgeigersignal(data: Float32Array, decayfactor: number, downth: number, upth: number): Uint32Array;
/**
* @param {any} ctx 
* @param {number} w 
* @param {number} h 
* @param {Float32Array} data 
* @param {number} decayfactor 
* @param {number} downth 
* @param {number} upth 
* @returns {Uint32Array} 
*/
export function drawgeigersignalplot(ctx: any, w: number, h: number, data: Float32Array, decayfactor: number, downth: number, upth: number): Uint32Array;

/**
* If `module_or_path` is {RequestInfo}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {RequestInfo | BufferSource | WebAssembly.Module} module_or_path
*
* @returns {Promise<any>}
*/
export default function init (module_or_path?: RequestInfo | BufferSource | WebAssembly.Module): Promise<any>;
        