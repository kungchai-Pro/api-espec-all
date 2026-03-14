const conn = require("../config/db");

class PositionController {

    creactPosition(req, res) {
        const { positionId,positionname, positioncode } = req.body
        var dataInsert = `INSERT INTO positionall(positionname,positioncode) 
     VALUES ('${positionname}','${positioncode}')`

        conn.query(dataInsert, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add positionall" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
              
                res.status(200).json({ status: 200, error: false, message: 'create group positionall successfully' });
            }

        });


    }

    updateById(req, res) {
        const { id } = req.params
        const { positionId,positionname, positioncode } = req.body
        var dataupdata = `UPDATE positionall 
        SET positionname='${positionname}',positioncode='${positioncode}' WHERE positionId=${id}`;

        conn.query(dataupdata, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add positionall" });
            }

            if (results.affectedRows == 1) {
                res.json({ status: 200, error: false, message: 'update positionall successfully' })
            }
            else {
                res.json({ status: 400, error: true, message: 'update positionall fialed' })
            }

        });

    }

    positionById(req, res) {
        const { id } = req.params;
        var dataselect = `SELECT positionId, positionname, positioncode FROM positionall WHERE positionId=${id}`;

        conn.query(dataselect, async function (err, results, fields) {
           
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could get positionall" });
            }

            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: [] })
            }

        });

    }

    positionAll(req, res) {
        var dataselect = `SELECT * FROM positionall `;

        conn.query(dataselect, async function (err, results, fields) {
            

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could get positionall" });
            }

            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: [] })
            }

        });
    }

    deleteById(req, res) {
        const { id } = req.params;
        var datadelete = `DELETE FROM positionall WHERE positionId=${id}`;

        conn.query(datadelete, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not delete " });
            }

            if (results.affectedRows == 1) {
                res.json({ status: 200, error: false, message: 'delete positionall successfully' })
            }
            else {
                res.json({ status: 400, error: true, message: 'delete positionall fialed' })
            }
        });

    }

}
module.exports = new PositionController()