const conn = require("../config/db");

class RunningdocumentController {

    createRunningdocument(req, res) {
        const {
            runningformate, years, running, typeId
        } = req.body

        var newdate = `INSERT INTO runningdocument(runningformate, years, running, typeId) 
        VALUES ('${runningformate}','${years}',${running},${typeId})`;

        conn.query(newdate, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add runningdocument" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'create runningdocument successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'create runningdocument fialed' })
                }
            }

        });

    }

    updateRunningdocument(req, res) {

        const { id } = req.params
        const {
            runningformate, years, running, typeId
        } = req.body

        var dataupdate = `UPDATE runningdocument SET runningformate='${runningformate}',years='${years}',running=${running},typeId=${typeId} WHERE runId=${id}`;

        conn.query(dataupdate, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add runningdocument" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update runningdocument successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update runningdocument fialed' })
                }
            }
        });

    }

    updateNewRunning(req, res) {
        const { id } = req.params;

            var dataselect = `
            SELECT 
                runningformate, years, running, typeId
            FROM 
                runningdocument
            WHERE 
                years='2025' AND typeId=${id};`;
    
            conn.query(dataselect, async function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ message: "Error: Could not get runningdocument " });
    
                }
                
                if (results.length > 0) {
                    // res.json({ status: 200, error: false, data: results })
                    updateNewRunning(results[0].typeId,results[0].running)
                }
                else {
                    console.log('not result running ')
                    // res.json({ status: 200, error: false, data: results })
                }
    
            });

        function updateNewRunning(idrun,newnumber){

                var dataall=`UPDATE runningdocument SET running=${newnumber} WHERE runId=${idrun}`

            conn.query(dataselect, async function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ message: "Error: Could not get runningdocument " });
    
                }
                
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update runningdocument successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update runningdocument fialed' })
                }
    
            });
        }
    }
    
    Runningdocumentall(req, res) {

        var seleted = `SELECT * FROM runningdocument`;
        conn.query(seleted, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get runningdocument " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });
    }

    RunningdocumentById(req, res) {
        const { id } = req.params
        var dataselect = `SELECT runId, runningformate, years, running, typeId FROM runningdocument WHERE runId=${id}`;

        conn.query(dataselect, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get runningdocument " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });
    }

    RunningByYear(req, res) {
        const { id } = req.params;
        
        var dataselect = `
        SELECT 
            runningformate, years, running, typeId
        FROM 
            runningdocument
        WHERE 
            years='2025' AND typeId=${id};`;

        conn.query(dataselect, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get runningdocument " });

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
        var data = `DELETE FROM runningdocument WHERE runId=${id}`

        conn.query(data, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add runningdocument" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'delete runningdocument successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'delete runningdocument fialed' })
                }
            }

        });

    }
}
module.exports = new RunningdocumentController();