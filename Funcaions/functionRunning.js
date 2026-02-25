const conn = require("../config/db");

const FlowlNewDocument = (FlowrunId, jourId, stamptimeUpdate) => {

    var dataall = `SELECT 
            flowSystem.flowId,
            flowSystem.flowName,
            flowSystem.detail,
            flowSystem.typeId,
            flowSystemsub.flowdsubId,
            flowSystemsub.version,
            flowSystemsub.active,
            flowSystemsub.flowId,
            flowdetails.flowdetailId,
            flowdetails.statusType,
            flowdetails.departmentType,
            flowdetails.stateflow,
            flowdetails.active,
            flowdetails.flowdsubId,
            flowdetailsub.flowdetailsubId,
            flowdetailsub.flowdetailId,
            flowdetailsub.approveBydId,
            flowdetailsub.stateFlow,
            flowdetailsub.active as activesub
        FROM flowSystemsub
        INNER JOIN flowSystem ON flowSystem.flowId=flowSystemsub.flowdsubId
        INNER JOIN flowdetails ON flowdetails.flowdsubId=flowSystemsub.flowdsubId
        INNER JOIN flowdetailsub ON flowdetailsub.flowdetailId = flowdetails.flowdetailId
        WHERE flowSystem.flowId=${FlowrunId};`

    conn.query(dataall, async function (err, results, fields) {

        if (err) {
            console.log(err);

        }
        if (results.length > 0) {

            insertLoop(results, jourId, stamptimeUpdate)
        }
        else {
            console.log(results)
        }

    });

}

async function insertLoop(data, jourId, stamptimeUpdate) {
    for (const item of data) {
        console.log(item)
        try {
            await conn.execute(`INSERT INTO flowrunsystem(documentId,flowId,flowsubId,flowdetailId,approveById,statusType,departmentType,stateflow,active,activetoall,activerecieved,activededicate,activereject,rejectToId,dedicatedToId, flowlevel,createtime)
         VALUES (${jourId},${item.flowId},${item.flowdsubId},${item.flowdetailId},${item.approveBydId},'${item.statusType}','${item.departmentType}','${item.stateflow}','0','${item.activesub}','0','','0','','','','${stamptimeUpdate}')`)
            console.log("insert success:", item.flowId);
        } catch (err) {
            console.error("insert fail:", err.message);
            // ข้ามตัวที่ error ไปเลย
        }
    }
    console.log("done all");
}

module.exports = { FlowlNewDocument }
