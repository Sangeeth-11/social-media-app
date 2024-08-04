import axios from "axios";

export const commonApi=async(reqMethod,reqUrl,reqBody,reqHeader)=>{
    const config={
        method:reqMethod,
        url:reqUrl,
        data:reqBody,
        headers:reqHeader?reqHeader:{"content-type":"application/json"}
    }
    return await axios(config).then(res=>{return res}).catch((err)=>{return err})
}
