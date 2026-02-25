const conn = require("../config/db");

class RunningGroupItemController {

    createRunningGroupItem(req, res) {
        const {
            runningformate, years, running, typeId
        } = req.body

        var newdate = `INSERT INTO runningGroupItem(runningformate, years, running) 
        VALUES ('${runningformate}','${years}',${running},${typeId})`;

        conn.query(newdate, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add runningGroupItem" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'create runningGroupItem successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'create runningGroupItem fialed' })
                }
            }

        });

    }

    updateRunningGroupItem(req, res) {

        const { id } = req.params
        const {
            runningformate, years, running
        } = req.body

        var dataupdate = `UPDATE runningGroupItem SET runningformate='${runningformate}',years='${years}',running=${running} WHERE runId=${id}`;

        conn.query(dataupdate, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add runningGroupItem" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update runningGroupItem successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update runningGroupItem fialed' })
                }
            }
        });

    }

    updateNewRunning(req, res) {
        // const { id } = req.params;

            const d = new Date();
            let convertdate = ""
            let convertmonth = d.getMonth() + 1;
    
            if (d.getDate() < 10) {
                convertdate = "0" + d.getDate();
            }
            else {
                convertdate = d.getDate();
            }
            if (d.getMonth() + 1 < 10) {
                convertmonth = "0" + convertmonth
            }
            else {
                convertmonth = convertmonth
            }

            var dataselect = `
            SELECT 
                runId,runningformate, years, running
            FROM 
                runningGroupItem
            WHERE 
                years='2025'`;
    
            conn.query(dataselect, async function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ message: "Error: Could not get runningGroupItem " });
    
                }
                
                if (results.length > 0) {
                    // res.json({ status: 200, error: false, data: results })
                    updateNewRunning(results[0].runId,results[0].running)
                }
                else {
                    console.log('not result running ')
                    // res.json({ status: 200, error: false, data: results })
                }
    
            });

        function updateNewRunning(idrun,newnumber){
                var NewRunning=Number(newnumber)+1;
                console.log(NewRunning)
                var dataall=`UPDATE runningGroupItem SET running=${NewRunning} WHERE runId=${idrun}`

            conn.query(dataall, async function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ message: "Error: Could not get runningGroupItem " });
    
                }
                
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update runningGroupItem successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update runningGroupItem fialed' })
                }
    
            });
        }
    }
    
    RunningGroupIdall(req, res) {

        var seleted = `SELECT * FROM runningGroupItem`;
        conn.query(seleted, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get runningGroupItem " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });
    }

    RunningGroupIdById(req, res) {
        const { id } = req.params
        var dataselect = `SELECT runId, runningformate, years, running FROM runningGroupItem WHERE runId=${id}`;

        conn.query(dataselect, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get runningGroupItem " });

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
         
        var dataselect = `
        SELECT 
            runId,runningformate, years, running
        FROM 
            runningGroupItem
        WHERE 
            years='2025'`;

        conn.query(dataselect, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get runningGroupItem " });

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
        var data = `DELETE FROM runningGroupItem WHERE runId=${id}`

        conn.query(data, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add runningGroupItem" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'delete runningGroupItem successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'delete runningGroupItem fialed' })
                }
            }

        });

    }
}
module.exports = new RunningGroupItemController();