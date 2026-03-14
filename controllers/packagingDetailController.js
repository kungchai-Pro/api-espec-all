const conn = require("../config/db");

class PackagingDetailController {

    Createpackanging(req, res) {
        const { packId, packCode, packDetaailList } = req.body

        var datalsit = `INSERT INTO packagingDetail(packCode,packDetaailList) VALUES ('${packCode}','${packDetaailList}')`;

        conn.query(datalsit, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add packagingDetail" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'create packagingDetail successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'create packagingDetail fialed' })
                }
            }

        });

    }

    UpdatepackangingById(req, res) {
        const { id } = req.params
        const { packCode, packDetaailList } = req.body

        var datalsit = `UPDATE packagingDetail SET packCode='${packCode}',packDetaailList='${packDetaailList}' WHERE packId=${id}`;
               
        conn.query(datalsit, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add packagingDetail" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update packagingDetail successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update packagingDetail fialed' })
                }
            }

        });
    }


    GetpackangingAll(req, res) {
        var datalsit = `SELECT packId, packCode, packDetaailList FROM packagingDetail ORDER BY packCode ASC`
                conn.query(datalsit, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get packagingDetail " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });
    }


    DeletepackagById(req, res) {
         const { id } = req.params
        var datalsit = `DELETE FROM packagingDetail WHERE packId=${id}`;

                conn.query(datalsit, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add packagingDetail" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'delete packagingDetail successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'delete packagingDetail fialed' })
                }
            }

        });

    }
}
module.exports = new PackagingDetailController();