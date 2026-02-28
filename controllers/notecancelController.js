const conn = require("../config/db");
class noteCancelController {

    CreateNoteCancel(req, res) {
        const{documentId,detaillist,comfrimby,timestamp}=req.body

        var dataall=`INSERT INTO notecancel(noteId, documentId, detaillist, comfrimby, timestamp) VALUES ('${documentId}','${detaillist}','${comfrimby}','${timestamp}')`
        
        conn.query(dataall,(err,rows,fields)=>{
            if(err){
                console.log(err)
                res.status(500).json({message:"Error creating note cancel"})
            }else{
                res.status(200).json({message:"Note cancel created successfully"})
            }
        })
    }

    getNoteCancelByDocumentId(req,res){

        const{documentId}=req.params
        var dataall=`SELECT * FROM notecancel WHERE documentId='${documentId}'`
        conn.query(dataall,(err,rows,fields)=>{
            if(err){
                console.log(err)
                res.status(500).json({message:"Error fetching note cancel"})
            }else{
                res.status(200).json(rows)
            }
        })
    }

}
module.exports =  new noteCancelController()
