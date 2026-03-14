const conn = require("../config/db");

class JournalBygroupController {
    createGroupItem(req, res) {

        const { journalGroupID, purposer, userRequest, refECN, partfile, createBy, confirmDateTime, createDatetime, editType } = req.body

        var dataall = `INSERT INTO JournalBygroup(journalGroupID,purposer,userRequest,refECN,partfile,createBy,confirmDateTime,createDatetime,editType) 
        VALUES ('${journalGroupID}','${purposer}','${userRequest}','${refECN}','${partfile}','${createBy}','${confirmDateTime}','${createDatetime}','${editType}')`;

        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add JournalBygroup" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'create JournalBygroup successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'create JournalBygroup fialed' })
                }
            }

        });

    }

    UpdateGroupItem(req, res) {
        const { id } = req.params
        const { journalGroupID, purposer, userRequest, refECN, partfile, createBy, confirmDateTime, createDatetime } = req.body

        var dataall = `UPDATE JournalBygroup SET 
        journalGroupID='${journalGroupID}',
        purposer='${purposer}',
        userRequest='${userRequest}',
        refECN='${refECN}',
        partfile='${partfile}'
        createBy='${createBy}',
        confirmDateTime='${confirmDateTime}',
        createDatetime='${createDatetime}'
        WHERE  menuId=${id}`;

        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add JournalBygroup" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update JournalBygroup successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update JournalBygroup fialed' })
                }
            }

        });

    }

    // แสดงรายการแจ้งตื่น
    NotifygroupByid(req, res) {
        const { id } = req.params;
        var datall = `SELECT 
                        j.groupId, j.journalGroupID, j.purposer, j.userRequest, 
                        j.refECN, j.createBy, j.confirmDateTime
                        FROM SDSS_Head sh 
                        INNER JOIN flowrunsystem fr on fr.documentId=sh.JournalID 
                        INNER JOIN JournalBygroup j on j.journalGroupID=sh.JournalGroupID
                        WHERE  sh.stateflow=fr.stateflow
                        AND fr.activerecieved='0' AND sh.Actives='1'
                        AND fr.approveById=${id}
                        group by j.groupId, j.journalGroupID, j.purposer, j.userRequest, 
                        j.refECN, j.createBy, j.confirmDateTime;`

        conn.query(datall, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get dedicateTo " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });
    }

    journalgroupBycode(req, res) {
        const { id } = req.params;
        var dataall = `SELECT 
                j.groupId, j.journalGroupID, j.purposer, j.userRequest,
                j.refECN,partfile,j.createBy,j.editType,
                (SELECT userall.name from userall WHERE userall.userId=j.createBy) as createName,
                j.confirmDateTime, j.createDatetime,
                sh.JournalID,sh.JournalCode,sh.Revise,sh.UserIDRequest,sh.CustID,sh.CustName,
                sh.ItemID,sh.ItemName,sh.ItemTypeID,sh.stateflow,sh.statusflow,sh.Actives
                FROM SDSS_Head sh 
                INNER JOIN flowrunsystem fr on fr.documentId=sh.JournalID 
                INNER JOIN JournalBygroup j on j.journalGroupID=sh.JournalGroupID
                WHERE  sh.stateflow=fr.stateflow
                AND sh.Actives='1'
                AND j.journalGroupID='${id}'`;

        conn.query(dataall, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get dedicateTo " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });
    }

    getJournalGroupByid(req, res) {
        const { id } = req.params
        var dataall = `SELECT jbg.groupId,jbg.journalGroupID,
(SELECT SDSS_Head.JournalID FROM espec_db.SDSS_Head WHERE SDSS_Head.JournalGroupID=jbg.journalGroupID  LIMIT 1) as JournalID,
jbg.userRequest,frt.stateflow,jbg.confirmDateTime,
(select flowrunsystem.stateflow from espec_db.flowrunsystem where flowrunsystem.documentId=frt.documentId order by flowrunsystem.stateflow desc limit 1)as endstateflow,
jbg.createBy,(SELECT userall.name FROM espec_db.userall WHERE userall.userId=jbg.createBy) as createName,
(SELECT 
	fd.statusType
FROM 
	espec_db.flowdetails fd INNER JOIN espec_db.flowdetailsub fs ON fs.flowdetailId=fd.flowdetailId 
    WHERE fs.approveBydId=${id} LIMIT 1)as usertypestatus,
'102'as actions 
FROM espec_db.SDSS_Head sh 
INNER JOIN espec_db.flowrunsystem frt on frt.documentId=sh.JournalID 
INNER JOIN espec_db.JournalBygroup jbg on jbg.journalGroupID=sh.JournalGroupID WHERE  sh.stateflow=frt.stateflow
AND frt.activerecieved='0' 
AND sh.Actives='1'
AND frt.approveById=${id}
AND sh.statusflow NOT IN ('203')
group by jbg.groupId,jbg.journalGroupID,jbg.userRequest,frt.stateflow,jbg.createBy,jbg.confirmDateTime,endstateflow,createName,actions`;

        conn.query(dataall, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get dedicateTo " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });

    }
  getJournalRejectGroupByid(req, res) {
        const { id } = req.params
        var dataall = `SELECT jbg.groupId,jbg.journalGroupID,
(SELECT SDSS_Head.JournalID FROM espec_db.SDSS_Head WHERE SDSS_Head.JournalGroupID=jbg.journalGroupID  LIMIT 1) as JournalID,
jbg.userRequest,frt.stateflow,jbg.confirmDateTime,
(select flowrunsystem.stateflow from espec_db.flowrunsystem where flowrunsystem.documentId=frt.documentId order by flowrunsystem.stateflow desc limit 1)as endstateflow,
jbg.createBy,(SELECT userall.name FROM espec_db.userall WHERE userall.userId=jbg.createBy) as createName,
(SELECT 
	fd.statusType
FROM 
	espec_db.flowdetails fd INNER JOIN espec_db.flowdetailsub fs ON fs.flowdetailId=fd.flowdetailId 
    WHERE fs.approveBydId=${id} LIMIT 1)as usertypestatus,
'203'as actions 
FROM espec_db.SDSS_Head sh 
INNER JOIN espec_db.flowrunsystem frt on frt.documentId=sh.JournalID 
INNER JOIN espec_db.JournalBygroup jbg on jbg.journalGroupID=sh.JournalGroupID WHERE  sh.stateflow=frt.stateflow
AND frt.activerecieved='0' 
AND sh.Actives='1'
AND frt.approveById=${id}
AND sh.statusflow  IN ('203')
group by jbg.groupId,jbg.journalGroupID,jbg.userRequest,frt.stateflow,jbg.createBy,jbg.confirmDateTime,endstateflow,createName,actions`;

        conn.query(dataall, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get dedicateTo " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });

    }


    getJournalGroupListByid(req, res) {
        const { id } = req.params
        var dataall = `SELECT jbg.groupId,jbg.journalGroupID,jbg.confirmDateTime,sh.stateflow,
(select flowrunsystem.statusType from espec_db.flowrunsystem where flowrunsystem.stateflow=sh.stateflow and flowrunsystem.documentId=sh.JournalID limit 1)as statusTypes,
(SELECT SDSS_Head.statusflow FROM espec_db.SDSS_Head WHERE SDSS_Head.JournalGroupID=jbg.journalGroupID  LIMIT 1) as statusflow,
(SELECT SDSS_Head.JournalID FROM espec_db.SDSS_Head WHERE SDSS_Head.JournalGroupID=jbg.journalGroupID  LIMIT 1) as JournalID,
jbg.userRequest,
(select flowrunsystem.stateflow from espec_db.flowrunsystem where flowrunsystem.documentId=frt.documentId order by flowrunsystem.stateflow desc limit 1)as endstateflow,
frt.activerecieved,
(select flowrunsystem.active from espec_db.flowrunsystem where flowrunsystem.stateflow=sh.stateflow and flowrunsystem.documentId=sh.JournalID limit 1)as activeapproved,
jbg.createBy,(SELECT userall.name FROM espec_db.userall WHERE userall.userId=jbg.createBy) as createName,
(SELECT 
	fd.statusType
FROM 
	espec_db.flowdetails fd INNER JOIN espec_db.flowdetailsub fs ON fs.flowdetailId=fd.flowdetailId 
    WHERE fs.approveBydId=${id} LIMIT 1)as usertypestatus,
'111'as actions
FROM espec_db.SDSS_Head sh 
INNER JOIN espec_db.flowrunsystem frt on frt.documentId=sh.JournalID 
INNER JOIN espec_db.JournalBygroup jbg on jbg.journalGroupID=sh.JournalGroupID WHERE 
 sh.Actives='1'
AND frt.approveById=${id}
group by jbg.groupId,jbg.journalGroupID,jbg.userRequest,jbg.createBy,jbg.confirmDateTime,endstateflow,createName,actions,frt.activerecieved,sh.stateflow,activeapproved,statusTypes order by journalGroupID DESC`;

        conn.query(dataall, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get SDSS_Head" });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });

    }


    getJournalGroupListChange(req, res) {
        const { id } = req.params
        var dataall = `SELECT jbg.groupId,jbg.journalGroupID,jbg.confirmDateTime,sh.stateflow,
(select flowrunsystem.statusType from espec_db.flowrunsystem where flowrunsystem.stateflow=sh.stateflow and flowrunsystem.documentId=sh.JournalID limit 1)as statusTypes,
(SELECT SDSS_Head.statusflow FROM espec_db.SDSS_Head WHERE SDSS_Head.JournalGroupID=jbg.journalGroupID  LIMIT 1) as statusflow,
(SELECT SDSS_Head.JournalID FROM espec_db.SDSS_Head WHERE SDSS_Head.JournalGroupID=jbg.journalGroupID  LIMIT 1) as JournalID,
jbg.userRequest,
(select SDSS_Head.SaleAckUserID from espec_db.SDSS_Head where SDSS_Head.JournalGroupID=sh.JournalGroupID limit 1)as SaleApproved,
(select flowSystem.detail from espec_db.flowSystem where flowSystem.flowId=sh.FlowrunId limit 1)as flowdetail,
(select flowrunsystem.stateflow from espec_db.flowrunsystem where flowrunsystem.documentId=frt.documentId order by flowrunsystem.stateflow desc limit 1)as endstateflow,
frt.activerecieved,
(select flowrunsystem.active from espec_db.flowrunsystem where flowrunsystem.stateflow=sh.stateflow and flowrunsystem.documentId=sh.JournalID limit 1)as activeapproved,
jbg.createBy,(SELECT userall.name FROM espec_db.userall WHERE userall.userId=jbg.createBy) as createName,
'111'as actions
FROM espec_db.SDSS_Head sh 
INNER JOIN espec_db.flowrunsystem frt on frt.documentId=sh.JournalID 
INNER JOIN espec_db.JournalBygroup jbg on jbg.journalGroupID=sh.JournalGroupID WHERE 
 sh.Actives='1'
AND sh.statusflow!='105'
AND frt.approveById=${id}
group by jbg.groupId,jbg.journalGroupID,jbg.userRequest,jbg.createBy,jbg.confirmDateTime,endstateflow,createName,actions,frt.activerecieved,sh.stateflow,
activeapproved,statusTypes,SaleApproved,flowdetail order by journalGroupID DESC`;

        conn.query(dataall, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get SDSS_Head" });

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
module.exports = new JournalBygroupController();