const conn = require("../config/db");

class TypeProductController {


    Createtypeproduct(req, res) {
        const { typeId, typeproduct, detailproduct, typecode } = req.body;

        var dataall = `INSERT INTO Typeproductlist(typeproduct, detailproduct, typecode) 
        VALUES ('${typeproduct}','${detailproduct}','${typecode}')`;

        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add typeproduct" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                console.log(results);

                res.status(200).json({ status: 200, error: false, message: 'create group typeproduct successfully' });
            }

        });

    }


    UpdatetypeProduct(req, res) {
        const { id } = req.params
        const { typeId, typeproduct, detailproduct, typecode } = req.body;
        var dataall = `UPDATE Typeproductlist SET typeproduct='${typeproduct}',detailproduct='${detailproduct}',typecode='${typecode}' 
        WHERE typeId=`;

        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add typeproduct" });
            }

            if (results.affectedRows == 1) {
                res.json({ status: 200, error: false, message: 'update typeproduct successfully' })
            }
            else {
                res.json({ status: 400, error: true, message: 'update typeproduct fialed' })
            }

        });
    }


    Typeproductall(req, res) {
        var dataall = `SELECT typeId, typeproduct, detailproduct, typecode FROM Typeproductlist`;

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could get typestatus" });
            }

            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: [] })
            }

        });
    }

    TypeproductById(req, res) {
        const { Id } = req.params;

        var dataall = `SELECT typeId, typeproduct, detailproduct, typecode FROM Typeproductlist where typeId=${Id}`;

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could get typestatus" });
            }

            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: [] })
            }

        });
    }

    TypeproductByCode(req, res) {
        const { Id } = req.params;

        var dataall = `SELECT typeId, typeproduct, detailproduct, typecode FROM TypeproductList where typecode='${Id}'`;

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could get typeproduct" });
            }

            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results });
               
            }
            else {
                res.json({ status: 200, error: false, data: [] })
            }

        });
    }

    TypeGrouptypeproduct(req, res) {

        var dataall = `SELECT typeproduct,typecode FROM espec_db.TypeproductList 
GROUP BY typeproduct,typecode order BY typeproduct ASC`;
        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could get typeproduct" });
            }

            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: [] })
            }

        });
    }


    DeleteById(req, res) {
        const { Id } = req.params;
        var dataall = `DELETE FROM Typeproductlist WHERE typeId=${Id}`;

        conn.query(dataall, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not delete " });
            }

            if (results.affectedRows == 1) {
                res.json({ status: 200, error: false, message: 'delete typeproduct successfully' })
            }
            else {
                res.json({ status: 400, error: true, message: 'delete typeproduct fialed' })
            }
        });
    }

}
module.exports = new TypeProductController()