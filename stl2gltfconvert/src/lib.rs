use wasm_bindgen::prelude::*;
mod gltfconv;

extern crate web_sys;
//use web_sys::console;




#[macro_use]
extern crate serde_derive;
extern crate serde;
extern crate serde_json;



//use serde_json::Result;

/*
extern crate stdweb;

use stdweb::js_export;
use stdweb::web::FileReader;
use stdweb::web::FileReaderResult;
*/
#[wasm_bindgen(start)]
pub fn run() {
    //using_a_macro();
    //using_web_sys();
}

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    // The `console.log` is quite polymorphic, so we can bind it with multiple
    // signatures. Note that we need to use `js_name` to ensure we always call
    // `log` in JS.
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);

    // Multiple arguments too!
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_many(a: &str, b: &str);

    //Generic progress update
    #[wasm_bindgen]
    fn defaultProgressUpdate(done: u32,total: u32);

}

#[wasm_bindgen]
pub fn isonna(s: String) -> String {
    log("isonnetaan rustilla");
    s.to_uppercase()
}

#[wasm_bindgen]
pub fn oottelu() {
    //Ajetaan 10sec 0-100
    for x in 0..100 {
        defaultProgressUpdate(x,100);
    }
}



#[wasm_bindgen]
pub fn convertStlData(dat:Vec<u8>,modelname:String)->String{
    /*
    log("Rust lukee ja printtaa\n");
    console::log_1(&"Hello using web-sys".into());
    console_log!("datakoko helvetti {}",dat.len());
    */

    let tulos = gltfconv::readfrom_stlfile(dat,modelname);
    let a=serde_json::to_string(&tulos).unwrap();
    a
    /*
    modelcache.insert(modelname,tulos);
    /*
    lisää cacheen ja hae toisella funktiolla
    https://doc.rust-lang.org/book/ch08-03-hash-maps.html
    */
    let mut keys: Vec<String> = Vec::new();
	for (k, _) in modelcache.iter() {
		keys.push(k.to_string());
	}
    keys*/
}

#[wasm_bindgen]
pub fn convertToGlb(modelname:String,expSettings:String,modelDatas:String,materials:String)->Vec<u8>{
    log("kutsuttu convertToGlb");

    let mut arr_exp_settings:Vec<gltfconv::ExportSettings> = serde_json::from_str(&expSettings).unwrap();
    log("exps settings ok");
    let mut arr_model_datas:Vec<gltfconv::Raw3dmodeldata>= serde_json::from_str(&modelDatas).unwrap();
    log("arr model datas");
    let mut arr_model_datas2:Vec<gltfconv::Raw3dmodeldata>= serde_json::from_str(&modelDatas).unwrap();
    log("arr model datas2");
    let mut arr_materials:Vec<gltfconv::GltfMaterial>= serde_json::from_str(&materials).unwrap();

    log("kaikki parsittu");
    //console_log!("materiaalit {!}",arr_materials);

    /*
    let mut arrExpSettings:Vec<gltfconv::ExportSettings>=vec![];
    let mut arrModelDatas:Vec<gltfconv::Raw3dmodeldata>=vec![];
    let mut arrMaterials:Vec<gltfconv::GltfMaterial>=vec![];

    */
    let mut doc=gltfconv::get3dmodels_separate(modelname,arr_exp_settings,arr_model_datas,arr_materials);
    //fn get3dmodels_separate(scenename:String,mod_settings: Vec<ExportSettings>,raw_data:Vec<Raw3dmodeldata>,materials:Vec<GltfMaterial>) -> GltfDoc{
    doc.join_parts();
    let joinedbinarr=gltfconv::get3dmodelbinary(&arr_model_datas2);
    doc.remove_uri();
    log("uri poistettu");

    doc.get_glb_databytes(joinedbinarr)
}

/*
#[js_export]
fn print_result(file_reader: FileReader) -> String {
    match file_reader.result() {
        Some(value) => match value {
            FileReaderResult::String(value) => value,
            _ => String::from("not a text"),
        }
        None => String::from("empty")
    }
}

fn main() {
    stdweb::initialize();

    stdweb::event_loop();
}
*/
