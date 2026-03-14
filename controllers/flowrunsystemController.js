const conn = require("../config/db");
const Transition = require("../Funcaions/functionTransition");
const SendToEmail = require("../Funcaions/functinSentEmailbyEvent");


class FlowrunsystemController {

    createFlowrunsystem(req, res) {
        const {
            documentId, flowId, flowsubId, flowdetailId, approveById, statusType,
            departmentType, stateflow, active, activetoall, activededicate, dedicatedBy, flowlevel
        } = req.body;

        var dataall = `INSERT INTO flowrunsystem(documentId,flowId,flowsubId,flowdetailId,approveById,statusType,departmentType,stateflow,active,activetoall,activerecieved,activededicate,dedicatedToId,flowlevel) 
        VALUES (${documentId},${flowId},${flowsubId},${flowdetailId},${approveById},'${statusType}','${departmentType}','${stateflow}','${active}','${activetoall}','0','${activededicate}','${dedicatedBy}','${flowlevel}]')`;

        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add flowrunsystem" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update flowrunsystem successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update flowrunsystem fialed' })
                }
            }

        });

    }

    updateFlowrunsystem(req, res) {

        const { id } = req.params

        const { documentId, flowId, flowsubId, flowdetailId, approveById, statusType,
            departmentType, stateflow, active, activededicate, dedicatedBy, flowlevel } = req.body;

        var dataall = `UPDATE flowrunsystem SET documentId=${documentId},flowId=${flowId},flowsubId=${flowsubId},flowdetailId=${flowdetailId},approveById=${approveById},
        statusType='${statusType}',departmentType='${departmentType}',stateflow='${stateflow}',active='${active}',activededicate='${activededicate}',dedicatedToId=${dedicatedBy},flowlevel='${flowlevel}' WHERE runflowId=${id}`;

        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add flowrunsystem" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update flowrunsystem successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update flowrunsystem fialed' })
                }
            }
        });

    }

    Flowrunsystemall(req, res) {
        var dataall = `SELECT * FROM flowrunsystem`;

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get flowrunsystem " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });
    }

    FlowrunsystemById(req, res) {
        const { id } = req.params

        var dataall = `SELECT * FROM flowrunsystem WHERE runflowId=${id}`;

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get flowrunsystem " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });

    }

    flowTotalBystatusflow(req, res) {
        const { id } = req.params
        var dataall = `SELECT 
	(SELECT COUNT(flowrunsystem.runflowId)as panding 
     FROM flowrunsystem 
     WHERE 
     flowrunsystem.activerecieved='0'AND flowrunsystem.active='0'
     AND flowrunsystem.approveById=fr.approveById ) as panding_count,
     
     (SELECT COUNT(flowrunsystem.runflowId)as inpreview 
     FROM 
      flowrunsystem 
     WHERE 
      flowrunsystem.activerecieved='1' AND flowrunsystem.active='0' 
      AND flowrunsystem.approveById=fr.approveById ) as inpreview_count,
     
     (SELECT COUNT(flowrunsystem.runflowId)as approved 
     FROM 
      flowrunsystem 
     WHERE 
    	flowrunsystem.activerecieved='1' AND  flowrunsystem.active='1'
     AND flowrunsystem.approveById=fr.approveById ) as approved_count,
     
     (SELECT COUNT(flowrunsystem.runflowId)as rejectTo 
     FROM 
      flowrunsystem 
     WHERE 
      flowrunsystem.activereject='1' AND flowrunsystem.approveById=fr.approveById ) as rejectTo_count,
     (SELECT COUNT(flowrunsystem.runflowId)as reject 
     FROM 
      flowrunsystem 
     WHERE 
      flowrunsystem.activereject='1' AND flowrunsystem.rejectToId=fr.rejectToId ) as reject_count
FROM 
	flowrunsystem fr INNER JOIN SDSS_Head sh ON sh.JournalID=fr.documentId 
WHERE  
	fr.approveById=${id} GROUP BY fr.approveById DESC;`
        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get flowrunsystem " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });
    }

    UserByflowlist(req, res) {

        const { id, numstate } = req.params
        var dataall = `SELECT 
fr.documentId, 
fr.approveById,
fr.stateflow,
(SELECT userall.name FROM userall WHERE userall.userId=fr.approveById) as approvename
FROM flowrunsystem  fr
WHERE  fr.documentId=${id} AND fr.stateflow < ${numstate}`;

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get flowrunsystem " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });

    }

    FlowrunsystemByUserId(req, res) {

        const { journalId, stateflow, UserId } = req.body

        var dataall = `SELECT 
fr.statusType,
(SELECT frs.stateflow FROM flowrunsystem frs WHERE frs.documentId=fr.documentId ORDER BY frs.stateflow DESC  LIMIT 1 ) as stateEnd
FROM 
flowrunsystem fr WHERE fr.documentId=${journalId} AND fr.stateflow='${stateflow}' AND fr.approveById=${UserId};`

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get flowrunsystem " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })


            }
            else {

                res.json({ status: 200, error: false, data: results })
            }

        });
    }

    FlowtransationByJournalID(req, res) {
        const { id } = req.params
        let datalist = `SELECT 
	fr.runflowId,
    fr.documentId, 
    flowId, 
    flowsubId,
    flowdetailId,
    approveById,
    (SELECT userall.name FROM userall WHERE userall.userId=approveById) as nameUser,
    statusType,
    (CASE 
     WHEN fr.statusType='100' THEN 'Creat'
     WHEN fr.statusType='101' THEN 'Draft'
     WHEN fr.statusType='102' THEN 'Receive'
     WHEN fr.statusType='103' THEN 'Preview'
     WHEN fr.statusType='104' THEN 'Approved'
     WHEN fr.statusType='105' THEN 'Successful'
     END
    )as statusName,
    (SELECT transitionflow.datetimes from transitionflow 
     WHERE transitionflow.JournalId=documentId 
     AND transitionflow.stateflow=stateflow 
     AND transitionflow.userId=approveById
     ORDER BY transitionflow.JournalId DESC LIMIT 1) as timeapproved,
    fr.departmentType, 
    fr.stateflow, 
    fr.active,
    (SELECT COUNT(active)as activesum FROM flowrunsystem WHERE documentId=fr.documentId and active='1') AS activesum,
    fr.activetoall,
    fr.activerecieved, 
    fr.activereject, 
    fr.rejectToId, 
    fr.activededicate, 
    fr.dedicatedToId, 
    fr.flowlevel, 
    fr.createtime 
FROM 
flowrunsystem fr WHERE documentId=${id} order BY fr.stateflow ASC;`

        conn.query(datalist, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get flowrunsystem " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })


            }
            else {

                res.json({ status: 200, error: false, data: results })
            }

        });

    }

    FlowSteplistByJourId(req, res) {
        const { id } = req.params
        var datalist = `SELECT 
    frs.runflowId,
    frs.documentId,
    frs.approveById,
    (SELECT userall.name FROM userall WHERE userall.userId=frs.approveById)AS userbyflow,
    frs.statusType,
    (
    CASE 
        WHEN frs.statusType='100' THEN 'Create'
        WHEN frs.statusType='101' THEN 'Draft'
        WHEN frs.statusType='102' THEN 'Receive'
        WHEN frs.statusType='103' THEN 'Preview'
        WHEN frs.statusType='104' THEN 'Approved'
        END
    )as nameStatus,
    frs.departmentType,
    (SELECT departments.departmentname FROM departments 
     WHERE departments.departmentcode=frs.departmentType)As departments,
    frs.stateflow,
    frs.active,
    frs.activetoall,
    frs.activerecieved,
     (SELECT transitionflow.datetimes 
     from transitionflow WHERE transitionflow.JournalId=frs.documentId 
     AND frs.stateflow=transitionflow.stateflow 
     ORDER BY  transitionflow.datetimes ASC LIMIT 1)AS Startdatetime,
    (SELECT transitionflow.datetimes 
     from transitionflow WHERE transitionflow.JournalId=frs.documentId 
     AND frs.stateflow=transitionflow.stateflow 
     ORDER BY  transitionflow.datetimes DESC LIMIT 1)AS Enddatetime
	FROM flowrunsystem frs
		WHERE frs.documentId=${id} ORDER BY frs.stateflow ASC;`

        conn.query(datalist, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get flowrunsystem " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })


            }
            else {

                res.json({ status: 200, error: false, data: results })
            }

        });

    }


    //  อนุมัติแบบ เดียว
    UpdateApprovedFlowrunByUserId(req, res) {

        const { journalId, stateflow, statusType, UserId, StateEnd, stamptimeUpdate } = req.body
        var dateNow = datetiemnow();
        var dataall = `UPDATE flowrunsystem SET active='1',activetoall='0', activerecieved='1' 
                        WHERE 
                        documentId=${journalId} AND stateflow='${stateflow}' AND approveById=${UserId}`;

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get flowrunsystem " });

            }
            if (results.affectedRows == 1) {

                countrunflowActionAll(journalId, stateflow)
                res.json({ status: 200, error: false, message: 'update state flow sucessful' })
            }
            else {
                res.json({ status: 200, error: false, message: 'update state flow sucessful' })
            }

        });

        function countrunflowActionAll(journalId, stateflow) {

            var countstate = Number(stateflow)

            var dataall = `SELECT COUNT(runflowId)as resultnum FROM flowrunsystem WHERE flowrunsystem.documentId=${journalId}
                        AND flowrunsystem.stateflow='${stateflow}' AND flowrunsystem.activetoall='1'`

            conn.query(dataall, async function (err, results, fields) {

                if (err) {
                    console.log(err);
                    return res.status(400).json({ message: "Error: Could not get flowrunsystem " });

                }

                if (results) {

                    if (results[0].resultnum > 0) {
                        let objectdata = {
                            statusflow: statusType,
                            stateflow: stateflow,
                            stamptimeUpdate: dateNow,
                            updateBy: UserId,
                            journalId: journalId
                        }

                        upateJournalById(objectdata)

                    } else {

                        let objectdata = {
                            statusflow: statusType, //*
                            stateflow: countstate + 1,//*
                            stamptimeUpdate: dateNow, //*
                            updateBy: UserId, //*
                            journalId: journalId
                        }


                        if (objectdata.stateflow <= StateEnd) {

                            upateJournalById(objectdata)

                        } else {

                            let objectdatas = {
                                statusflow: '105', //*
                                stateflow: countstate,//*
                                stamptimeUpdate: dateNow, //*
                                updateBy: UserId, //*
                                journalId: journalId
                            }
                            upateJournalById(objectdatas)
                        }


                    }

                }
                else {
                    res.json({ status: 200, error: false, data: results })
                }

            });

        }

        function upateJournalById(dataresult) {

            var dataupdate = `UPDATE SDSS_Head SET 
        statusflow='${dataresult.statusflow}',
        stateflow='${dataresult.stateflow}',
        stamptimeUpdate='${dataresult.stamptimeUpdate}',
        updateBy='${dataresult.updateBy}' WHERE JournalID=${dataresult.journalId}`;

            conn.query(dataupdate, function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ status: 400, error: true, message: "Error: Could not add SDSS_Head" });
                }

                if (res.status(200)) {
                    // กรณีที่ สร้าง menu list  
                    if (results.affectedRows == 1) {
                        console.log('update stateflow successful')

                        Transition.newTransition(journalId, UserId, '', '', '', stateflow, statusType, '', dataresult.stamptimeUpdate);
                        SendToEmail.TosendEmail(journalId, UserId, '', stateflow, 'approved', dataresult.stamptimeUpdate);

                    }
                    else {
                        console.log('update stateflow fail')

                    }
                }
            });

        }


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

    // อนุมัติแบบ กลุ่ม
    UpdateApprovedGroupFlowrunByUserId(req, res) {

        const { journalId, stateflow, statusType, UserId, StateEnd, stamptimeUpdate } = req.body
        var dateNow = datetiemnow();

        var dataall = `UPDATE flowrunsystem SET active='1',activetoall='0', activerecieved='1' 
                        WHERE 
                        documentId=${journalId} AND stateflow='${stateflow}' AND approveById=${UserId}`;

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get flowrunsystem " });

            }
            if (results.affectedRows == 1) {

                countrunflowActionAll(journalId, stateflow)
                res.json({ status: 200, error: false, message: 'update state flow sucessful' })
            }
            else {
                res.json({ status: 200, error: false, message: 'update state flow sucessful' })
            }

        });

        function countrunflowActionAll(journalId, stateflow) {

            var countstate = Number(stateflow)

            var dataall = `SELECT COUNT(runflowId)as resultnum FROM flowrunsystem WHERE flowrunsystem.documentId=${journalId}
                        AND flowrunsystem.stateflow='${stateflow}' AND flowrunsystem.activetoall='1'`

            conn.query(dataall, async function (err, results, fields) {

                if (err) {
                    console.log(err);
                    return res.status(400).json({ message: "Error: Could not get flowrunsystem " });

                }

                if (results) {

                    if (results[0].resultnum > 0) {
                        let objectdata = {
                            statusflow: statusType,
                            stateflow: stateflow,
                            stamptimeUpdate: dateNow,
                            updateBy: UserId,
                            journalId: journalId
                        }

                        upateJournalById(objectdata)

                    } else {

                        let objectdata = {
                            statusflow: statusType, //*
                            stateflow: countstate + 1,//*
                            stamptimeUpdate: dateNow, //*
                            updateBy: UserId, //*
                            journalId: journalId
                        }


                        if (objectdata.stateflow <= StateEnd) {

                            upateJournalById(objectdata)

                        } else {

                            let objectdatas = {
                                statusflow: '105', //*
                                stateflow: countstate,//*
                                stamptimeUpdate: dateNow, //*
                                updateBy: UserId, //*
                                journalId: journalId
                            }
                            upateJournalById(objectdatas)
                        }


                    }

                }
                else {
                    res.json({ status: 200, error: false, data: results })
                }

            });

        }

        function upateJournalById(dataresult) {

            var dataupdate = `UPDATE SDSS_Head SET 
        statusflow='${dataresult.statusflow}',
        stateflow='${dataresult.stateflow}',
        stamptimeUpdate='${dataresult.stamptimeUpdate}',
        updateBy='${dataresult.updateBy}' WHERE JournalID=${dataresult.journalId}`;

            conn.query(dataupdate, function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ status: 400, error: true, message: "Error: Could not add SDSS_Head" });
                }

                if (res.status(200)) {
                    // กรณีที่ สร้าง menu list  
                    if (results.affectedRows == 1) {
                        //   console.log('update stateflow successful')

                        Transition.newTransition(journalId, UserId, '', '', '', stateflow, '102', '', dataresult.stamptimeUpdate);
                        Transition.newTransition(journalId, UserId, '', '', '', stateflow, statusType, '', dataresult.stamptimeUpdate);

                        SendToEmail.TosendEmail(journalId, UserId, '', stateflow, 'approved', dataresult.stamptimeUpdate);

                    }
                    else {
                        console.log('update stateflow fail')
                        // res.json({ status: 400, error: true, message: 'update SDSS_Head fialed' })
                    }
                }
            });

        }


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


    UpdateRecievedflow(req, res) {

        const { journalId, stateflow, UserId, stamptimeUpdate } = req.body
        var dateNow = datetiemnow()
        var dataall = `UPDATE flowrunsystem SET activerecieved='1' 
                        WHERE 
                        documentId=${journalId} AND stateflow='${stateflow}' AND approveById=${UserId}`;

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get flowrunsystem " });

            }
            if (results.affectedRows == 1) {

                Transition.newTransition(journalId, UserId, "", "", "", stateflow, '102', "", dateNow);
                res.json({ status: 200, error: false, message: 'update state flow sucessful' })
            }
            else {
                res.json({ status: 200, error: false, message: 'update state flow sucessful' })
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


    UpdateReJectflow(req, res) {

        const { journalId, stateflow, UserId, reject_stateflow, notedetail, rejectToId, stamptimeUpdate, eventstatus } = req.body
        var dateNow = datetiemnow();
        var dataall = `UPDATE flowrunsystem SET active='0',activetoall='1',activerecieved='0' WHERE stateflow >='${reject_stateflow}' and documentId=${journalId}`

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get flowrunsystem " });

            }
            if (results.affectedRows >= 1) {

                // SendToEmail.TosendEmail(journalId, UserId, rejectToId, stateflow, 'reject', stamptimeUpdate);

                updateNote()

                res.json({ status: 200, error: false, message: 'update state flow sucessful' })
            }
            else {
                res.json({ status: 200, error: false, message: 'update state flow sucessful' })
            }
        });

        function updateNote() {

            var dataall = `INSERT INTO 
                    transitionnote(documentId, notedetail, datetimenote, createnoteby, noteedit, datetimeedit, editnoteby,eventstatus) 
                    VALUES 
                    (${journalId},'${notedetail}','${dateNow}','${UserId}','','','${rejectToId}','${eventstatus}')`;
            conn.query(dataall, async function (err, results, fields) {

                if (err) {
                    console.log(err);
                    return res.status(400).json({ message: "Error: Could not get transitionnote " });

                }
                if (results.affectedRows > 0) {
                    SendToEmail.TosendEmail(journalId, UserId, rejectToId, stateflow, 'reject', dateNow);
                    uptateJournal()
                    //   console.log('create note successful');
                }
                else {
                    console.log(res);

                }
            });

        }

        function uptateJournal() {
            var dataall = `UPDATE SDSS_Head SET statusflow='201',stateflow='${reject_stateflow}',rejectTo='${rejectToId}' WHERE JournalID=${journalId}`;
            conn.query(dataall, async function (err, results, fields) {

                if (err) {
                    console.log(err);
                    return res.status(400).json({ message: "Error: Could not get transitionnote " });

                }
                if (results.affectedRows == 1) {
                    Transition.newTransition(journalId, UserId, rejectToId, '', '', reject_stateflow, '201', '', dateNow);
                    // SendToEmail.TosendEmail(journalId, UserId, rejectToId, stateflow, 'reject', stamptimeUpdate);
                    //  SendToEmail.TosendEmail(journalId, UserId, rejectToId, stateflow, 'reject', stamptimeUpdate);

                    deletetransitionflow(reject_stateflow);

                }
                else {
                    console.log(res);

                }
            });

        }

        function deletetransitionflow(stateflow) {
            var datalist = `DELETE FROM transitionflow WHERE stateflow >='${stateflow}' AND JournalId=${journalId}`;

            conn.query(datalist, function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ status: 400, error: true, message: "Error: Could not delete transitionflow" });
                }

                if (results) {
                    // กรณีที่ สร้าง menu list  
                    if (results.affectedRows >= 1) {
                        //  console.log(results);
                    }
                    else {
                        console.log(results)
                    }
                }
            });

        }

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


    //reject journal by group list - - - >
    UpdateReJectgroupflow(req, res) {

        const { journalId, UserId, reject_stateflow,rejectToId} = req.body
        var dateNow = datetiemnow();
        var dataall = `UPDATE flowrunsystem SET active='0',activetoall='1',activerecieved='0' WHERE stateflow >='${reject_stateflow}' and documentId=${journalId}`

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get flowrunsystem " });

            }
            if (results.affectedRows >= 1) {
                uptateJournal()
              
                res.json({ status: 200, error: false, message: 'update state flow sucessful' })
            }
            else {
                res.json({ status: 200, error: false, message: 'update state flow sucessful' })
            }
        });

        function uptateJournal() {

            var dataall = `UPDATE SDSS_Head SET statusflow='203',stateflow='${reject_stateflow}',rejectTo='${rejectToId}' WHERE JournalID=${journalId}`;
            conn.query(dataall, async function (err, results, fields) {

                if (err) {
                    console.log(err);
                    return res.status(400).json({ message: "Error: Could not get transitionnote " });

                }
                if (results.affectedRows == 1) {
                    Transition.newTransition(journalId, UserId, rejectToId, '', '', reject_stateflow, '203', '', dateNow);
                    deletetransitionflow(reject_stateflow);

                }
                else {
                    console.log(res);

                }
            });

        }

        function deletetransitionflow(stateflow) {
            var datalist = `DELETE FROM transitionflow WHERE stateflow >='${stateflow}' AND JournalId=${journalId}`;

            conn.query(datalist, function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ status: 400, error: true, message: "Error: Could not delete transitionflow" });
                }

                if (results) {
                    // กรณีที่ สร้าง menu list  
                    if (results.affectedRows >= 1) {
                    }
                    else {
                        console.log(results)
                    }
                }
            });

        }

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


    UpdateEditReject(req, res) {

        const { documentId, stateflownote, createnoteby, noteId, userId, notedetail, stateflow, statusflow, stamptimeUpdate, eventstatus } = req.body
        var dateNow=datetiemnow()
        var dataall = `UPDATE flowrunsystem SET active='1',activetoall='0',activerecieved='1'
        WHERE 
        documentId=${documentId} AND stateflow='${stateflow}' AND approveById=${userId}`; // update เพื่อให้รู้สถานะว่าเรามีการ reject journal นี้ 

        conn.query(dataall, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get flowrunsystem " });

            }
            if (results.affectedRows >= 1) {

                updateNote()

                SendToEmail.TosendEmail(documentId, userId, '', stateflow, 'approved', dateNow);

                res.json({ status: 200, error: false, message: 'update state1 flow sucessful' })
            }
            else {
                res.json({ status: 200, error: false, message: 'update state2 flow sucessful' })
            }
        });

        function updateNote() {

            var dataall = `UPDATE transitionnote SET noteedit='${notedetail}',datetimeedit='${dateNow}',
            editnoteby='${userId}',eventstatus='${eventstatus}' WHERE noteId=${noteId}`;

            conn.query(dataall, async function (err, results, fields) {

                if (err) {
                    console.log(err);
                    return res.status(400).json({ message: "Error: Could not get transitionnote " });

                }
                if (results.affectedRows >= 1) {
                    console.log(results)
                    uptateJournal()
                    console.log('create note successful');
                }
                else {
                    console.log(results)
                    console.log(res);

                }
            });

        }

        function uptateJournal() {
            var newstateflow = parseInt(stateflow) + 1;

            var dataall = `UPDATE SDSS_Head SET statusflow='${statusflow}',stateflow='${newstateflow}',rejectTo='' WHERE JournalID=${documentId}`;
            conn.query(dataall, async function (err, results, fields) {

                if (err) {
                    console.log(err);
                    return res.status(400).json({ message: "Error: Could not get transitionnote " });

                }
                if (results.affectedRows == 1) {

                    // JournalId, userId, rejectTo, dedicateTo, recallTo, stateflow, statusflow, confirmflow, datetimes
                    Transition.newTransition(documentId, userId, '', '', '', stateflow, '102', '', dateNow);
                    Transition.newTransition(documentId, userId, '', '', '', stateflow, '103', '', dateNow);

                    console.log('create update journal successful');
                }
                else {
                    console.log(res);
                    // res.json({ status: 200, error: false, message: 'update state flow sucessful' })
                }
            });

        }

        function datetiemnow(){
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

    deleteById(req, res) {
        const { id } = req.params

        var dataall = `DELETE FROM flowrunsystem WHERE runflowId=${id}`;

        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add flowrunsystem" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'DELETE flowrunsystem successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'DELETE flowrunsystem fialed' })
                }
            }

        });

    }

}

module.exports = new FlowrunsystemController()