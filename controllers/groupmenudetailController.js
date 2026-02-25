const conn = require("../config/db");

class GroupmenudetailController {

    createGroupmenudetailMenu(req, res) {
        const { profileId, menuId, isupdate, isedit, isadd, isview } = req.body
        var dataall = `INSERT INTO groupmenudetail(profileId,menuId, isupdate, isedit, isadd, isview) 
        VALUES (${profileId},${menuId}, '${isupdate}','${isedit}','${isadd}','${isview}')`;

        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add groupmenudetail" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'create groupmenudetail successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'create groupmenudetail fialed' })
                }
            }

        });
    }

    updateGroupmenudetail(req, res) {

        const { id } = req.params
        const { profileId, menuId, isupdate, isedit, isadd, isview } = req.body;

        var dataall = `UPDATE groupmenudetail 
    SET profileId=${profileId},menuId='${menuId}',
    isupdate='${isupdate}',isedit='${isedit}',isadd='${isadd}',isview='${isview}' WHERE groupId=${id}`;

        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add groupmenudetail" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update groupmenudetail successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update groupmenudetail fialed' })
                }
            }
        });

    }


    GroupmenudetaillistAll(req, res) {

        var dataall = `SELECT * FROM groupmenudetail`;

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get groupmenudetail " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });

    }

    GroupmenudetailById(req, res) {
        const { id } = req.params

        var dataall = `SELECT 
        groupId,profileId,menuId, isupdate, isedit, isadd, isview 
        FROM groupmenudetail WHERE groupId=${id}`;

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get groupmenudetail " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });

    }

    GroupmenudetailByprofileId(req, res) {
        const { id } = req.params

        var dataall = `SELECT 
                    gp.groupId,
                    gp.menuId,
                    ma.name,
                    ma.Details,
                    ma.sequence,
                    gp.profileId,
                    gp.isupdate,
                    gp.isedit,
                    gp.isadd,
                    gp.isview
                    FROM 
                    groupmenudetail gp
                    INNER JOIN menuall ma ON ma.menuId=gp.menuId 
                    WHERE gp.profileId=${id} order by sequence ASC`;

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get groupmenudetail " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });

    }

    getMenuListByUserId(req,res){
        const{id}=req.params
        var datalist=`SELECT
    (SELECT menuall.name FROM menuall WHERE menuall.menuId=gmd.menuId)as menuname,
    (SELECT menuall.router FROM menuall WHERE menuall.menuId=gmd.menuId)as routepart,
    (SELECT menuall.icon FROM menuall WHERE menuall.menuId=gmd.menuId)as iconname,
    (SELECT menuall.sequence FROM menuall WHERE menuall.menuId=gmd.menuId)as sequence
FROM 
	usergroupProfile  uf INNER JOIN userall ON userall.menugroupId=uf.groupId 
    INNER JOIN groupmenudetail gmd ON gmd.profileId=uf.groupId  
WHERE userall.userId=${id} order by sequence ASC`;

          conn.query(datalist, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get groupmenudetail " });

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
        var dataall = `DELETE FROM groupmenudetail WHERE groupId=${id}`;

        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add groupmenudetail" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update groupmenudetail successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update groupmenudetail fialed' })
                }
            }

        });

    }

}
module.exports = new GroupmenudetailController();