const conn = require("../config/db");

class DepartmentController {

    createdepartment(req, res) {
        const { departmentId,departmentname, departmentcode } = req.body

        var newdate = `INSERT INTO departments(departmentname,departmentcode) 
        VALUES ('${departmentname}','${departmentcode}')`;


        conn.query(newdate, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add departments" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update departments successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update departments fialed' })
                }
            }

        });

    }

    updatedepartment(req, res) {

        const { id } = req.params
        const { departmentname, departmentcode } = req.body
        var dataupdate = `UPDATE departments SET departmentname='${departmentname}',departmentcode='${departmentcode}' 
        WHERE departmentId=${id}`;

        conn.query(dataupdate, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add departments" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update departments successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update departments fialed' })
                }
            }
        });

    }

    getdepartmentall(req, res) {

        var seleted = `SELECT * FROM departments`;
        conn.query(seleted, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get departments " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });
    }

    departmentById(req, res) {
        const { id } = req.params
        var dataselect = `SELECT departmentId, departmentname, departmentcode FROM departments WHERE departmentId=${id}`;

        conn.query(dataselect, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get departments " });

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
        var data=`DELETE FROM departments WHERE departmentId=${id}`

        conn.query(data, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add departments" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update departments successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update departments fialed' })
                }
            }

        });

    }
}
module.exports = new DepartmentController();