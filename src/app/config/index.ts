import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(),'.env') })

export default{
    port: process.env.PORT || 3000,
    db_url: process.env.DB_URL,
    jwt_token_secret: process.env.JWT_TOKEN_SECRET

}