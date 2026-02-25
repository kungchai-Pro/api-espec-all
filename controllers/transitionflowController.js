const conn = require("../config/db");

class TransitionflowController {

    createTransitionflow(req, res) {
        const {
            JournalId, userId, rejectTo, dedicateTo, recallTo, stateflow, statusflow, flowlevel, datetimes
        } = req.body

        var newdate = `INSERT INTO transitionflow( JournalId, userId, rejectTo, dedicateTo, recallTo, stateflow, statusflow, flowlevel, datetimes) 
        VALUES (${JournalId},${userId},'${rejectTo}','${dedicateTo}','${recallTo}','${stateflow}','${statusflow}','${flowlevel}','${datetimes}')`;

        conn.query(newdate, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add transitionflow" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update transitionflow successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update transitionflow fialed' })
                }
            }

        });

    }

    updateTransitionflow(req, res) {

        const { id } = req.params
        const {
            JournalId, userId, rejectTo, dedicateTo, recallTo, stateflow, statusflow, flowlevel, datetimes
        } = req.body

        var dataupdate = `UPDATE transitionflow SET JournalId=${JournalId},userId=${userId},rejectTo='${rejectTo}',dedicateTo='${dedicateTo}',
        recallTo='${recallTo}',stateflow='${stateflow}',statusflow='${statusflow}',flowlevel='${flowlevel}',datetimes='${datetimes}' WHERE transitionId=${id}`;

        conn.query(dataupdate, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add transitionflow" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update transitionflow successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update transitionflow fialed' })
                }
            }
        });

    }

    Transitionflowall(req, res) {

        var seleted = `SELECT * FROM transitionflow`;
        conn.query(seleted, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get transitionflow " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });
    }

    TransitionByUserId(req, res) {
        const{stateflow,JournalId,userId}=req.body;
        var dataall = `SELECT 
            transitionId,
            JournalId,
            userId,
             (SELECT userall.name FROM userall WHERE userall.userId=${userId} LIMIT 1) AS nameApproved,
            rejectTo,
            dedicateTo, 
            recallTo, 
            stateflow, 
            statusflow,
             (CASE 
         WHEN transitionflow.statusflow='100' THEN 'Create'
         WHEN transitionflow.statusflow='101' THEN 'Darft'
         WHEN transitionflow.statusflow='102' THEN 'Receive'
         WHEN transitionflow.statusflow='103' THEN 'Preview'
         WHEN transitionflow.statusflow='104' THEN 'Approved'
         WHEN transitionflow.statusflow='105' THEN 'Successful'
         WHEN transitionflow.statusflow='211' THEN 'EditReject'
         END
        )as statusName, 
            confirmflow, 
            activetoall, 
            flowlevel, 
            datetimes 
        FROM transitionflow WHERE stateflow='${stateflow}' AND JournalId=${JournalId} AND userId=${userId}`;

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get transitionflow " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });

    }

    TransitionflowById(req, res) {
        const { id } = req.params
        var dataselect = `SELECT transitionId, documentId, userId, rejectTo, dedicateTo, recallTo,
         stateflow, statusflow, flowlevel, datetimes FROM transitionflow WHERE transitionId=${id}`;

        conn.query(dataselect, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get transitionflow " });

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
        var data = `DELETE FROM transitionflow WHERE transitionId=${id}`

        conn.query(data, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add transitionflow" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'delete transitionflow successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'delete transitionflow fialed' })
                }
            }

        });

    }
}
module.exports = new TransitionflowController();