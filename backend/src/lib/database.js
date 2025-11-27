import monogose from "mongoose"

export async function dbConnect() {
    try {
        const con = await monogose.connect(process.env.MONGO_URI);
        console.log("Database Connected:",con.connection.host);
    } catch (error) {
        console.log("Error to connect",error)
        process.exit(1);
        
    }
}