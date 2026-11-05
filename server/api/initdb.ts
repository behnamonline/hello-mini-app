import { myDB } from "./db";

export default defineEventHandler(async(e)=>{


    const db = myDB()

    return await db.sql`
    
    create table if not exists messages (
    
      id integer primary key autoincrement,
      message text
    
    )
    
    `


});