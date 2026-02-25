const conn = require("../config/db");

 const newTransition =(JournalId, userId, rejectTo, dedicateTo, recallTo, stateflow, statusflow, confirmflow, datetimes)=>{
console.log(datetimes);


    var dataall = `INSERT INTO 
transitionflow(JournalId,userId,rejectTo,dedicateTo, 
recallTo,stateflow,statusflow,confirmflow,activetoall,flowlevel,datetimes) 
VALUES 
(${JournalId},${userId},'${rejectTo}','${dedicateTo}','${recallTo}','${stateflow}',
'${statusflow}','${confirmflow}','1','1','${datetimes}')`

    conn.query(dataall, function (err, results, fields) {
        if (err) {
            console.log(err);
            // return res.status(400).json({ status: 400, error: true, message: "Error: Could not add flowrunsystem" });
        }

        if (results) {
            // กรณีที่ สร้าง menu list  
            if (results.affectedRows == 1) {
                console.log('create transition successful')
                // res.json({ status: 200, error: false, message: 'update flowrunsystem successfully' })
            }
            else {

                console.log(results)
                // res.json({ status: 400, error: true, message: 'update flowrunsystem fialed' })
            }
        }

    });

}
module.exports = { newTransition }
