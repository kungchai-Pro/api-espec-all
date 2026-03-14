const conn = require("../config/db");

class FlowdetailsubController {

    createflowdetailsub(req, res) {

        const { flowdetailId, approveBydId, stateFlow, active } = req.body;

        var dataall = `INSERT INTO flowdetailsub(flowdetailId, approveBydId,stateFlow,active) 
        VALUES (${flowdetailId},${approveBydId},'${stateFlow}','${active}')`;

        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add flowdetails" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update flowdetails successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update flowdetails fialed' })
                }
            }

        });

    }

    updateflowdetailsub(req, res) {

        const { id } = req.params

        const { flowdetailId, approveBydId, stateFlow, active } = req.body;

        var dataall = `UPDATE flowdetailsub SET flowdetailId=${flowdetailId},approveBydId=${approveBydId},stateFlow='${stateFlow}',active='${active}' 
        WHERE flowdetailsubId=${id}`;

        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add flowdetailsub" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update flowdetailsub successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update flowdetailsub fialed' })
                }
            }
        });

    }

    flowdetailsuball(req, res) {
        var dataall = `SELECT * FROM flowdetailsub`;

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get flowdetails " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });
    }

    flowdetailsubById(req, res) {
        const { id } = req.params

        var dataall = `SELECT * FROM flowdetails WHERE flowdetailId=${id}`;

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get flowdetails " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });

    }


    flowdetailsubByDetailId(req, res) {
        const { id } = req.params
        var dataall = `SELECT 
flowdetailsub.flowdetailsubId, 
flowdetailsub.flowdetailId, 
flowdetailsub.approveBydId, 
flowdetailsub.stateFlow, 
flowdetailsub.active, 
userall.name,
userall.email,
(SELECT 
 (SELECT typestatus.typename FROM typestatus WHERE typestatus.typecode=flowdetails.statusType) as statusName
 FROM 
 flowdetails 
 WHERE flowdetails.flowdetailId=flowdetailsub.flowdetailId)as typestatus,
(SELECT positionall.positionname 
 FROM positionall 
 WHERE positionall.positioncode=userall.positioncode)as position
FROM flowdetailsub INNER JOIN userall ON userall.userId=flowdetailsub.approveBydId WHERE  flowdetailId=${id}`;

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get flowdetails " });

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

        var dataall = `DELETE FROM flowdetailsub WHERE flowdetailsubId=${id}`;

        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add flowdetails" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'DELETE flowdetails successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'DELETE flowdetails fialed' })
                }
            }

        });

    }
}

module.exports = new FlowdetailsubController()