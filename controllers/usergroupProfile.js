const conn = require("../config/db");

class TypeStatusController {

    creactUserGroupProfile(req, res) {
        const { groupname, groupcode } = req.body
        var dataInsert = `INSERT INTO usergroupProfile(groupname,groupcode) VALUES ('${groupname}','${groupcode}')`;

        conn.query(dataInsert, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add usergroupProfile" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                console.log(results);

                res.status(200).json({ status: 200, error: false, message: 'create group usergroupProfile successfully' });
            }

        });

    }

    updateById(req, res) {
        const { id } = req.params
        const { groupname, groupcode } = req.body

        var dataupdata = `UPDATE usergroupProfile SET groupname='${groupname}',groupcode='${groupcode}' WHERE groupId=${id}`;

        conn.query(dataupdata, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add usergroupProfile" });
            }

            if (results.affectedRows == 1) {
                res.json({ status: 200, error: false, message: 'update usergroupProfile successfully' })
            }
            else {
                res.json({ status: 400, error: true, message: 'update usergroupProfile fialed' })
            }

        });

    }


    UserGroupProfileById(req, res) {
        const { id } = req.params;

        var dataselect = `SELECT groupId,groupname, groupcode FROM usergroupProfile WHERE groupId=${id}`;

        conn.query(dataselect, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could get usergroupProfile" });
            }

            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: [] })
            }

        });

    }


    UserGroupProfileAll(req, res) {
        var dataselect = `SELECT groupId,groupname, groupcode FROM usergroupProfile`;

        conn.query(dataselect, async function (err, results, fields) {


            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could get usergroupProfile" });
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
        var datadelete = `DELETE FROM usergroupProfile WHERE groupId=${id}`;

        conn.query(datadelete, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not delete " });
            }

            if (results.affectedRows == 1) {
                res.json({ status: 200, error: false, message: 'delete usergroupProfile successfully' })
            }
            else {
                res.json({ status: 400, error: true, message: 'delete usergroupProfile fialed' })
            }
        });

    }

}
module.exports = new TypeStatusController()