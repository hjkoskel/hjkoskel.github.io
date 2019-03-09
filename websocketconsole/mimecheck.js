
//Most important thing is to detect pictures
var mimePatterns=[
  {ext: 'png', mime: 'image/png' , pattern:[0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]},
  {ext: '7z', mime: 'application/x-7z-compressed',pattern:[0x37, 0x7A, 0xBC, 0xAF, 0x27, 0x1C]},
  {ext: 'webp', mime: 'image/webp', pattern:[0x57, 0x45, 0x42, 0x50], offset: 8},
  {ext: 'jpg',	mime: 'image/jpeg' , pattern:[0xFF, 0xD8, 0xFF]},
  {ext: 'bmp', mime: 'image/bmp', pattern:[0x42, 0x4D]},
  {ext: 'gif', mime: 'image/gif' , pattern:[0x47, 0x49, 0x46]},
  {ext: 'gz', mime: 'application/gzip',pattern:[0x1F, 0x8B, 0x8]},
  {ext: 'bz2', mime: 'application/x-bzip2',pattern:[0x42, 0x5A, 0x68]},
]

function SpyMime(payload){
  let arr=new Uint8Array(payload);
  for(let p of mimePatterns){
    let match=true
    let offset=0
    if (p.offset!=undefined){
      offset=p.offset
    }
    console.log("Testing mime "+JSON.stringify(p))
    if ((offset+p.pattern.length)<(payload.length)){
      for(let i in p.pattern){
        plIndex=parseInt(i)+parseInt(offset)
        console.log("i="+i+" payload["+plIndex+"]="+payload[i+offset]+" p.pattern["+i+"]="+p.pattern[i])
        if (payload[plIndex]!=p.pattern[i]){
          match=false
          console.log("NOT MATCH")
          break
        }
      }
      if (match){
        console.log("MATCHIN to "+JSON.stringify(p))
        return p
      }
    }
  }
  //return {ext:"raw",mime:"application/octet-stream"}
  return {ext:"",mime:""}
}
