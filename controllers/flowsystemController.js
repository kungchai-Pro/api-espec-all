const conn = require("../config/db");

class FlowSystemController {

    createflowsystem(req, res) {
        const { flowName, detail, typeId } = req.body;
        var dataall = `INSERT INTO flowSystem( flowName,detail,typeId) VALUES ('${flowName}','${detail}','${typeId}')`;

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

    updateflowsystem(req, res) {

        const { id } = req.params

        const { flowName, detail, typeId } = req.body;

        var dataall = `UPDATE flowSystem SET flowName='${flowName}',detail='${detail}',typeId=${typeId} WHERE  flowId=${id}`;

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

    flowsystemall(req, res) {
        var dataall = `SELECT flowId, flowName, detail, typeId,
(SELECT TypeproductList.typeproduct FROM TypeproductList WHERE TypeproductList.typeId=flowSystem.typeId)as typejournal 
FROM flowSystem`;

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

    flowsystemById(req, res) {
        const { Id } = req.params

        var dataall = `SELECT * FROM flowSystem WHERE flowId=${Id}`;

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

    getflowgroupbyName(req, res){

        var dataall=`SELECT flowName,typeId FROM flowSystem group by flowName,typeId `;
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

    getflowbyNamelist(req, res){
        const{Id}=req.params
        console.log(Id);
        var dataall=`SELECT 
	flowSystem.flowId,flowSystem.flowName,flowSystem.detail,flowSystem.typeId
FROM 
	flowSystem WHERE flowName='${Id}' ORDER by flowId ASC;`;

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

        var dataall = `DELETE FROM flowSystem WHERE flowId=${id}`;

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

module.exports = new FlowSystemController()