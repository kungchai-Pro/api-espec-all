const conn = require("../config/db");
class noteCancelController {

    CreateNoteCancel(req, res) {
        const { documentId, detaillist, comfrimby } = req.body
        var d = new Date();
        var times = d.getDay() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();

        var dataall = `INSERT INTO notecancel(documentId, detaillist, comfrimby, timestamp) VALUES ('${documentId}','${detaillist}','${comfrimby}','${times}')`

        conn.query(dataall, (err, rows, fields) => {
            if (err) {
                console.log(err)
                res.status(500).json({ message: "Error creating note cancel" })
            } else {
                res.status(200).json({ status: 200, message: "Note cancel created successfully" })
            }
        })
    }

    getNoteCancelByDocumentId(req, res) {

        const { id } = req.params
        var dataall = `SELECT  noteId, documentId,(select userall.name from userall 
        WHERE userall.userId='13')as NameCancel, detaillist, comfrimby, timestamp
        FROM notecancel WHERE documentId='${id}'`
        conn.query(dataall, (err, rows, fields) => {
            if (err) {
                console.log(err)
                res.status(500).json({ message: "Error fetching note cancel" })
            } else {
                res.status(200).json({ status: 200, error: false, data: rows })
            }
        })
    }

}
module.exports = new noteCancelController()
