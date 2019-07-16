/*
apumoduli  stl gltf jutut tähän ni ei sotkeennu rajapintaan

*/

extern crate byteorder;
extern crate stl_io;
use byteorder::{LittleEndian, WriteBytesExt};

use std::collections::HashMap;

//use std::fs::OpenOptions;
//use std::fs::File;

use std::io::Cursor;


extern crate web_sys;
use web_sys::console;


use serde::{Deserialize, Serialize};
//use serde_json::Result;



#[derive(Serialize, Deserialize, Debug, Default)]
pub struct GltfDoc{
    asset: GltfAsset,  //Fixed
    scenes: Vec<GltfScene>,
    nodes: Vec<GltfNode>,
    meshes: Vec<GltfMesh>,
    materials: Vec<GltfMaterial>,
    buffers: Vec<GltfBuffer>,
    #[serde(rename = "bufferViews")]
    buffer_views: Vec<GltfBufferView>,
    accessors: Vec<GltfAccessor>,
}


#[derive(Serialize, Deserialize, Debug, Default)]
struct GltfAsset{
    version:String,
    generator:String,  //Toolname here
    copyright:String,
}

#[derive(Serialize, Deserialize, Debug)]
struct GltfScene{
    name:String,
    nodes:Vec<u32>,
}

#[derive(Serialize, Deserialize, Debug,Default)]
struct GltfNode{
    name:String,
    mesh:u32,
    //#[serde(default = "[ 0.0, 0.0, 0.0, 1.0 ]")]  MITEN VITTU TÄN SAA TOIMIMAAN
    rotation:[f32;4], //quaternion  #[serde(default, skip_serializing_if = "Vec::is_empty")]
    scale:[f32;3], //Todo default 1.0,1.0,1.0
    translation:[f32;3], //todo default 0,0,0
}

//https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
#[derive(Serialize, Deserialize, Debug)]
struct GltfMesh{
    primitives: Vec<GltfPrimitive>,

    /*
    weights
    name
    extensions
    extras
    */
}
#[derive(Serialize, Deserialize, Debug)]
struct GltfPrimitive{
    attributes: HashMap<String,u32>,
    indices:i32,
    material:i32,
}


#[derive(Serialize, Deserialize, Debug)]
struct GltfBuffer{
    #[serde(skip_serializing_if="String::is_empty")]
    uri: String,
    name: String,
    #[serde(rename = "byteLength")]
    byte_length: u32,
}

#[derive(Serialize, Deserialize, Debug)]
struct GltfBufferView{
    name:String,
    buffer : u32,
    #[serde(rename = "byteOffset")]
    byte_offset: u32,
    #[serde(rename = "byteLength")]
    byte_length: u32,
    target: u32, //TODO ENUM
}


enum GltfBufferViewTargetEnum{
    ArrayBuffer = 34962,
    ElementArrayBuffer = 34963,
}

enum GltfComponentTypeEnum{
//    CompTypeByte  = 5120, //(BYTE)	1
//	CompTypeUByte = 5121, //(UNSIGNED_BYTE)	1
//	CompTypeShort = 5122, //(SHORT)	2
	CompTypeUShort= 5123, //(UNSIGNED_SHORT)	2
//	CompTypeUint =  5125, //(UNSIGNED_INT)	4
	CompTypeFloat = 5126, //(FLOAT)	4
}


#[derive(Serialize, Deserialize, Debug,Default)]
pub struct GltfMaterial{
    name : String,
    #[serde(rename = "pbrMetallicRoughness")]
    pbr_metallic_roughness : GltfPbrMetallicRoughness
}

#[derive(Serialize, Deserialize, Debug,Default)]
pub struct GltfPbrMetallicRoughness {
    #[serde(rename = "baseColorFactor")]
    base_color_factor : [f32;4],
    #[serde(rename = "metallicFactor")]
    metallic_factor: f32,
    #[serde(rename = "roughnessFactor")]
    roughness_factor: f32,
    #[serde(rename = "emissiveFactor")]
    emissive_factor : [f32;3],

    //Optional
    // "metallicRoughnessTexture": {"index": 2, "texCoord": 1 }
    // "baseColorTexture": {"index": 1, "texCoord": 1 },
    // "normalTexture": {"scale": 2,"index": 3,"texCoord": 1},
}

/*
#[serde(default, skip_serializing_if = "Vec::is_empty", rename = "coordinates")]
*/

#[derive(Serialize, Deserialize, Debug)]
struct GltfAccessor{
    #[serde(rename = "bufferView")]
    buffer_view : u32,
    #[serde(rename = "byteOffset")]
    byte_offset : u32,
    #[serde(rename = "componentType")]
    component_type : u32, //TODO enum
    count : u32,
    #[serde(rename = "type")]
    typee : String,
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    max: Vec<f32>, //max: [f32;3],
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    min: Vec<f32>, //min: [f32;3],
}

/*
Muotoillaan fiksummin
*/
fn get_vertex_databytes(v: &Vec<stl_io::Vertex>) -> (Vec<u8>,Vec<f32>,Vec<f32>){
    let mut vertbuf = vec![];
    let mut max_vertex = vec![v[0][0],v[0][1],v[0][2]];
    let mut min_vertex = vec![v[0][0],v[0][1],v[0][2]];
    for verteksi in v.iter(){
        for i in 0..3 {
            vertbuf.write_f32::<LittleEndian>(verteksi[i]).unwrap();
            //TODO joku hienompi tapa
            if verteksi[i]<min_vertex[i]{
                min_vertex[i]=verteksi[i];
            }
            if max_vertex[i]<verteksi[i]{
                max_vertex[i]=verteksi[i];
            }
        }
    }
    return (vertbuf,min_vertex,max_vertex)
}

fn get_index_databytes(mesh: &stl_io::IndexedMesh) -> Vec<u8>{
    let mut indexbuf = vec![];

    for tri in mesh.faces.iter(){
        for i in 0..3{
            indexbuf.write_u16::<LittleEndian>(tri.vertices[i] as u16).unwrap();
        }
    }
    return indexbuf
}

fn get_normal_databytes(mesh: &stl_io::IndexedMesh) -> Vec<u8>{
    let mut normalvecbuf = vec![]; //Vectors only
    for _verteksi in mesh.vertices.iter(){
        normalvecbuf.push(vec![0.0, 0.0, 0.0]);
    }

    for tri in mesh.faces.iter(){
        for i in 0..3{
            for j in 0..3{
                normalvecbuf[tri.vertices[i]][j]=tri.normal[j];
            }
        }
    }

    let mut normalbuf = vec![];
    for norm in normalvecbuf.iter(){
        normalbuf.write_f32::<LittleEndian>(norm[0]).unwrap();
        normalbuf.write_f32::<LittleEndian>(norm[1]).unwrap();
        normalbuf.write_f32::<LittleEndian>(norm[2]).unwrap();
    }
    return normalbuf
}

//Extracted from stl
//#[derive(Clone)]
#[derive(Serialize, Deserialize, Debug,Clone)]
pub struct Raw3dmodeldata {
    pub modeldata_name: String,   //Name of this model. This can have multiple instances
    pub max_vertex: Vec<f32>,
    pub min_vertex: Vec<f32>,
    //in byte format
    pub vertexbuf: Vec<u8>,
    pub normalbuf: Vec<u8>,
    pub indexbuf: Vec<u8>,

    //Keep model filenames here. Can be shared in between instances so these have to be here
    pub vertex_filename:String, //use same name in multiple models. get in same file
    pub normal_filename:String,
    pub index_filename:String,
}

/*
no file storage needed
impl Raw3dmodeldata{
    fn save_ondisk_separate(&self,path:String){ //TODO sanitize path?
        let mut vertexfile = File::create(path.to_string()+&self.vertex_filename).expect("unable to create vertex file");
        vertexfile.write_all(&self.vertexbuf).unwrap();

        let mut normalfile = File::create(path.to_string()+&self.normal_filename).expect("unable to create normal file");
        normalfile.write_all(&self.normalbuf).unwrap();

        let mut indexfile = File::create(path.to_string()+&self.index_filename).expect("unable to create normal file");
        indexfile.write_all(&self.indexbuf).unwrap();
    }
}
*/

/*
https://stackoverflow.com/questions/47313403/passing-client-files-to-webassembly-from-the-front-end
https://stackoverflow.com/questions/51047146/how-to-read-a-file-with-javascript-to-webassembly-using-rust

TODO Kutsu fiksummin
https://docs.rs/crate/stl_io/0.4.2/source/src/lib.rs
*/

//pub fn readfrom_stlfile(mut f:  std::fs::File, basename : String) -> Raw3dmodeldata{
pub fn readfrom_stlfile(f:  Vec<u8>, basename : String) -> Raw3dmodeldata{
    console::log_1(&"pufferi on".into());
    let mut buff=Cursor::new(f);
    let stl = stl_io::read_stl(&mut buff).unwrap(); //TODO virheen välitys ?
    /*let stl:stl_io::IndexedMesh=stl_io::IndexedMesh{vertices:stl_io::Vertices,faces:stl_io::Faces{}};
    match stl_io::read_stl(&mut buff){
        Ok(x) => stl=x,
        Err(err) => console::log_1(&format!("{}",err).into()),
    }
    */


    let data_vertex=get_vertex_databytes(&stl.vertices);

    //let basename= f.name.to_string().replace(".stl","");

    return Raw3dmodeldata{
        modeldata_name:basename.to_string(),
        vertex_filename:basename.to_string()+"_vertex.bin", //default
        normal_filename:basename.to_string()+"_normaldata.bin",
        index_filename:basename.to_string()+"_index.bin", //default
        max_vertex: data_vertex.2,
        min_vertex: data_vertex.1,
        vertexbuf: data_vertex.0,
        normalbuf: get_normal_databytes(&stl),
        indexbuf: get_index_databytes(&stl),
    }
}

//Export setting
#[derive(Serialize, Deserialize, Debug)]
pub struct ExportSettings {
    name:String, //Instance name
    modeldata_name: String, //There can be multiple exports of same modeldata with different material, scaling etc...
    material_name: String, //GltfMaterial,
    rotation:[f32;4], //quaternion  #[serde(default, skip_serializing_if = "Vec::is_empty")]
    scale:[f32;3], //Todo default 1.0,1.0,1.0
    translation:[f32;3], //todo default 0,0,0
}

//gets zero padded. single binary for all. In order index,vertex,normal,index,vertex,normal....
pub fn get3dmodelbinary(raw_data:&Vec<Raw3dmodeldata>) -> Vec<u8>{
    let mut result=vec![];
    for rd in raw_data.iter(){
        result.extend(&rd.indexbuf);
        result.extend(&rd.vertexbuf);
        result.extend(&rd.normalbuf);
    }
    return result
}

/*
Produce separate gltf JSON code as string
Binaries are as they are  named modelname_vertex.bin, modelname_normal.bin, modelname_indexbuf.bin  -> looping as in rawData array

Going to make separate function for packing up gltf document and datas

TODO return error if material_name or modeldata_name not found etc...
*/
pub fn get3dmodels_separate(scenename:String,mod_settings: Vec<ExportSettings>,raw_data:Vec<Raw3dmodeldata>,materials:Vec<GltfMaterial>) -> GltfDoc{

    let mut doc=GltfDoc::default();
    doc.asset=GltfAsset{version : String::from("2.0"),copyright:"".to_string(),generator:"stl to gltf".to_string()};

    doc.scenes=vec![GltfScene{name:scenename,nodes:vec![]}];

    doc.buffer_views=vec![];
    doc.buffers=vec![];
    doc.nodes=vec![];
    doc.accessors=vec![];
    doc.materials=materials;

    doc.meshes=vec![];

    let mut i=0;
    //Raw data in fixed order in buffers.
    for rd in raw_data.iter(){
        doc.buffers.push( GltfBuffer{uri:rd.index_filename.to_string()  , byte_length:rd.indexbuf.len() as u32    ,name:"index file".to_string()} );
        doc.buffers.push( GltfBuffer{uri:rd.vertex_filename.to_string() , byte_length:rd.vertexbuf.len() as u32   ,name:"vertex file".to_string()} );
        doc.buffers.push( GltfBuffer{uri:rd.normal_filename.to_string() , byte_length:rd.normalbuf.len() as u32   ,name:"normals file".to_string()} );

        //Separate files
        doc.buffer_views.push( GltfBufferView{buffer:i*3+0,byte_offset : 0,byte_length: rd.indexbuf.len() as u32   ,name: rd.modeldata_name.to_string() +" indexfile" ,target : GltfBufferViewTargetEnum::ElementArrayBuffer as u32} );
        doc.buffer_views.push( GltfBufferView{buffer:i*3+1,byte_offset : 0,byte_length: rd.vertexbuf.len() as u32  ,name: rd.modeldata_name.to_string() +" vertexfile" ,target : GltfBufferViewTargetEnum::ArrayBuffer as u32});
        doc.buffer_views.push( GltfBufferView{buffer:i*3+2,byte_offset : 0,byte_length: rd.normalbuf.len() as u32  ,name: rd.modeldata_name.to_string() +" normalfile" ,target : GltfBufferViewTargetEnum::ArrayBuffer as u32});

        doc.accessors.push( GltfAccessor{ //indexes
            buffer_view :i*3+0,
            byte_offset : 0,
            component_type : GltfComponentTypeEnum::CompTypeUShort as u32,
            count : (rd.indexbuf.len()/2) as u32, //16bit = 2 bytes
            typee : "SCALAR".to_string(),
            max: vec![], min: vec![],
        });

        doc.accessors.push( GltfAccessor{ //vertexes
            buffer_view :i*3+1,
            byte_offset : 0,
            component_type : GltfComponentTypeEnum::CompTypeFloat as u32,
            count : (rd.vertexbuf.len()/(4*3)) as u32, //
            typee : "VEC3".to_string(),
            max: rd.max_vertex.clone(),
            min: rd.min_vertex.clone(),
        });

        doc.accessors.push(GltfAccessor{ //normals
            buffer_view :i*3+2,
            byte_offset : 0,
            component_type : GltfComponentTypeEnum::CompTypeFloat as u32,
            count : (rd.vertexbuf.len()/(4*3)) as u32,// each vertex have normal.
            typee : "VEC3".to_string(),
            max: vec![],
            min: vec![],
        });
        i=i+1;
    }

    /*
    name:String, //Instance name
    modeldata_name: String, //There can be multiple exports of same modeldata with different material, scaling etc...
    material_name: String, //GltfMaterial,
    rotation:[f32;4], //quaternion  #[serde(default, skip_serializing_if = "Vec::is_empty")]
    scale:[f32;3], //Todo default 1.0,1.0,1.0
    translation:[f32;3], //todo default 0,0,0
    */
    i=0;
    for model in mod_settings.iter() {
        doc.scenes[0].nodes.push(i); //Yksi scene
        //Search correct mesh

        let mut mesh_index:i32=-1;
        let mut material_index:i32=-1;

        //Get correct mesh
        let mut j:i32=0;
        for rd in raw_data.iter(){
            //println!("  model={} is same {}",rd.modeldata_name,rd.modeldata_name);
            if rd.modeldata_name==model.modeldata_name {
                //println!("is same string\n");
                mesh_index=j;
            }
            j=j+1;
        }


        //Get correct material index
        j=0;
        for mat in doc.materials.iter(){
            if mat.name==model.material_name{
                material_index=j;
            }
            j=j+1;
        }
        if material_index<0{
            println!("TODO VIRHE MATERIAL INDEKSIÄ {} EI LÖYTYNY",model.material_name);
        }

        println!("model {} mesh_index={} modelname={} material_index={} materialname={}",i,mesh_index,model.modeldata_name,material_index,model.material_name);

        doc.nodes.push( GltfNode{
            name:model.name.to_string(),
            mesh:doc.meshes.len() as u32, //Mesh index
            rotation:model.rotation, scale:model.scale, translation:model.translation});


        //point to mesh
        let mut mappi = HashMap::new();
        mappi.insert("POSITION".to_string(),(mesh_index*3+1)as u32);
        mappi.insert("NORMAL".to_string(),(mesh_index*3+2) as u32);
        doc.meshes.push( GltfMesh{primitives:vec!{GltfPrimitive{attributes:mappi, indices: (mesh_index*3) as i32 ,material:material_index as i32}}} );
        i=i+1;
    }

    return doc
    //return serde_json::to_string_pretty(&doc).unwrap();
}

/*
.glb file for sending javascript or writing to file

*/

/*
fn get_glb_databytes(gltf_json:String,)->Vec<u8>{
    let mut result = vec![0x46,0x54,0x6C,0x67,0,0,0,2];
    result.write_u16
    return result
}
*/

//TODO set as impl

impl GltfDoc{
    pub fn join_parts(&mut self){  //Assuming only one
        for i in 1..self.buffer_views.len(){
            self.buffer_views[i].byte_offset= self.buffer_views[i-1].byte_offset+self.buffer_views[i-1].byte_length;
            self.buffer_views[i].buffer=0;
        }

        self.buffers=vec![
            GltfBuffer{
                uri:self.scenes[0].name.to_string()+".bin", //One scene
                name:"".to_string(),
                byte_length: self.buffer_views[self.buffer_views.len()-1].byte_offset + self.buffer_views[self.buffer_views.len()-1].byte_length}];
    }

    pub fn remove_uri(&mut self){
        for i in 0..self.buffers.len(){
            self.buffers[i].uri="".to_string()
        }
    }

    pub fn get_glb_databytes(&self,binarydata:Vec<u8>) -> Vec<u8>{
        let mut jsoncode=serde_json::to_string_pretty(self).unwrap();
        //Fix so it is multiples of
        println!("json len {}",jsoncode.len());
        let needed_spaces=jsoncode.len()%4;
        for _i in 0..needed_spaces{
            jsoncode=jsoncode+" "
        }
        let jsonbytearr=jsoncode.as_bytes();
        println!("json len AFTER {}, byte length is really {}",jsoncode.len(),jsonbytearr.len()); //TODO is len in bytes??? or in chars

        let mut result = vec![]; //Magic and version

        result.write_u32::<LittleEndian>(0x46546C67 as u32).unwrap();//Magic
        result.write_u32::<LittleEndian>(2 as u32).unwrap();

        println!("magic and version lengt is {}",result.len());
        let total_count=binarydata.len()+8+jsoncode.len()+8+12 ; //binary size + binary header+ jsonlen+ jsonheader + 12byte main header
        println!("total len is {}",total_count);
        result.write_u32::<LittleEndian>(total_count as u32).unwrap(); //header size
        //json chunk
        result.write_u32::<LittleEndian>(jsonbytearr.len() as u32).unwrap();
        result.write_u32::<LittleEndian>(0x4E4F534A as u32).unwrap(); //Easier just write JSON in u32 :D
        result.extend(jsonbytearr);
        //println!("\n---JSON CODE---\n{:?}",jsonbytearr);
        //binary chunk
        result.write_u32::<LittleEndian>(binarydata.len() as u32).unwrap();
        result.write_u32::<LittleEndian>(0x004E4942 as u32).unwrap(); //BIN
        result.extend(binarydata);
        return result
    }
}
