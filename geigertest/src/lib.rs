
//use std::ops::Add;
use wasm_bindgen::Clamped;
use web_sys::{CanvasRenderingContext2d, ImageData};

//use web_sys::{CanvasRenderingContext2d, ImageData};
use wasm_bindgen::prelude::*;
mod geigersignal;

//use image::png::PNGEncoder;

// Called when the wasm module is instantiated
/*
#[wasm_bindgen(start)]
pub fn main() -> Result<(), JsValue> {
    // Use `web_sys`'s global `window` function to get a handle on the global
    // window object.

    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    let body = document.body().expect("document should have a body");

    // Manufacture the element we're gonna append
    let val = document.create_element("p")?;
    val.set_inner_html("Hello from Rust!");

    body.append_child(&val)?;

    Ok(())
}
*/


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
}


#[wasm_bindgen]
pub fn add(a: u32, b: u32) -> u32 {
    a + b
}

#[wasm_bindgen]
pub fn isonna(s: String) -> String {
    log("isonnetaan rustilla");
    s.to_uppercase()
}

#[wasm_bindgen]
pub fn processgeigersignal(data: Vec<f32>,decayfactor : f32,downth : f32,upth : f32) -> Vec<u32>{
    let shapeddata=geigersignal::shape_signal(&data,decayfactor);
    let boolextractdata=geigersignal::hysteris_filter(&shapeddata,downth,upth);
    boolextractdata.2
}

/*
#[wasm_bindgen]
pub fn drawgeigersignalplot(ctx: &CanvasRenderingContext2d, w:u32,h:u32,  data: Vec<f32>,decayfactor : f32,downth : f32,upth : f32) -> Result<(), JsValue> {
    let shapeddata=geigersignal::shape_signal(&data,decayfactor);
    let boolextractdata=geigersignal::hysteris_filter(&shapeddata,downth,upth);

    let pic=geigersignal::createsoundplot(w,h,data,shapeddata,boolextractdata.0,downth,upth);
    //log("Going to draw plot");
    let mut rgb: Vec<u8> =pic.into_raw();
    //log("converting to imdata");
    let imdata = ImageData::new_with_u8_clamped_array_and_sh(Clamped(&mut rgb), w, h)?;
    //log("Going put_image_data");
    ctx.put_image_data(&imdata, 0.0, 0.0)
}
*/

//Processes and plots
#[wasm_bindgen]
pub fn drawgeigersignalplot(ctx: &CanvasRenderingContext2d, w:u32,h:u32,  data: Vec<f32>,decayfactor : f32,downth : f32,upth : f32) ->  Vec<u32> {
    let shapeddata=geigersignal::shape_signal(&data,decayfactor);
    let boolextractdata=geigersignal::hysteris_filter(&shapeddata,downth,upth);

    let pic=geigersignal::createsoundplot(w,h,data,shapeddata,boolextractdata.0,downth,upth);
    //log("Going to draw plot");
    let mut rgb: Vec<u8> =pic.into_raw();
    //log("converting to imdata");
    let imdata = ImageData::new_with_u8_clamped_array_and_sh(Clamped(&mut rgb), w, h).expect("new_with_u8_clamped_array_and_sh failed");
    //log("Going put_image_data");
    ctx.put_image_data(&imdata, 0.0, 0.0).expect("put_image_data fail");
    boolextractdata.2
}



//  https://stackoverflow.com/questions/50731636/how-do-i-encode-a-rust-piston-image-and-get-the-result-in-memory

// https://stackanswers.net/questions/how-do-i-encode-a-rust-piston-image-and-get-the-result-in-memory

/*
#[wasm_bindgen]
pub fn keskiarvo(data: Vec<f32>) -> f32 {
    let mut result =0.0;
    for y in data.iter(){
        result=result+y;
    }
    result/(data.len() as f32)
}
*/


//Eiku tahtoo datauri muotoon png Parempi datan jatkokäsittlelyn kannalta datasovelluksissa (tallennus)

//-------------------------------------------------------------
/*
#[wasm_bindgen]
pub fn juulia(
    ctx: &CanvasRenderingContext2d,
    width: u32,
    height: u32,
    real: f64,
    imaginary: f64,
) -> Result<(), JsValue> {
    // The real workhorse of this algorithm, generating pixel data
    let c = Complex { real, imaginary };
    let mut data = get_julia_set(width, height, c);
    let data = ImageData::new_with_u8_clamped_array_and_sh(Clamped(&mut data), width, height)?;

    ctx.put_image_data(&data, 0.0, 0.0)
}

fn get_julia_set(width: u32, height: u32, c: Complex) -> Vec<u8> {
    let mut data = Vec::new();

    let param_i = 1.5;
    let param_r = 1.5;
    let scale = 0.005;

    for x in 0..width {
        for y in 0..height {
            let z = Complex {
                real: y as f64 * scale - param_r,
                imaginary: x as f64 * scale - param_i,
            };
            let iter_index = get_iter_index(z, c);
            data.push((iter_index / 4) as u8);
            data.push((iter_index / 2) as u8);
            data.push(iter_index as u8);
            data.push(255);
        }
    }

    data
}

fn get_iter_index(z: Complex, c: Complex) -> u32 {
    let mut iter_index: u32 = 0;
    let mut z = z;
    while iter_index < 900 {
        if z.norm() > 2.0 {
            break;
        }
        z = z.square() + c;
        iter_index += 1;
    }
    iter_index
}

#[derive(Clone, Copy, Debug)]
struct Complex {
    real: f64,
    imaginary: f64,
}

impl Complex {
    fn square(self) -> Complex {
        let real = (self.real * self.real) - (self.imaginary * self.imaginary);
        let imaginary = 2.0 * self.real * self.imaginary;
        Complex { real, imaginary }
    }

    fn norm(&self) -> f64 {
        (self.real * self.real) + (self.imaginary * self.imaginary)
    }
}

impl Add<Complex> for Complex {
    type Output = Complex;

    fn add(self, rhs: Complex) -> Complex {
        Complex {
            real: self.real + rhs.real,
            imaginary: self.imaginary + rhs.imaginary,
        }
    }
}
*/
