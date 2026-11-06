import { tgAuth } from "./tgAuth"

export default defineEventHandler(async(e)=>{

    const myUser = tgAuth(e)

    return {
        "status": "ok",
        "user": myUser
    }

})