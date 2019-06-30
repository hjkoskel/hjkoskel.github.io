
extern crate image;


pub fn shape_signal(data: &Vec<f32>,decayfactor :f32) -> Vec<f32>{
    let mut v:f32=0.0;
    let decaycoeff=(-1.0*decayfactor).exp();
    let mut result = Vec::new();

    for y in data.iter(){
        let vabs=y.abs();
        if v<=vabs {
            v=vabs;
        }else{
            v=v * decaycoeff;
        }
        result.push(v)
    }
    return result
}

//Signal proceccing done in phases. For plotting  indexes are used for pulse interval measurement
pub fn hysteris_filter(data: &Vec<f32>,downthreshold:f32,upthreshold:f32) -> (Vec<bool>,i32,Vec<u32>){
    let mut result = Vec::new();
    let mut pulseindexes = Vec::new();
    let mut pulseon:bool=false;
    let mut count=0;

    let datalen=data.len();
    //for y in data.iter() {
    for x in 0..(datalen-1) {
        let y=data[x];
        if pulseon {
            pulseon = downthreshold < y;
        }else{
            pulseon = upthreshold < y;
            if pulseon { //Was down, now up
                count=count+1;
                pulseindexes.push(x as u32)
            }
        }
        result.push(pulseon);
    }
    return (result,count,pulseindexes);
}


/*
Soundplot is used for debugging filter settings

following features are plotted

- actual signal  (-1 to +1)  OR  just abs 0-1
- filtered signal
- pulse on (color fill)
- down and up treshold lines

Assuming equal len vectors or nil

*/

//fn picDraw Vec<u8>


pub fn createsoundplot(picw:u32,pich:u32,actual:Vec<f32>,filtered:Vec<f32>,pulse:Vec<bool>,downthreshold:f32,upthreshold:f32) -> image::RgbaImage{
    let mut pic: image::RgbaImage = image::ImageBuffer::new(picw, pich);

    //color constants
    let color_onpeak=image::Rgba([64,64,64,255]);
    let color_actual=image::Rgba([0,0,255,255]);
    let color_thresholdhi=image::Rgba([255,255,255,255]);
    let color_thresholdlo=image::Rgba([0,255,255,255]);
    let color_filtered=image::Rgba([255,0,0,255]);

    //let picw=pic.width();
    //let pich=pic.height();

    //Stupid fill
    for x in 0..(picw-1) {
        for y in 0..(pich-1) {
            pic.put_pixel(x,y,image::Rgba([0,0,0,255]));
        }
    }

    //actual signal. Assuming more signal points than pixels -> get minmax in between?
    for x in 0..(picw-1) { //stepping pixels
        //result.put_pixel(100,110,vari);
        let index0 = (x * (actual.len() as u32)) / picw;
        let index1 = ((x+1) * (actual.len() as u32)) / picw;
        if pulse[index0 as usize] {
            for y in 0..(pich-1) {
                pic.put_pixel(x,y,color_onpeak);
            }
        }

        let mut y0 :f32 = 1.0;
        let mut y1 :f32 = 0.0;
        for x1 in index0..index1 {
            let f=actual[x1 as usize].abs().min(1.0);
            y0=y0.min(f);
            y1=y1.max(f);
        }

        for y in (pich-((y1 * (pich as f32))) as u32)..(pich-((y0 * (pich as f32))) as u32){
            pic.put_pixel(x,y,color_actual);
        }

        let mut fy0 :f32 = 1.0;
        let mut fy1 :f32 = 0.0;
        for x1 in index0..index1 {
            let f=filtered[x1 as usize].abs().min(1.0);
            fy0=fy0.min(f);
            fy1=fy1.max(f);
        }

        for y in (pich-((fy1 * (pich as f32))) as u32)..(pich-((fy0 * (pich as f32))) as u32) {
            pic.put_pixel(x,y,color_filtered);
        }
    }

    let yposup   = pich-((upthreshold * (pich as f32))) as u32;
    let yposdown = pich-((downthreshold * (pich as f32))) as u32;

    for x in 0..(pic.width()-1) {
        pic.put_pixel(x, yposup   ,color_thresholdhi);
        pic.put_pixel(x, yposdown ,color_thresholdlo);
    }
    return pic
}
