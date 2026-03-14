const conn = require("../config/db");

class NoteJournalGroupController {

    createNoteReject(req, res) {
        //  const now = new Date();

        const { groupId, notedetail, rejectBy, stateflow, jourstatus } = req.body;
        var datestamp = datetiemnow();

        var datalist = `INSERT INTO noterejectgroup(groupId,notedetail, rejectBy, stateflow,jourstatus, datestamp) VALUES 
        ('${groupId}','${notedetail}','${rejectBy}','${stateflow}','${jourstatus}','${datestamp}')`;

        conn.query(datalist, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add noterejectgroup" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'create noterejectgroup successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'create noterejectgroup fialed' })
                }
            }

        });


        function datetiemnow() {
            const now = new Date();
            // แปลงเป็นเวลาไทย
            const options = {
                timeZone: "Asia/Bangkok",
            };

            const thaiDate = new Date(now.toLocaleString("en-US", options));

            // แยกค่าต่างๆ ออกมาเป็นตัวเลข
            const year = thaiDate.getFullYear() + 543; // แปลงเป็น พ.ศ.
            const month = String(thaiDate.getMonth() + 1).padStart(2, "0");
            const day = String(thaiDate.getDate()).padStart(2, "0");
            const hour = String(thaiDate.getHours()).padStart(2, "0");
            const minute = String(thaiDate.getMinutes()).padStart(2, "0");
            const second = String(thaiDate.getSeconds()).padStart(2, "0");

            // รูปแบบวันที่และเวลา (เช่น 05/11/2568 14:32:10)
            var timestampsnow = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
            return timestampsnow
        }

    }

    getnoteRejectgroupById(req, res) {
        const { id } = req.params

        var datalist = `SELECT noteId, groupId, notedetail, rejectBy, stateflow, jourstatus, datestamp FROM noterejectgroup FROM noterejectgroup WHERE  noteId=${id} ORDER by noteId ASC`;
        conn.query(datalist, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get noterejectgroup " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });
    }

    getnoteRejectgroupBygroudCode(req, res) {
        const { id } = req.params

        var datalist = `SELECT noteId, groupId, notedetail,rejectBy,
    (SELECT userall.name from userall WHERE userall.userId=rejectBy) as UserReject,
    (SELECT 
     (SELECT departments.departmentname from departments WHERE departments.departmentcode=userall.departmentId)as namedepart 
     from userall WHERE userall.userId=rejectBy LIMIT 1) as UserDepart,stateflow, jourstatus,datestamp FROM noterejectgroup WHERE  groupId='${id}';`;
        conn.query(datalist, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get noterejectgroup " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });
    }

}
module.exports = new NoteJournalGroupController();