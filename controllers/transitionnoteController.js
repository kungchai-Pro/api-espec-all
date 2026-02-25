const conn = require("../config/db");

class TransitionnoteController {

    createTransitionnote(req, res) {
        const {
            documentId, notedetail, datetimenote, createnoteby, noteedit, datetimeedit, editnoteby
        } = req.body

        var newdate = `INSERT INTO transitionnote(documentId, notedetail, datetimenote, createnoteby, noteedit, datetimeedit, editnoteby) 
        VALUES (${documentId},'${notedetail}','${datetimenote}','${createnoteby}','${noteedit}','${datetimeedit}','${editnoteby}')`;

        conn.query(newdate, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add transitionnote" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'create transitionnote successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'create transitionnote fialed' })
                }
            }

        });

    }

    updateTransitionnote(req, res) {

        const { id } = req.params
        const {
            documentId, notedetail, datetimenote, createnoteby, noteedit, datetimeedit, editnoteby
        } = req.body

        var dataupdate = `UPDATE transitionnote SET documentId=${documentId},notedetail='${notedetail}',datetimenote='${datetimenote}',
        createnoteby='${createnoteby}',noteedit='${noteedit}',datetimeedit='${datetimeedit}',editnoteby='${editnoteby}' WHERE noteId=${id}`;

        conn.query(dataupdate, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add transitionnote" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update transitionnote successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update transitionnote fialed' })
                }
            }
        });

    }

    Transitionnoteall(req, res) {

        var seleted = `SELECT * FROM transitionnote`;
        conn.query(seleted, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get transitionnote " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });
    }

    TreansitionnoteBydocumentId(req, res) {
        const { id } = req.params;
        var datalist = `SELECT 
	noteId, 
    documentId, 
    notedetail, 
    datetimenote, 
    createnoteby, 
    (SELECT userall.name FROM userall WHERE userall.userId=createnoteby)as nameReject,
    noteedit, 
    datetimeedit, 
    editnoteby,
    (SELECT userall.name FROM userall WHERE userall.userId=editnoteby)as nameEditReject
FROM 
	transitionnote 
WHERE documentId=${id} ORDER BY noteId ASC;`;

        conn.query(datalist, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get transitionnote " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });
    }

    TransitionnoteById(req, res) {
        const { id } = req.params
        var dataselect = `SELECT documentId,notedetail,datetimenote,createnoteby,noteedit,datetimeedit,editnoteby FROM transitionnote WHERE noteId=${id}`;

        conn.query(dataselect, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get transitionnote " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });
    }

    TransitionByUserEdit(req, res) {
        const { journalid, id } = req.params

        var dataall = `SELECT 
ts.noteId, ts.documentId, ts.notedetail,ts.datetimenote, ts.createnoteby,
(SELECT fr.stateflow FROM flowrunsystem fr WHERE  fr.documentId=ts.documentId AND fr.approveById=ts.createnoteby)as stateflownote,
ts.noteedit, ts.datetimeedit,ts.editnoteby 
FROM 
transitionnote ts
WHERE ts.documentId=${journalid} AND ts.editnoteby='${id}' ORDER BY ts.noteId DESC LIMIT 1;`;

        conn.query(dataall, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get transitionnote " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });

    }

    TransitionByUserReject(req, res) {
        const { journalid, id } = req.params

        var dataall = `SELECT 
ts.noteId, ts.documentId, ts.notedetail,ts.datetimenote,
ts.createnoteby,
(SELECT userall.name FROM userall WHERE userall.userId=ts.createnoteby) as createname,
(SELECT fr.stateflow FROM flowrunsystem fr WHERE  fr.documentId=ts.documentId AND fr.approveById=ts.createnoteby)as stateflownote,
ts.noteedit,
ts.datetimeedit,
ts.editnoteby,
(SELECT userall.name FROM userall WHERE userall.userId=ts.editnoteby) as editname
FROM 
transitionnote ts
WHERE ts.documentId=${journalid} AND ts.createnoteby=${id} ORDER BY ts.noteId DESC LIMIT 1`;

        conn.query(dataall, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get transitionnote " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });

    }

    deleteById(req, res) {

        const { id } = req.params
        var data = `DELETE FROM transitionnote WHERE noteId=${id}`

        conn.query(data, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add transitionnote" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'delete transitionnote successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'delete transitionnote fialed' })
                }
            }

        });

    }
}
module.exports = new TransitionnoteController();