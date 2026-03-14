const conn = require("../config/db");

class FlowsystemsubController {

    createflowsystemsub(req, res) {
        const { version, active, flowId } = req.body;
        
        var dataall = `INSERT INTO flowSystemsub(version, active, flowId) VALUES ('${version}','${active}','${flowId}')`;

        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add flowSystemsub" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update flowSystemsub successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update flowSystemsub fialed' })
                }
            }

        });

    }

    updateflowsystemsub(req, res) {

        const { id } = req.params

        const { version, active, flowId } = req.body;

        var dataall = `UPDATE flowSystemsub SET version='${version}',active='${active}',flowId=${flowId} WHERE  flowdsubId=${id}`;

        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add flowSystem" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update flowSystem successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update flowSystem fialed' })
                }
            }
        });

    }



    flowsystemsuball(req, res) {
        var dataall = `SELECT * FROM flowSystemsub`;

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get flowSystem " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });
    }

    flowsystemsubById(req, res) {
        const { id } = req.params

        var dataall = `SELECT * FROM flowSystemsub WHERE flowdsubId=${id}`;

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get flowSystem " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });

    }

    flowsystemsubByFlowId(req, res) {
        const { id } = req.params

        var dataall = `SELECT flowdsubId, version, active, flowId FROM flowSystemsub WHERE flowId=${id}`;

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get flowSystem " });

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

        const{id}=req.params

        var dataall = `DELETE FROM flowSystemsub WHERE flowdsubId=${id}`;

        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add flowSystem" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'DELETE flowSystem successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'DELETE flowSystem fialed' })
                }
            }

        });

    }
}

module.exports = new FlowsystemsubController()