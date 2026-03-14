const conn = require("../config/db");

class TypeDocumentController {

    creactTypeDocument(req, res) {
        const {typeId,typename,typedetail} = req.body
        var dataInsert = `INSERT INTO typeDocument( typename, typedetail) 
        VALUES ('${typename}','${typedetail}')`;

        conn.query(dataInsert, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add typeDocument" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                console.log(results);

                res.status(200).json({ status: 200, error: false, message: 'create group typeDocument successfully' });
            }

        });


    }

    updateById(req, res) {
        const { id } = req.params
        const { typename,typedetail} = req.body
        var dataupdata = `UPDATE typeDocument SET typename='${typename}',typedetail='${typedetail}' WHERE typeId=${id}`;

        conn.query(dataupdata, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add typeDocument" });
            }

            if (results.affectedRows == 1) {
                res.json({ status: 200, error: false, message: 'update typeDocument successfully' })
            }
            else {
                res.json({ status: 400, error: true, message: 'update typeDocument fialed' })
            }

        });

    }


    TypeDocumentById(req, res) {
        const { id } = req.params;
        var dataselect = `SELECT typeId, typename, typedetail FROM typeDocument WHERE typeId=${id}`;

        conn.query(dataselect, async function (err, results, fields) {
        

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could get typeDocument" });
            }

            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: [] })
            }

        });

    }


    TypeDocumentAll(req, res) {
        var dataselect = `SELECT * FROM typeDocument`;

        conn.query(dataselect, async function (err, results, fields) {
          

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could get typeDocument" });
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
        var datadelete = `DELETE FROM typeDocument WHERE typeId=${id}`;

        conn.query(datadelete, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not delete " });
            }

            if (results.affectedRows == 1) {
                res.json({ status: 200, error: false, message: 'delete typeDocument successfully' })
            }
            else {
                res.json({ status: 400, error: true, message: 'delete typeDocument fialed' })
            }
        });

    }

}
module.exports = new TypeDocumentController()