
function defaultProgressUpdate(done,total){
  console.log("Oletusprogressi  done="+done+" totaali="+total)

}

/*
wrapper for functionalities to be implemented in webasm.

TODO if webasm can not keep models in memory, add global model buffers in here
*/
var stlModelData={}
/*
Sends data to webasm side, returns metadata.
Import can take some time
*/
function wa_ImportStlFile(filedata,filename,fProgress,fFail,fDone){
  let basename=filename.toLowerCase().replace(".stl","")

  //console.log("FILEDATA JS PUOLELLA="+JSON.stringify(filedata))
  stlModelData[basename]=JSON.parse(wasm_convertStlData(filedata,basename))
  fDone(basename,{
    vertex_filename:basename+"_vertexes.bin",
    normal_filename:basename+"_normals.bin",
    index_filename:basename+"_indexes.bin"
  })
}

function wa_GetStoredVertexes(basename,fFail,fDone){
  console.log("TODO get vertexes from "+basename)
}

function wa_GetStoredNormals(basename,fFail,fDone){
  console.log("TODO get normals from "+basename)
}

function wa_GetStoredIndexes(basename,fFail,fDone){
  console.log("TODO get indexes from "+basename)
}

/*

TODO OIKEASSA JÄRJESTYKSESSÄ.. Materials muoto
pub fn convertToGlb(modelname:String,expSettings:String,modelDatas:String,materials:String)->Vec<u8>{


#[derive(Serialize, Deserialize, Debug)]
pub struct ExportSettings {
    name:String, //Instance name
    modeldata_name: String, //There can be multiple exports of same modeldata with different material, scaling etc...
    material_name: String, //GltfMaterial,
    rotation:[f32;4], //quaternion  #[serde(default, skip_serializing_if = "Vec::is_empty")]
    scale:[f32;3], //Todo default 1.0,1.0,1.0
    translation:[f32;3], //todo default 0,0,0
}


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


pub struct GltfMaterial{
    name : String,
    #[serde(rename = "pbrMetallicRoughness")]
    pbr_metallic_roughness : GltfPbrMetallicRoughness
}


*/


function wa_GetGlbFil(exportname,instances,materials,fProgress,fFail,fDone){
  console.log("TODO export with name "+exportname)
  console.log("Instances are "+JSON.stringify(instances))
  let instanceList=[]
  for(let k in instances){
    let modname=instances[k].modeldata_name
    console.log("modeldata_name is "+modname)
    instanceList.push(stlModelData[modname])
  }
  // let result=wasm_convertToGlb(exportname,JSON.stringify(instances),JSON.stringify(instanceList),JSON.stringify(materials))
  // convertToGlb(modelname:String,expSettings:String,modelDatas:String,materials:String)->Vec<u8>{
  console.log("modelname="+JSON.stringify(exportname))

  //Hack, was not in array format
  let expSettings=[]
  for(n in instances){
    let a=instances[n]
    a.name=n
    expSettings.push(a)
  }

  console.log("expSettings="+JSON.stringify(expSettings))
  console.log("modelDatas="+JSON.stringify(instanceList))
  console.log("materials="+JSON.stringify(materials))

  //HACK, format was in array format :)
  let matArr=[]
  for(n in materials){
    matArr.push({"name":n,"pbrMetallicRoughness":materials[n].pbrMetallicRoughness})
  }
  console.log("matArr="+JSON.stringify(matArr))

  let result=wasm_convertToGlb(exportname,JSON.stringify(expSettings),JSON.stringify(instanceList),JSON.stringify(matArr))

  //console.log("\n\nGLB on nyt "+JSON.stringify(result))
  downloadFile("todo.glb","model/gltf-binary",result)
}

function wa_GetGltfFil(exportname,instances,materials,uriEmbed,fProgress,fFail,fDone){
  console.log("TODO export with name "+exportname)
  console.log("instances "+JSON.stringify(instances))
  console.log("materials "+JSON.stringify(materials))
  console.log("embed uri="+uriEmbed)
}
