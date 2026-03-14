const conn = require("../config/db");

class MenuAllController {

    createmenu(req, res) {

        const { name, icon, code, details ,sequence} = req.body

        var dataall = `INSERT INTO menuall(name, icon, code, details,sequence) 
        VALUES ('${name}','${icon}','${code}','${details}',${sequence})`;

        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add menuall" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'create menuall successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'create menuall fialed' })
                }
            }

        });

    }

    updatenemu(req, res) {
        const { id } = req.params
        const { name, icon, code, details } = req.body

        var dataall = `UPDATE menuall SET name='${name}',icon='${icon}',code='${code}',details='${details}' 
        WHERE  menuId=${id}`;

        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add menuall" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update menuall successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update menuall fialed' })
                }
            }

        });

    }

    menulistall(req, res) {

        var dataall = `SELECT * FROM menuall`;

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get menuall " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });

    }


    menulistById(req, res) {

        const { id } = req.params

        var dataall = `SELECT * FROM menuall WHERE menuId=${id}`;

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get menuall " });

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
        var dataall = `DELETE FROM menuall WHERE  menuId=${id}`

        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add menuall" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update menuall successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update menuall fialed' })
                }
            }

        });
    }

}
module.exports = new MenuAllController();