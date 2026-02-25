const conn = require("../config/db");

class DedicateToController {

    createDedicateTo(req, res) {
        const { flowdetailId,approveById,dedicateTo
        } = req.body

        var newdate = `INSERT INTO dedicateTo(flowdetailId, approveById, dedicateTo) 
        VALUES (${flowdetailId},${approveById},'${dedicateTo}')`;

        conn.query(newdate, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add dedicateTo" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'create dedicateTo successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'create dedicateTo fialed' })
                }
            }

        });

    }

    updateDedicateTo(req, res) {

        const { id } = req.params
        const { flowdetailId,approveById,dedicateTo
        } = req.body

        var dataupdate = `UPDATE dedicateTo SET flowdetailId=${flowdetailId},approveById=${approveById},dedicateTo='${dedicateTo}' WHERE dedicateId=${id}`;

        conn.query(dataupdate, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add dedicateTo" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update dedicateTo successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update dedicateTo fialed' })
                }
            }
        });

    }

    DedicateToall(req, res) {

        var seleted = `SELECT * FROM dedicateTo`;
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

    DedicateToById(req, res) {
        const { id } = req.params
        var dataselect = `SELECT dedicateId, flowdetailId, approveById, dedicateTo FROM dedicateTo WHERE dedicateId=${id}`;

        conn.query(dataselect, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get dedicateTo " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });
    }

    deleteById(req, res){

        const{id}=req.params
        var data=`DELETE FROM dedicateTo WHERE dedicateId=${id}`

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
module.exports = new DedicateToController();