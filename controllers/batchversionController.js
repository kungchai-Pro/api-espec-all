const conn = require("../config/db");

class BatchversionController {

    createBatchversion(req, res) {
        const { batchId, batchName1, batchName2, batchDetail1, batchDetail2, batchExample1, batchExample2, numbers } = req.body

        var newdate = `INSERT INTO 
batchversion(batchName1,batchName2,batchDetail1,batchDetail2,batchExample1,batchExample2,numbers) 
VALUES ('${batchName1}','${batchName2}','${batchDetail1}','${batchDetail2}','${batchExample1}','${batchExample2}','${numbers}')`;

        conn.query(newdate, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add batchversion" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'create batchversion successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'create batchversion fialed' })
                }
            }

        });

    }

    updateBatchversion(req, res) {

        const { id } = req.params
        const { batchId, TypeBatch, batchName1, batchName2, batchDetail1, batchDetail2, batchExample1, batchExample2, numbers } = req.body

        var dataupdate = `UPDATE batchversion 
        SET TypeBatch='${TypeBatch}',batchName1='${batchName1}',batchName2='${batchName2}',batchDetail1='${batchDetail1}',
        batchDetail2='${batchDetail2}',batchExample1='${batchExample1}',batchExample2='${batchExample2}',numbers='${numbers}' 
        WHERE batchId=${id}`;

        conn.query(dataupdate, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add batchversion" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update batchversion successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update batchversion fialed' })
                }
            }
        });

    }

    BatchversionAll(req, res) {

        var seleted = `SELECT batchId, TypeBatch, batchName1, batchName2, batchDetail1, batchDetail2, batchExample1, batchExample2, numbers FROM batchversion`;
        conn.query(seleted, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get batchversion " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });
    }

    BatchversionById(req, res) {
        const { id } = req.params
        var dataselect = `SELECT batchId,TypeBatch, batchName1, batchName2, batchDetail1, batchDetail2,
         batchExample1, batchExample2, numbers FROM batchversion WHERE batchId=${id}`;

        conn.query(dataselect, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get batchversion " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });
    }

        BatchversionByืNumbers(req, res) {
        const { id } = req.params
        var dataselect = `SELECT batchId,TypeBatch, batchName1, batchName2, batchDetail1, batchDetail2,
         batchExample1, batchExample2, numbers FROM batchversion WHERE numbers=${id}`;

        conn.query(dataselect, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get batchversion " });

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
        var data = `DELETE FROM batchversion WHERE batchId==${id}`

        conn.query(data, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add batchversion" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'delete batchversion successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'delete batchversion fialed' })
                }
            }

        });

    }

}

module.exports = new BatchversionController();