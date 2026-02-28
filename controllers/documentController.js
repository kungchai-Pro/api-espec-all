const conn = require("../config/db");
const Transition = require("../Funcaions/functionTransition");
const FlowlNewDocument = require("../Funcaions/functionRunning");
const DeleteChangeflow = require("../Funcaions/functionDeleteChange");
// const moment = require("moment");


class DocumentController {
    // ส่วน header 
    createDocument(req, res) {

        const { JournalID, JournalCode, Revise, TransDate, JournalGroupID, ItemTypeID, Purpose, LastApprovedDate,
            RefECN, PartFileECN, UserIDRequest, CustID, CustName, ItemID, ItemName, BrandID, SpecId, SpecName, BOMVersion, PackagingDetails, Remark, UserIDConfirm,
            ConfirmDateTime, Typeproduct, PurposeDetail, SaleAckUserID, FlowrunId, typeDocement, statusflow,
            stateflow, rejectTo, recallTo, dedicatedTo, stamptimeUpdate, updateBy, Actives
        } = req.body

        var dateNow = datetiemnow();

        var newdate = `INSERT INTO SDSS_Head(JournalCode,Revise,TransDate, JournalGroupID, ItemTypeID, Purpose, LastApprovedDate,
         RefECN, PartFileECN,UserIDRequest,CustID,CustName,ItemID,ItemName,BrandID,SpecId,SpecName,BOMVersion,PackagingDetails, Remark, UserIDConfirm, 
         ConfirmDateTime, Typeproduct,PurposeDetail,SaleAckUserID, FlowrunId,typeDocement, statusflow, 
         stateflow,recievejob, rejectTo, recallTo,dedicatedTo,noteRevise,stamptimeUpdate,updateBy,StandardCode,RefgroupCode,Actives) 
        VALUES ('${JournalCode}','${Revise}','${TransDate}','${JournalGroupID}','${ItemTypeID}','${Purpose}','${LastApprovedDate}','${RefECN}',
        '${PartFileECN}','${UserIDRequest}','${CustID}','${CustName}',
        '${ItemID}','${ItemName}','${BrandID}','${SpecId}','${SpecName}','${BOMVersion}','${PackagingDetails}','${Remark}',
        '${UserIDConfirm}','${ConfirmDateTime}','${Typeproduct}','${PurposeDetail}','${SaleAckUserID}',
        '${FlowrunId}','${typeDocement}','${statusflow}','${stateflow}','0','${rejectTo}',
        '${recallTo}','${dedicatedTo}','','${dateNow}','${updateBy}','${JournalCode}','','${Actives}')`;

        conn.query(newdate, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add SDSS_Head" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {

                    CheckRunning(typeDocement, FlowrunId, results.insertId)
                    Transition.newTransition(results.insertId, UserIDConfirm, "", "", "", stateflow, '102', "", dateNow);
                    FlowlNewDocument.FlowlNewDocument(FlowrunId, results.insertId, dateNow);
                    res.json({
                        status: 200,
                        error: false,
                        message: 'create SDSS_Head successfully',
                        insertId: results.insertId
                    })

                }
                else {
                    res.json({ status: 400, error: true, message: 'create SDSS_Head fialed' })
                }
            }

        });

        function CheckRunning(typeDocement) {
            var dataselect = `
        SELECT 
            runningformate, years, running, typeId
        FROM 
            runningdocument
        WHERE 
            years='2025' AND typeId=${typeDocement};`;

            conn.query(dataselect, async function (err, results, fields) {
                if (err) {
                    console.log(err);
                }

                if (results.length > 0) {
                    updateRunningdocument(results[0].running, results[0].typeId)
                }
                else {

                    console.log(results)
                }

            });

        }

        function updateRunningdocument(runnumber, idrun) {
            let runnumbernew = parseInt(runnumber) + 1;
            var dataall = `UPDATE runningdocument SET running='${runnumbernew}' WHERE  runId=${idrun}`;

            conn.query(dataall, function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ status: 400, error: true, message: "Error: Could not add SDSS_Head" });
                }

                if (results) {
                    // กรณีที่ สร้าง menu list  
                    if (results.affectedRows == 1) {
                        console.log('update running successful');

                    }
                    else {
                        console.log('err');
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

    // revise journal  เดียว
    createReviseDocument(req, res) {

        const { JournalID, JournalCode, Revise, TransDate, JournalGroupID, ItemTypeID, Purpose, LastApprovedDate,
            RefECN, PartFileECN, UserIDRequest, CustID, CustName, ItemID, ItemName, BrandID, SpecId, SpecName,
            BOMVersion, PackagingDetails, Remark, UserIDConfirm,
            ConfirmDateTime, Typeproduct, PurposeDetail, SaleAckUserID, FlowrunId, typeDocement, statusflow,
            stateflow, rejectTo, recallTo, dedicatedTo, noteRevise, stamptimeUpdate, updateBy, StandardCode, Actives
        } = req.body

        var newdate = `INSERT INTO SDSS_Head(JournalCode,Revise,TransDate, JournalGroupID, ItemTypeID, Purpose, LastApprovedDate,
         RefECN, PartFileECN,UserIDRequest,CustID,CustName,ItemID,ItemName,BrandID,SpecId,SpecName,BOMVersion,PackagingDetails, Remark, UserIDConfirm, 
         ConfirmDateTime, Typeproduct,PurposeDetail,SaleAckUserID, FlowrunId,typeDocement, statusflow, 
         stateflow,recievejob, rejectTo, recallTo,dedicatedTo,noteRevise,stamptimeUpdate,updateBy,StandardCode,RefgroupCode,Actives) 
        VALUES ('${JournalCode}','${Revise}','${TransDate}','','${ItemTypeID}','${Purpose}',
        '${LastApprovedDate}','${RefECN}','${PartFileECN}','${UserIDRequest}','${CustID}','${CustName}',
        '${ItemID}','${ItemName}','${BrandID}','${SpecId}','${SpecName}','${BOMVersion}','${PackagingDetails}','${Remark}','${UserIDConfirm}',
        '${ConfirmDateTime}','${Typeproduct}','${PurposeDetail}','${SaleAckUserID}','${FlowrunId}','${typeDocement}',
        '${statusflow}','${stateflow}','0','${rejectTo}','${recallTo}','${dedicatedTo}','${noteRevise}','${stamptimeUpdate}','${updateBy}','${StandardCode}','${JournalGroupID}','${Actives}')`;

        conn.query(newdate, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add SDSS_Head" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    Transition.newTransition(results.insertId, UserIDConfirm, "", "", "", stateflow, '102', "", stamptimeUpdate);

                    DeleteFlowsystem(FlowrunId, results.insertId)

                    res.json({
                        status: 200,
                        error: false,
                        message: 'create revise SDSS_Head successfully',
                        insertId: results.insertId
                    })
                    UpdateJouranlAction(JournalID);


                }
                else {
                    res.json({ status: 400, error: true, message: 'create revise  SDSS_Head fialed' })
                }
            }

        });

        function DeleteFlowsystem(idflow, jourId) {
            var datadelete = `DELETE FROM flowrunsystem WHERE flowrunsystem.documentId=${jourId}`;

            conn.query(datadelete, function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ status: 400, error: true, message: "Error: Could not add flowrunsystem" });
                }

                if (res.status(200)) {
                    // กรณีที่ สร้าง menu list  
                    if (results.affectedRows > 1) {

                        flowlistByTypedocument(idflow, jourId)
                    }
                    else {
                        flowlistByTypedocument(idflow, jourId)

                    }
                }
            });

        }

        function flowlistByTypedocument(idflow, jourId) {
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
        WHERE flowSystem.flowId=${idflow}`;

            conn.query(dataall, async function (err, results, fields) {

                if (err) {
                    console.log(err);
                    // return res.status(400).json({ message: "Error: Could not get transitionnote " });

                }
                if (results.length > 0) {
                    insertLoop(results, jourId)
                }
                else {
                    console.log(results)
                    // res.json({ status: 200, error: false, data: results })
                }

            });

        }
        // run flow การทำงาน 
        async function insertLoop(data, jourId) {
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

        function UpdateJouranlAction(idjour) {

            var jourdata = `UPDATE SDSS_Head SET Actives='0' WHERE JournalID=${idjour}`;
            conn.query(jourdata, function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ status: 400, error: true, message: "Error: Could not add SDSS_Head" });
                }

                if (res.status(200)) {
                    // กรณีที่ สร้าง menu list  
                    if (results.affectedRows == 1) {
                        console.log(res)
                    }
                    else {
                        // res.json({ status: 400, error: true, message: 'update SDSS_Head fialed' })
                    }
                }
            });

        }

    }


    // revise กลุ่ม
    createReviseGroupDocument(req, res) {

        const { JournalID, JournalCode, Revise, TransDate, JournalGroupID, ItemTypeID, Purpose, LastApprovedDate,
            RefECN, PartFileECN, UserIDRequest, CustID, CustName, ItemID, ItemName, BrandID, SpecId, SpecName,
            BOMVersion, PackagingDetails, Remark, UserIDConfirm,
            ConfirmDateTime, Typeproduct, PurposeDetail, SaleAckUserID, FlowrunId, typeDocement, statusflow,
            stateflow, rejectTo, recallTo, dedicatedTo, stamptimeUpdate, updateBy, StandardCode, Actives
        } = req.body

        var newdate = `INSERT INTO SDSS_Head(JournalCode,Revise,TransDate, JournalGroupID, ItemTypeID, Purpose, LastApprovedDate,
         RefECN, PartFileECN,UserIDRequest,CustID,CustName,ItemID,ItemName,BrandID,SpecId,SpecName,BOMVersion,PackagingDetails, Remark, UserIDConfirm, 
         ConfirmDateTime, Typeproduct,PurposeDetail,SaleAckUserID, FlowrunId,typeDocement, statusflow, 
         stateflow,recievejob, rejectTo, recallTo,dedicatedTo,noteRevise,stamptimeUpdate,updateBy,StandardCode,RefgroupCode,Actives) 
        VALUES ('${JournalCode}','${Revise}','${TransDate}','${JournalGroupID}','${ItemTypeID}','${Purpose}',
        '${LastApprovedDate}','${RefECN}','${PartFileECN}','${UserIDRequest}','${CustID}','${CustName}',
        '${ItemID}','${ItemName}','${BrandID}','${SpecId}','${SpecName}','${BOMVersion}','${PackagingDetails}','${Remark}','${UserIDConfirm}',
        '${ConfirmDateTime}','${Typeproduct}','${PurposeDetail}','${SaleAckUserID}','${FlowrunId}','${typeDocement}',
        '${statusflow}','${stateflow}','0','${rejectTo}','${recallTo}','${dedicatedTo}','','${stamptimeUpdate}','${updateBy}','${StandardCode}','${JournalGroupID}','${Actives}')`;

        conn.query(newdate, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add SDSS_Head" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    DeleteFlowsystem(FlowrunId, results.insertId)
                    res.json({
                        status: 200,
                        error: false,
                        message: 'create revise SDSS_Head successfully',
                        insertId: results.insertId
                    })
                    UpdateJouranlAction(JournalID);


                }
                else {
                    res.json({ status: 400, error: true, message: 'create revise  SDSS_Head fialed' })
                }
            }

        });

        function DeleteFlowsystem(idflow, jourId) {
            var datadelete = `DELETE FROM flowrunsystem WHERE flowrunsystem.documentId=${jourId}`;

            conn.query(datadelete, function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ status: 400, error: true, message: "Error: Could not add flowrunsystem" });
                }

                if (res.status(200)) {
                    // กรณีที่ สร้าง menu list  
                    if (results.affectedRows > 1) {
                        flowlistByTypedocument(idflow, jourId)
                    }
                    else {
                        flowlistByTypedocument(idflow, jourId)

                    }
                }
            });

        }

        function flowlistByTypedocument(idflow, jourId) {
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
        WHERE flowSystem.flowId=${idflow}`;

            conn.query(dataall, async function (err, results, fields) {

                if (err) {
                    console.log(err);
                }
                if (results.length > 0) {
                    insertLoop(results, jourId);
                }
                else {
                    console.log(results)
                }

            });

        }

        // run flow การทำงาน 
        async function insertLoop(data, jourId) {
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



        function UpdateJouranlAction(idjour) {

            var jourdata = `UPDATE SDSS_Head SET Actives='0' WHERE JournalID=${idjour}`;
            conn.query(jourdata, function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ status: 400, error: true, message: "Error: Could not add SDSS_Head" });
                }

                if (res.status(200)) {
                    // กรณีที่ สร้าง menu list  
                    if (results.affectedRows == 1) {
                        console.log(res)
                    }
                    else {
                        // res.json({ status: 400, error: true, message: 'update SDSS_Head fialed' })
                    }
                }
            });

        }

    }

    updateDocument(req, res) {
        const { id } = req.params

        const { JournalCode, Revise, TransDate, JournalGroupID, ItemTypeID, Purpose, LastApprovedDate,
            RefECN, PartFileECN, UserIDRequest, CustID, CustName, ItemID, ItemName, BrandID, SpecId, SpecName, BOMVersion, PackagingDetails, Remark, UserIDConfirm,
            ConfirmDateTime, Typeproduct, TypeproductName, PurposeDetail, SaleAckUserID, FlowrunId, flowDetail, typeDocement, statusflow,
            stateflow, rejectTo, recallTo, dedicatedTo, stamptimeUpdate, updateBy, Actives
        } = req.body

        var dataCheck = `SELECT  COUNT(JournalID)as taltal FROM SDSS_Head WHERE  JournalID=${id} AND FlowrunId=${FlowrunId};`
        conn.query(dataCheck, async function (err, results, fields) {

            if (err) {
                console.log(err);
            }
            if (results.length > 0) {
                // console.log();
                updatelist(results[0].taltal)

            }
            else {
                updatelist(results[0].taltal)
            }

        });


        function updatelist(countNo) {

            var dataupdate = `UPDATE SDSS_Head SET JournalCode='${JournalCode}',Revise='${Revise}',TransDate='${TransDate}',
        JournalGroupID='${JournalGroupID}',ItemTypeID='${ItemTypeID}',Purpose='${Purpose}',
        LastApprovedDate='${LastApprovedDate}',RefECN='${RefECN}',PartFileECN='${PartFileECN}',
        UserIDRequest='${UserIDRequest}',CustID='${CustID}',CustName='${CustName}',ItemID='${ItemID}',ItemName='${ItemName}',
        BrandID='${BrandID}',SpecId='${SpecId}',SpecName='${SpecName}',BOMVersion='${BOMVersion}',PackagingDetails='${PackagingDetails}',Remark='${Remark}',
        UserIDConfirm='${UserIDConfirm}',ConfirmDateTime='${ConfirmDateTime}',
        Typeproduct='${Typeproduct}',PurposeDetail='${PurposeDetail}',SaleAckUserID='${SaleAckUserID}',
        FlowrunId='${FlowrunId}',typeDocement='${typeDocement}',statusflow='${statusflow}',
        stateflow='${stateflow}',rejectTo='${rejectTo}',recallTo='${recallTo}',dedicatedTo='${dedicatedTo}',
        stamptimeUpdate='${stamptimeUpdate}',updateBy='${updateBy}',Actives='${Actives}' WHERE JournalID=${id}`;

            conn.query(dataupdate, function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ status: 400, error: true, message: "Error: Could not add SDSS_Head" });
                }

                if (res.status(200)) {
                    // กรณีที่ สร้าง menu list  

                    if (results.affectedRows == 1) {
                        if (countNo == 0) {
                            DeleteFlowsystem(FlowrunId, id)
                        }

                        res.json({ status: 200, error: false, message: 'update SDSS_Head successfully' })
                    }
                    else {
                        res.json({ status: 400, error: true, message: 'update SDSS_Head fialed' })
                    }
                }
            });

        }

        function DeleteFlowsystem(idflow, jourId) {

            var datadelete = `DELETE FROM flowrunsystem WHERE flowrunsystem.documentId=${jourId}`;
            conn.query(datadelete, function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ status: 400, error: true, message: "Error: Could not add flowrunsystem" });
                }

                if (res.status(200)) {
                    // กรณีที่ สร้าง menu list  
                    if (results.affectedRows > 1) {

                        flowlistByTypedocument(idflow, jourId)

                    } else {
                        flowlistByTypedocument(idflow, jourId)
                    }
                }
            });

        }


        function flowlistByTypedocument(FlowrunId, jourId) {

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
                    insertLoop(results, jourId)
                }
                else {
                    console.log(results)
                }

            });

        }

        // run flow การทำงาน 
        async function insertLoop(data, jourId) {
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

    }



    // กรณี ตัวการเป็นเปลี่ยน Flow วิ่ง แต่ต้องลบข้อมูลเก่าออกให้หมด
    updateDocumentChengeFlow(req, res) {

        const { id, jourcode, flowid, salename, userchang, stamptimeUpdate } = req.body

        var datadelete = `DELETE FROM flowrunsystem WHERE documentId=${id}`;

        conn.query(datadelete, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add flowrunsystem" });
            }

            if (res.status(200)) {
                if (results.affectedRows > 0) {
                    flowlistByTypedocumentNew(flowid, id, salename)


                    res.json({ status: 200, error: false, message: 'update SDSS_Head successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update SDSS_Head fialed' })
                }
            }
        });


        function flowlistByTypedocumentNew(FlowrunId, jourId, salename) {

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

                    updateStateFlow(jourId, FlowrunId, salename);
                    insertLoop(results, jourId)
                }
                else {
                    console.log(results)
                }

            });

        }


        function updateStateFlow(jourId, FlowrunId, salename) {

            var dataupdate = `UPDATE SDSS_Head SET stateflow='1',statusflow='101',FlowrunId='${FlowrunId}',SaleAckUserID='${salename}' WHERE JournalID=${jourId}`;

            conn.query(dataupdate, function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ status: 400, error: true, message: "Error: Could not add SDSS_Head" });
                }

                if (res.status(200)) {
                    // กรณีที่ สร้าง menu list  
                    if (results.affectedRows == 1) {
                        DeleteChangeflow.DeleteChangeflow(id, jourcode, userchang)

                    }
                    else {
                        console.log(res)

                    }
                }
            });

        }

        // runflow
        async function insertLoop(data, jourId) {
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

    }


    //  การ Change flow แบบ ไม่ลบข้อมูลเดิม ลบแค่ workflow เท่านั้น
    updateDocumentChengeFlowNotDelete(req, res) {

        const { id, jourcode, flowid, salename, userchang, stamptimeUpdate } = req.body

        var datadelete = `DELETE FROM flowrunsystem WHERE documentId=${id}`;

        conn.query(datadelete, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add flowrunsystem" });
            }

            if (res.status(200)) {
                if (results.affectedRows > 0) {
                    flowlistByTypedocumentNew(flowid, id, salename)


                    res.json({ status: 200, error: false, message: 'update SDSS_Head successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update SDSS_Head fialed' })
                }
            }
        });


        function flowlistByTypedocumentNew(FlowrunId, jourId, salename) {

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

                    updateStateFlow(jourId, FlowrunId, salename);
                    insertLoop(results, jourId)
                }
                else {
                    console.log(results)
                }

            });

        }

        function updateStateFlow(jourId, FlowrunId, salename) {

            var dataupdate = `UPDATE SDSS_Head SET stateflow='1',statusflow='101',FlowrunId='${FlowrunId}',SaleAckUserID='${salename}' WHERE JournalID=${jourId}`;

            conn.query(dataupdate, function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ status: 400, error: true, message: "Error: Could not add SDSS_Head" });
                }

                if (res.status(200)) {
                    // กรณีที่ สร้าง menu list  
                    if (results.affectedRows == 1) {
                        console.log('Update SDSS_Head successfully')
                        //  DeleteChangeflow.DeleteChangeflow(id, jourcode, userchang)

                    }
                    else {
                        console.log(res)

                    }
                }
            });

        }

        // runflow
        async function insertLoop(data, jourId) {
            for (const item of data) {
                // console.log(item)
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

    }



    updateFlowState() {

        const { id } = req.params
        const { statusflow, stateflow, recievejob, rejectTo, recallTo, dedicatedTo, stamptimeUpdate, updateBy } = req.body

        var dataupdate = `UPDATE SDSS_Head SET statusflow='${statusflow}',stateflow='${stateflow}',recievejob='${recievejob}',rejectTo='${rejectTo}',recallTo='${recallTo}',dedicatedTo='${dedicatedTo}',
        stamptimeUpdate='${stamptimeUpdate}',updateBy='${updateBy}' WHERE JournalID=${id}`;

        conn.query(dataupdate, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add SDSS_Head" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update SDSS_Head successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update SDSS_Head fialed' })
                }
            }
        });
    }

    // กรณีที่ยกเลิกเอกสาร
    updateDacumentStatusCancel(req, res) {
        const { id } = req.params
        const { StandardCode, Revise } = req.body
       
        
        var dataupdate = `UPDATE SDSS_Head SET  Actives='0',statusflow='200' WHERE JournalID=${id}`;

        conn.query(dataupdate, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add SDSS_Head" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    UpdatejournalAction(StandardCode, Revise)
                    res.json({ status: 200, error: false, message: 'update SDSS_Head successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update SDSS_Head fialed' })
                }
            }
        });

        function UpdatejournalAction(StandardCode, Revise) {
            var revisenew = parseInt(Revise) - 1;
           

            var jourdata = `UPDATE SDSS_Head SET Actives='1' WHERE StandardCode='${StandardCode}' AND Revise='${revisenew}'`;
            conn.query(jourdata, function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ status: 400, error: true, message: "Error: Could not add SDSS_Head" });
                }

                if (res.status(200)) {
                    // กรณีที่   อัพเดท เสร็จให้แสดงข้อมูล ลง log
                    if (results.affectedRows == 1) {
                        console.log(res)
                    }
                    else {
                         console.log(res)
                        // res.json({ status: 400, error: true, message: 'update SDSS_Head fialed' })
                    }
                }
            });



        }
    }


    DocumentAll(req, res) {

        var seleted = `SELECT ROW_NUMBER() OVER (ORDER BY sh.JournalID) AS num,
    sh.JournalID, sh.TransDate, sh.JournalGroupID,sh.JournalCode,
    sh.ItemTypeID, sh.Purpose, sh.LastApprovedDate, 
    sh.RefECN, sh.PartFileECN, sh.UserIDRequest, 
    sh.CustID, sh.ItemID,sh.ItemName, sh.BrandID,sh.SpecId,sh.SpecName, 
    sh.BOMVersion, sh.PackagingDetails, sh.Remark, 
    sh.UserIDConfirm, sh.ConfirmDateTime,sh.typeDocement,
    sh.statusflow,
    (SELECT stateflow from flowrunsystem fr WHERE fr.documentId=sh.JournalID order by fr.stateflow DESC LIMIT 1)as frstateflow,
    (CASE 
 WHEN sh.statusflow='100' THEN 'Create'
 WHEN sh.statusflow='101' THEN 'Draft'
 WHEN sh.statusflow='102' THEN 'Receive'
 WHEN sh.statusflow='103' THEN 'Preview'
 WHEN sh.statusflow='104' THEN 'Approved'
 WHEN sh.statusflow='105' THEN 'Successful'
 WHEN sh.statusflow='211' THEN 'EditReject'
 WHEN sh.statusflow='200' THEN 'Cancel'
 END
)as statusName,
    sh.recievejob,
     sh.stateflow,
    sh.rejectTo, 
    sh.recallTo,
    sh.dedicatedTo,
    sh.noteRevise, 
    sh.stamptimeUpdate, 
    sh.updateBy,
    '104' as statusActions,
    (SELECT fr.activerecieved from flowrunsystem fr 
 WHERE fr.documentId=sh.JournalID AND fr.stateflow=sh.stateflow order by fr.stateflow DESC LIMIT 1) AS activerecieved,
 (SELECT fr.active from flowrunsystem fr 
 WHERE fr.documentId=sh.JournalID AND fr.stateflow=sh.stateflow order by fr.stateflow DESC LIMIT 1) AS activeapproved,
    sh.Actives,
    sh.StandardCode,
    sh.RefgroupCode 
FROM 
	SDSS_Head sh`;
        conn.query(seleted, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get transitionnote " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });
    }

    DocumentById(req, res) {
        const { id } = req.params
        var dataselect = `SELECT 
sh.JournalID, 
sh.JournalCode,
sh.Revise,
sh.TransDate,
sh.JournalGroupID,
sh.ItemTypeID,
sh.Purpose, 
sh.LastApprovedDate, 
sh.RefECN,
sh.PartFileECN, 
sh.UserIDRequest,
sh.CustID, 
sh.CustName,
sh.ItemID, 
sh.ItemName,
sh.BrandID, 
sh.SpecId, 
sh.SpecName,
sh.BOMVersion,
sh.PackagingDetails, 
sh.Remark, 
sh.UserIDConfirm,
(SELECT userall.per FROM userall WHERE userall.userId=sh.UserIDConfirm)AS pre,
(SELECT userall.name FROM userall WHERE userall.userId=sh.UserIDConfirm)AS nameConfirme,
(SELECT userall.lastname FROM userall WHERE userall.userId=sh.UserIDConfirm)AS lastname,
sh.ConfirmDateTime,
sh.Typeproduct,
(SELECT TypeproductList.typeproduct FROM TypeproductList 
 WHERE TypeproductList.typecode=sh.Typeproduct LIMIT 1) as TypeproductName,
sh.PurposeDetail,
sh.SaleAckUserID,
sh.FlowrunId,
(SELECT flowSystem.detail FROM flowSystem WHERE flowSystem.flowId=sh.FlowrunId)as flowDetail,
sh.typeDocement, 
sh.statusflow, 
sh.recievejob, 
sh.stateflow, 
sh.rejectTo, 
sh.recallTo, 
sh.dedicatedTo, 
sh.noteRevise,
sh.stamptimeUpdate,
sh.updateBy,
sh.Actives,
sh.StandardCode,
sh.RefgroupCode
FROM SDSS_Head sh WHERE  sh.JournalID=${id}`;

        conn.query(dataselect, async function (err, results, fields) {
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

    DocumentByCode(req, res) {
        const { id } = req.params;

        var datalist = `SELECT 
sh.JournalID, 
sh.JournalCode,
sh.Revise,
sh.TransDate,
sh.JournalGroupID,
sh.ItemTypeID,
sh.Purpose, 
sh.LastApprovedDate, 
sh.RefECN,
sh.PartFileECN, 
sh.UserIDRequest,
sh.CustID, 
sh.CustName,
sh.ItemID, 
sh.ItemName,
sh.BrandID,
sh.SpecId,
sh.SpecName, 
sh.BOMVersion,
sh.PackagingDetails, 
sh.Remark, 
sh.UserIDConfirm,
(SELECT userall.per FROM userall WHERE userall.userId=sh.UserIDConfirm)AS pre,
(SELECT userall.name FROM userall WHERE userall.userId=sh.UserIDConfirm)AS nameConfirme,
(SELECT userall.lastname FROM userall WHERE userall.userId=sh.UserIDConfirm)AS lastname,
sh.ConfirmDateTime,
sh.Typeproduct,
(SELECT TypeproductList.typeproduct FROM TypeproductList 
 WHERE TypeproductList.typecode=sh.Typeproduct LIMIT 1) as TypeproductName,
sh.PurposeDetail,
sh.SaleAckUserID,
sh.FlowrunId,
(SELECT flowSystem.detail FROM flowSystem WHERE flowSystem.flowId=sh.FlowrunId)as flowDetail,
sh.typeDocement, 
sh.statusflow, 
sh.recievejob, 
sh.stateflow, 
sh.rejectTo, 
sh.recallTo, 
sh.dedicatedTo,
sh.noteRevise, 
sh.stamptimeUpdate,
sh.updateBy,
sh.Actives,
sh.StandardCode,
sh.RefgroupCode
FROM SDSS_Head sh WHERE sh.JournalCode='${id}';`;

        conn.query(datalist, async function (err, results, fields) {
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

    DocumentListByGroupId(req, res) {
        const { id } = req.params;

        var datalist = `SELECT * FROM espec_db.SDSS_Head where JournalGroupID='${id}'`;

        conn.query(datalist, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get SDSS_Head " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });
    }


    CheckNewRunning(req, res) {
        const { id } = req.params
        var dataall = `SELECT JournalCode,typeDocement FROM SDSS_Head WHERE  JournalCode='${id}'`;

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

    DocumentflowdraftByUserId(req, res) {
        const { id } = req.params;
        var dataall = `SELECT ROW_NUMBER() OVER (ORDER BY sh.JournalID) AS num,
    sh.JournalID, sh.TransDate, sh.JournalGroupID,sh.JournalCode,
    sh.ItemTypeID, sh.Purpose, sh.LastApprovedDate, 
    sh.RefECN, sh.PartFileECN, sh.UserIDRequest, 
    sh.CustID, sh.ItemID,sh.ItemName, sh.BrandID, 
    sh.BOMVersion, sh.PackagingDetails, sh.Remark, 
    sh.UserIDConfirm, sh.ConfirmDateTime,sh.typeDocement,
    sh.statusflow,
    (SELECT 
(SELECT flowSystem.detail FROM flowSystem WHERE flowSystem.flowId=flowrunsystem.flowId LIMIT 1) as nameflow
FROM flowrunsystem WHERE documentId=sh.JournalID LIMIT 1) as flowdetail,
    (SELECT stateflow from flowrunsystem fr WHERE fr.documentId=sh.JournalID order by fr.stateflow DESC LIMIT 1)as frstateflow,
    (CASE 
 WHEN sh.statusflow='100' THEN 'Create'
 WHEN sh.statusflow='101' THEN 'Draft'
 WHEN sh.statusflow='102' THEN 'Receive'
 WHEN sh.statusflow='103' THEN 'Preview'
 WHEN sh.statusflow='104' THEN 'Approved'
 WHEN sh.statusflow='105' THEN 'Successful'
 WHEN sh.statusflow='211' THEN 'EditReject'
 WHEN sh.statusflow='200' THEN 'Cancel'
 END
)as statusName,
    sh.recievejob, 
    sh.stateflow,
    sh.rejectTo, 
    sh.recallTo, 
    sh.dedicatedTo,
    sh.noteRevise, 
    sh.stamptimeUpdate, 
    sh.updateBy,
    sh.Actives,
    fr.activerecieved,
    fr.active as activeapproved,
    '103' as statusActions,
    sh.StandardCode,
    sh.RefgroupCode
    
FROM 
	SDSS_Head sh INNER JOIN flowrunsystem fr ON fr.documentId=sh.JournalID
WHERE fr.activetoall='1' AND sh.JournalGroupID='' AND fr.approveById=${id} AND fr.active='0' AND sh.Actives='1' AND sh.statusflow='101' ORDER BY sh.JournalCode DESC`;

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


    DocumentflowAllByUserId(req, res) {
        const { id } = req.params;
        var dataall = `SELECT ROW_NUMBER() OVER (ORDER BY sh.JournalID) AS num,
    sh.JournalID, sh.TransDate, sh.JournalGroupID,sh.JournalCode,
    sh.ItemTypeID, sh.Purpose, sh.LastApprovedDate, 
    sh.RefECN, sh.PartFileECN, sh.UserIDRequest, 
    sh.CustID, sh.ItemID,sh.ItemName, sh.BrandID, 
    sh.BOMVersion, sh.PackagingDetails, sh.Remark, 
    sh.UserIDConfirm, sh.ConfirmDateTime,sh.typeDocement,
    sh.statusflow,
    (SELECT stateflow from flowrunsystem fr WHERE fr.documentId=sh.JournalID order by fr.stateflow DESC LIMIT 1)as frstateflow,
    (CASE 
 WHEN sh.statusflow='100' THEN 'Create'
 WHEN sh.statusflow='101' THEN 'Draft'
 WHEN sh.statusflow='102' THEN 'Receive'
 WHEN sh.statusflow='103' THEN 'Preview'
 WHEN sh.statusflow='104' THEN 'Approved'
 WHEN sh.statusflow='105' THEN 'Successful'
 WHEN sh.statusflow='211' THEN 'EditReject'
 WHEN sh.statusflow='200' THEN 'Cancel'
 END
)as statusName,
    sh.recievejob, 
    sh.stateflow,
    (SELECT fr.activerecieved from flowrunsystem fr 
     WHERE fr.documentId=sh.JournalID AND fr.stateflow=sh.stateflow order by fr.stateflow DESC LIMIT 1)as activerecieved,
     (SELECT fr.active from flowrunsystem fr 
     WHERE fr.documentId=sh.JournalID AND fr.stateflow=sh.stateflow order by fr.stateflow DESC LIMIT 1)as activeapproved,
    sh.rejectTo, 
    sh.recallTo,
    sh.dedicatedTo,
    sh.noteRevise, 
    sh.stamptimeUpdate, 
    sh.updateBy,
    '104' as statusActions,
    sh.Actives,
    sh.StandardCode,
    sh.RefgroupCode
FROM 
	SDSS_Head sh
WHERE  sh.Actives='1' AND sh.JournalGroupID='' AND sh.UserIDConfirm='${id}' OR sh.statusflow='200' ORDER BY sh.JournalCode DESC ;`;

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

    DocumentflowByStateAll(req, res) { // รอ แสดงรายการทัี้งหมดของเรา ,status 111
        const { id } = req.params
        var dataselect = `SELECT ROW_NUMBER() OVER (ORDER BY sh.JournalID) AS num,sh.JournalID,sh.JournalCode,
sh.TransDate,sh.JournalGroupID,sh.ItemTypeID,
sh.RefECN,sh.CustID,sh.ItemID,sh.ItemName,
sh.statusflow,sh.stateflow,
(SELECT stateflow from flowrunsystem fr WHERE fr.documentId=sh.JournalID order by fr.stateflow DESC LIMIT 1)as frstateflow,
sh.recievejob,
(CASE 
WHEN sh.statusflow='100' THEN 'Creat'
 WHEN sh.statusflow='101' THEN 'Draft'
 WHEN sh.statusflow='102' THEN 'Receive'
 WHEN sh.statusflow='103' THEN 'Preview'
 WHEN sh.statusflow='104' THEN 'Approved'
 WHEN sh.statusflow='105' THEN 'Successful'
 WHEN sh.statusflow='211' THEN 'EditReject'
 WHEN sh.statusflow='200' THEN 'Cancel'
 END
)as statusName,
sh.UserIDConfirm,
(SELECT ac.name from userall ac WHERE ac.userId=sh.UserIDConfirm) as createBy,
fr.statusType,
'111' as statusActions,
(SELECT fr.activerecieved from flowrunsystem fr 
 WHERE fr.documentId=sh.JournalID AND fr.stateflow=sh.stateflow order by fr.stateflow DESC LIMIT 1) AS activerecieved,
 (SELECT fr.active from flowrunsystem fr 
 WHERE fr.documentId=sh.JournalID AND fr.stateflow=sh.stateflow order by fr.stateflow DESC LIMIT 1) AS activeapproved,
fr.activereject,
sh.Actives,
sh.StandardCode,
sh.RefgroupCode
FROM SDSS_Head sh INNER JOIN flowrunsystem fr on fr.documentId=sh.JournalID 
WHERE  fr.approveById=${id} AND sh.Actives='1' AND sh.JournalGroupID='' ORDER BY sh.JournalCode DESC;`;

        conn.query(dataselect, async function (err, results, fields) {
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


    getDocumentflowApproved(req, res) { // approved เรียบร้อยแล้ว ,status 104
        const { id } = req.params
        var dataselect = `SELECT ROW_NUMBER() OVER (ORDER BY sh.JournalID) AS num,sh.JournalID,sh.JournalCode,
sh.TransDate,sh.JournalGroupID,sh.ItemTypeID,sh.RefECN,sh.CustID,
sh.ItemID,sh.ItemName,
(SELECT 
(SELECT flowSystem.detail FROM flowSystem WHERE flowSystem.flowId=flowrunsystem.flowId LIMIT 1) as nameflow
FROM flowrunsystem WHERE documentId=sh.JournalID LIMIT 1) as flowdetail,
sh.statusflow,sh.stateflow,
(SELECT stateflow from flowrunsystem fr WHERE fr.documentId=sh.JournalID order by fr.stateflow DESC LIMIT 1)as frstateflow,
sh.recievejob,
(CASE 
 WHEN sh.statusflow='100' THEN 'Creat'
 WHEN sh.statusflow='101' THEN 'Draft'
 WHEN sh.statusflow='102' THEN 'Receive'
 WHEN sh.statusflow='103' THEN 'Preview'
 WHEN sh.statusflow='104' THEN 'Approved'
 WHEN sh.statusflow='105' THEN 'Successful'
 WHEN sh.statusflow='211' THEN 'EditReject'
 WHEN sh.statusflow='200' THEN 'Cancel'
 END
)as statusName,
sh.UserIDConfirm,
(SELECT ac.name from userall ac WHERE ac.userId=sh.UserIDConfirm) as createBy,
fr.statusType,
'104' as statusActions,
(SELECT fr.activerecieved from flowrunsystem fr 
 WHERE fr.documentId=sh.JournalID AND fr.stateflow=sh.stateflow order by fr.stateflow DESC LIMIT 1) AS activerecieved,
 (SELECT fr.active from flowrunsystem fr 
 WHERE fr.documentId=sh.JournalID AND fr.stateflow=sh.stateflow order by fr.stateflow DESC LIMIT 1) AS activeapproved,
sh.Actives,
sh.StandardCode,
sh.RefgroupCode
FROM SDSS_Head sh INNER JOIN flowrunsystem fr on fr.documentId=sh.JournalID 
WHERE fr.active='1'AND fr.activerecieved='1' AND sh.Actives='1' AND sh.JournalGroupID='' AND sh.statusflow !='105' AND fr.approveById=${id} ORDER BY sh.JournalCode DESC`;

        conn.query(dataselect, async function (err, results, fields) {
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

    getDocumentflowSuccessfully(req, res) { // approved เรียบร้อยแล้ว ,status 105
        const { id } = req.params
        var dataselect = `SELECT ROW_NUMBER() OVER (ORDER BY sh.JournalID) AS num,sh.JournalID,sh.JournalCode,
sh.TransDate,sh.JournalGroupID,sh.ItemTypeID,sh.RefECN,sh.CustID,sh.ItemID,sh.ItemName,
sh.statusflow,
sh.stateflow,
(SELECT stateflow from flowrunsystem fr WHERE fr.documentId=sh.JournalID order by fr.stateflow DESC LIMIT 1)as frstateflow,
sh.recievejob,
(CASE 
WHEN sh.statusflow='100' THEN 'Creat'
 WHEN sh.statusflow='101' THEN 'Draft'
 WHEN sh.statusflow='102' THEN 'Receive'
 WHEN sh.statusflow='103' THEN 'Preview'
 WHEN sh.statusflow='104' THEN 'Approved'
 WHEN sh.statusflow='105' THEN 'Successful'
 WHEN sh.statusflow='211' THEN 'EditReject'
 WHEN sh.statusflow='200' THEN 'Cancel'
 END
)as statusName,
sh.UserIDConfirm,
(SELECT ac.name from userall ac WHERE ac.userId=sh.UserIDConfirm) as createBy,
fr.statusType,
'111' as statusActions,
(SELECT fr.activerecieved from flowrunsystem fr 
 WHERE fr.documentId=sh.JournalID AND fr.stateflow=sh.stateflow order by fr.stateflow DESC LIMIT 1) AS activerecieved,
 (SELECT fr.active from flowrunsystem fr 
 WHERE fr.documentId=sh.JournalID AND fr.stateflow=sh.stateflow order by fr.stateflow DESC LIMIT 1) AS activeapproved,
fr.activereject,
sh.StandardCode
FROM SDSS_Head sh INNER JOIN flowrunsystem fr on fr.documentId=sh.JournalID 
WHERE  fr.approveById=${id} AND sh.Actives='1' and sh.statusflow='105' ORDER BY sh.JournalCode DESC;`;

        conn.query(dataselect, async function (err, results, fields) {
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

    getJournalSuccessfully(req, res) { // approved เรียบร้อยแล้ว ,status 105
        var dataselect = `SELECT ROW_NUMBER() OVER (ORDER BY sh.JournalID) AS num,sh.JournalID,sh.JournalCode,
sh.TransDate,sh.JournalGroupID,sh.ItemTypeID,sh.RefECN,sh.CustID,sh.ItemID,sh.ItemName,
sh.statusflow,
sh.stateflow,
(SELECT stateflow from flowrunsystem fr WHERE fr.documentId=sh.JournalID order by fr.stateflow DESC LIMIT 1)as frstateflow,
sh.recievejob,
(CASE 
WHEN sh.statusflow='100' THEN 'Creat'
 WHEN sh.statusflow='101' THEN 'Draft'
 WHEN sh.statusflow='102' THEN 'Receive'
 WHEN sh.statusflow='103' THEN 'Preview'
 WHEN sh.statusflow='104' THEN 'Approved'
 WHEN sh.statusflow='105' THEN 'Successful'
 WHEN sh.statusflow='211' THEN 'EditReject'
 WHEN sh.statusflow='200' THEN 'Cancel'
 END
)as statusName,
sh.UserIDConfirm,
(SELECT ac.name from userall ac WHERE ac.userId=sh.UserIDConfirm) as createBy,
'111' as statusActions,
(SELECT fr.activerecieved from flowrunsystem fr 
 WHERE fr.documentId=sh.JournalID AND fr.stateflow=sh.stateflow order by fr.stateflow DESC LIMIT 1) AS activerecieved,
 (SELECT fr.active from flowrunsystem fr 
 WHERE fr.documentId=sh.JournalID AND fr.stateflow=sh.stateflow order by fr.stateflow DESC LIMIT 1) AS activeapproved,
sh.Actives,
sh.StandardCode,
sh.RefgroupCode,
sh.stamptimeUpdate
FROM SDSS_Head sh 
WHERE  sh.statusflow='105' AND sh.Actives='1' ORDER BY sh.stamptimeUpdate  DESC`;

        conn.query(dataselect, async function (err, results, fields) {
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

    getnotifylistByIdUser(req, res) {

        const { Id } = req.params
        var datall = `SELECT (
SELECT COUNT(sh.JournalID)as totalnotify 
    FROM SDSS_Head sh INNER JOIN flowrunsystem fr on fr.documentId=sh.JournalID 
WHERE fr.activerecieved='1' 
    AND sh.JournalGroupID='' 
    AND fr.active='0' 
    AND fr.activereject='0' 
    AND sh.Actives='1'  
    AND fr.approveById=${Id}
)as Previewnotify,
(
SELECT COUNT(sh.JournalID)as totalontify 
    FROM SDSS_Head sh INNER JOIN flowrunsystem fr on fr.documentId=sh.JournalID 
WHERE  
    sh.stateflow=fr.stateflow 
    AND sh.JournalGroupID=''  
    AND sh.statusflow!='101'
    AND fr.activerecieved='0' 
    AND sh.Actives='1' 
    AND fr.approveById=${Id}
)as Pandingnotify,
(
    SELECT COUNT(sh.JournalID) as totalgroup
    					 FROM SDSS_Head sh 
                        INNER JOIN flowrunsystem fr on fr.documentId=sh.JournalID 
                        INNER JOIN JournalBygroup j on j.journalGroupID=sh.JournalGroupID
                        WHERE  sh.stateflow=fr.stateflow
                        AND fr.activerecieved='0' AND sh.Actives='1'
                        AND fr.approveById=${Id}
                     
        )as rejectgroupnotify,
   (
       SELECT COUNT(sh.JournalID)as total 
       FROM SDSS_Head sh INNER JOIN flowrunsystem fr on fr.documentId=sh.JournalID 
WHERE sh.statusflow='201' AND sh.stateflow=fr.stateflow AND sh.Actives='1' AND fr.approveById=${Id}
       )as totalreject,
  (
  SELECT COUNT(sh.JournalID)as total
      FROM SDSS_Head sh INNER JOIN flowrunsystem fr on fr.documentId=sh.JournalID 
WHERE 
fr.activereject='2' 
AND sh.stateflow=fr.stateflow 
AND sh.statusflow !='105'
AND sh.Actives='1' 
AND fr.approveById=${Id}
  )as totalEditreject;`

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

    getDocumentflowInPreView(req, res) { // recieved เรียบร้อยแล้ว รอ inpreview, status 103
        const { id } = req.params
        var dataselect = `SELECT ROW_NUMBER() OVER (ORDER BY sh.JournalID) AS num,sh.JournalID,sh.JournalCode,
sh.TransDate,sh.JournalGroupID,sh.ItemTypeID,sh.RefECN,sh.CustID,sh.ItemID,sh.ItemName,
sh.statusflow,
sh.stateflow,
(SELECT stateflow from flowrunsystem fr WHERE fr.documentId=sh.JournalID order by fr.stateflow DESC LIMIT 1)as frstateflow,
sh.recievejob,
(CASE 
WHEN sh.statusflow='100' THEN 'Creat'
 WHEN sh.statusflow='101' THEN 'Draft'
 WHEN sh.statusflow='102' THEN 'Receive'
 WHEN sh.statusflow='103' THEN 'Preview'
 WHEN sh.statusflow='104' THEN 'Approved'
 WHEN sh.statusflow='105' THEN 'Successful'
 WHEN sh.statusflow='211' THEN 'EditReject'
 WHEN sh.statusflow='200' THEN 'Cancel'
 END
)as statusName,
sh.UserIDConfirm,
(SELECT ac.name from userall ac WHERE ac.userId=sh.UserIDConfirm) as createBy,
fr.statusType,
'103' as statusActions,
(SELECT fr.activerecieved from flowrunsystem fr 
 WHERE fr.documentId=sh.JournalID AND fr.stateflow=sh.stateflow order by fr.stateflow DESC LIMIT 1) AS activerecieved,
 (SELECT fr.active from flowrunsystem fr 
 WHERE fr.documentId=sh.JournalID AND fr.stateflow=sh.stateflow order by fr.stateflow DESC LIMIT 1) AS activeapproved,
fr.statusType as userFlowStatus,
sh.Actives,
sh.StandardCode,
sh.RefgroupCode
FROM SDSS_Head sh INNER JOIN flowrunsystem fr on fr.documentId=sh.JournalID 
WHERE fr.activerecieved='1' AND sh.JournalGroupID='' AND fr.active='0' AND fr.activereject='0' AND sh.Actives='1'  AND fr.approveById=${id} ORDER BY sh.JournalCode DESC;`;
        conn.query(dataselect, async function (err, results, fields) {
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

    getDocumentflowReject(req, res) { // รอ recieved to panding journal , status 201
        const { id } = req.params
        var dataselect = `SELECT ROW_NUMBER() OVER (ORDER BY sh.JournalID) AS num,sh.JournalID,sh.JournalCode,
sh.TransDate,sh.JournalGroupID,sh.ItemTypeID,sh.RefECN,sh.CustID,sh.ItemID,sh.ItemName,
sh.statusflow,sh.stateflow,
(SELECT stateflow from flowrunsystem fr WHERE fr.documentId=sh.JournalID order by fr.stateflow DESC LIMIT 1)as frstateflow,
sh.recievejob,
(CASE 
 WHEN sh.statusflow='100' THEN 'Creat'
 WHEN sh.statusflow='101' THEN 'Draft'
 WHEN sh.statusflow='102' THEN 'Receive'
 WHEN sh.statusflow='103' THEN 'Preview'
 WHEN sh.statusflow='104' THEN 'Approved'
 WHEN sh.statusflow='105' THEN 'Successful'
 WHEN sh.statusflow='201' THEN 'Reject'
 WHEN sh.statusflow='211' THEN 'EditReject'
 WHEN sh.statusflow='200' THEN 'Cancel'
 END
)as statusName,
sh.UserIDConfirm,
(SELECT ac.name from userall ac WHERE ac.userId=sh.UserIDConfirm) as createBy,
fr.statusType,
'201' as statusActions,
(SELECT fr.activerecieved from flowrunsystem fr 
 WHERE fr.documentId=sh.JournalID AND fr.stateflow=sh.stateflow order by fr.stateflow DESC LIMIT 1) AS activerecieved,
 (SELECT fr.active from flowrunsystem fr 
 WHERE fr.documentId=sh.JournalID AND fr.stateflow=sh.stateflow order by fr.stateflow DESC LIMIT 1) AS activeapproved,
sh.Actives,
sh.StandardCode,
sh.RefgroupCode
FROM SDSS_Head sh INNER JOIN flowrunsystem fr on fr.documentId=sh.JournalID 
WHERE sh.statusflow='201' AND sh.stateflow=fr.stateflow AND sh.Actives='1' AND fr.approveById=${id} ORDER BY sh.JournalCode DESC;`;

        conn.query(dataselect, async function (err, results, fields) {
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


    getDocumentflowRejectEidtsuccessful(req, res) { // รอ recieved to panding journal , status 201
        const { id } = req.params
        var dataselect = `SELECT ROW_NUMBER() OVER (ORDER BY sh.JournalID) AS num,sh.JournalID,sh.JournalCode,
sh.TransDate,sh.JournalGroupID,sh.ItemTypeID,sh.RefECN,sh.CustID,sh.ItemID,sh.ItemName,
sh.statusflow,
sh.stateflow,
(SELECT flowrunsystem.stateflow from flowrunsystem  WHERE flowrunsystem.documentId=sh.JournalID 
 order by flowrunsystem.stateflow DESC LIMIT 1)as frstateflow,
sh.recievejob,
(CASE 
 WHEN sh.statusflow='100' THEN 'Creat'
 WHEN sh.statusflow='101' THEN 'Draft'
 WHEN sh.statusflow='102' THEN 'Receive'
 WHEN sh.statusflow='103' THEN 'Preview'
 WHEN sh.statusflow='104' THEN 'Approved'
 WHEN sh.statusflow='105' THEN 'Successful'
 WHEN sh.statusflow='201' THEN 'Reject'
 WHEN sh.statusflow='211' THEN 'EditReject'
 WHEN sh.statusflow='200' THEN 'Cancel'
 END
)as statusName,
sh.UserIDConfirm,
(SELECT ac.name from userall ac WHERE ac.userId=sh.UserIDConfirm) as createBy,
'202' as statusActions,
(SELECT flowrunsystem.activerecieved from flowrunsystem 
 	WHERE flowrunsystem.documentId=sh.JournalID AND flowrunsystem.stateflow=sh.stateflow order by flowrunsystem.stateflow DESC LIMIT 1) AS activerecieved,
 (SELECT flowrunsystem.active from flowrunsystem 
 WHERE flowrunsystem.documentId=sh.JournalID AND flowrunsystem.stateflow=sh.stateflow 
  order by flowrunsystem.stateflow DESC LIMIT 1) AS activeapproved,
sh.Actives,
sh.StandardCode,
sh.RefgroupCode
FROM SDSS_Head sh INNER JOIN flowrunsystem fr on fr.documentId=sh.JournalID
INNER JOIN transitionnote tn ON tn.documentId=sh.JournalID 
WHERE 
tn.eventstatus='1'
AND tn.createnoteby=${id}
AND sh.Actives='1'
GROUP BY sh.JournalID ORDER BY sh.JournalCode DESC;`;

        conn.query(dataselect, async function (err, results, fields) {
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


    getDocumentflowPanding(req, res) { // รอ recieved to panding journal  , status action 112  
        const { id } = req.params
        var dataselect = `SELECT ROW_NUMBER() OVER (ORDER BY sh.JournalID) AS num,sh.JournalID,sh.JournalCode,
sh.TransDate,sh.JournalGroupID,sh.ItemTypeID,sh.RefECN,sh.CustID,sh.ItemID,sh.ItemName,
sh.statusflow,
sh.stateflow,
(SELECT stateflow from flowrunsystem fr WHERE fr.documentId=sh.JournalID order by fr.stateflow DESC LIMIT 1)as frstateflow,
sh.recievejob,
(CASE 
 WHEN sh.statusflow='100' THEN 'Creat'
 WHEN sh.statusflow='101' THEN 'Draft'
 WHEN sh.statusflow='102' THEN 'Receive'
 WHEN sh.statusflow='103' THEN 'Preview'
 WHEN sh.statusflow='104' THEN 'Approved'
 WHEN sh.statusflow='105' THEN 'Successful'
 WHEN sh.statusflow='211' THEN 'EditReject'
 WHEN sh.statusflow='200' THEN 'Cancel'
 END
)as statusName,
sh.UserIDConfirm,
(SELECT ac.name from userall ac WHERE ac.userId=sh.UserIDConfirm) as createBy,
fr.statusType,
'112' as statusActions,
(SELECT fr.activerecieved from flowrunsystem fr 
 WHERE fr.documentId=sh.JournalID AND fr.stateflow=sh.stateflow order by fr.stateflow DESC LIMIT 1) AS activerecieved,
 (SELECT fr.active from flowrunsystem fr 
 WHERE fr.documentId=sh.JournalID AND fr.stateflow=sh.stateflow order by fr.stateflow DESC LIMIT 1) AS activeapproved,
sh.Actives,
sh.StandardCode,
sh.RefgroupCode
FROM SDSS_Head sh INNER JOIN flowrunsystem fr on fr.documentId=sh.JournalID 
WHERE  sh.stateflow=fr.stateflow AND sh.JournalGroupID='' AND sh.rejectTo='' AND fr.activerecieved='0' AND sh.Actives='1' AND fr.approveById=${id} ORDER BY sh.JournalCode DESC;`;

        conn.query(dataselect, async function (err, results, fields) {
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

    getDocumentflowDraft(req, res) { // รอ recieved to panding journal  , status action 112  
        const { id } = req.params
        var dataselect = `SELECT ROW_NUMBER() OVER (ORDER BY sh.JournalID) AS num,sh.JournalID,sh.JournalCode,
sh.TransDate,sh.JournalGroupID,sh.ItemTypeID,sh.RefECN,sh.CustID,sh.ItemID,sh.ItemName,
sh.statusflow,
sh.stateflow,
(SELECT stateflow from flowrunsystem fr WHERE fr.documentId=sh.JournalID order by fr.stateflow DESC LIMIT 1)as frstateflow,
sh.recievejob,
(CASE 
WHEN sh.statusflow='100' THEN 'Creat'
 WHEN sh.statusflow='101' THEN 'Draft'
 WHEN sh.statusflow='102' THEN 'Receive'
 WHEN sh.statusflow='103' THEN 'Preview'
 WHEN sh.statusflow='104' THEN 'Approved'
 WHEN sh.statusflow='105' THEN 'Successful'
 WHEN sh.statusflow='211' THEN 'EditReject'
 WHEN sh.statusflow='200' THEN 'Cancel'
 END
)as statusName,
sh.UserIDConfirm,
(SELECT ac.name from userall ac WHERE ac.userId=sh.UserIDConfirm) as createBy,
fr.statusType,
'111' as statusActions,
(SELECT fr.activerecieved from flowrunsystem fr 
 WHERE fr.documentId=sh.JournalID AND fr.stateflow=sh.stateflow order by fr.stateflow DESC LIMIT 1) AS activerecieved,
 (SELECT fr.active from flowrunsystem fr 
 WHERE fr.documentId=sh.JournalID AND fr.stateflow=sh.stateflow order by fr.stateflow DESC LIMIT 1) AS activeapproved,
fr.activereject,
sh.Actives,
sh.StandardCode,
sh.RefgroupCode
FROM SDSS_Head sh INNER JOIN flowrunsystem fr on fr.documentId=sh.JournalID 
WHERE  fr.approveById=${id} AND sh.Actives='1' AND sh.statusflow='101' ORDER BY sh.JournalCode DESC;`;

        conn.query(dataselect, async function (err, results, fields) {
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


    getWarningOntifyByuserId = (req, res) => {

        const { id } = req.params
        var dataall = `SELECT ROW_NUMBER() OVER (ORDER BY sh.JournalID) AS num,sh.JournalID,sh.JournalCode,
                sh.TransDate,sh.JournalGroupID,sh.ItemTypeID,sh.RefECN,sh.CustID,sh.ItemID,sh.ItemName,
                sh.statusflow,
                sh.stateflow,
                (SELECT stateflow from flowrunsystem fr WHERE fr.documentId=sh.JournalID order by fr.stateflow DESC LIMIT 1)as frstateflow,
                sh.recievejob,
                (CASE 
                WHEN sh.statusflow='100' THEN 'Creat'
                WHEN sh.statusflow='101' THEN 'Draft'
                WHEN sh.statusflow='102' THEN 'Receive'
                WHEN sh.statusflow='103' THEN 'Preview'
                WHEN sh.statusflow='104' THEN 'Approved'
                WHEN sh.statusflow='105' THEN 'Successful'
                WHEN sh.statusflow='211' THEN 'EditReject'
                WHEN sh.statusflow='200' THEN 'Cancel'
                END
                )as statusName,
                sh.UserIDConfirm,
                (SELECT ac.name from userall ac WHERE ac.userId=sh.UserIDConfirm) as createBy,
                fr.statusType,
                '112' as statusActions,
                (SELECT fr.activerecieved from flowrunsystem fr 
                     WHERE fr.documentId=sh.JournalID AND fr.stateflow=sh.stateflow order by fr.stateflow DESC LIMIT 1) AS activerecieved,
                (SELECT fr.active from flowrunsystem fr 
                     WHERE fr.documentId=sh.JournalID AND fr.stateflow=sh.stateflow order by fr.stateflow DESC LIMIT 1) AS activeapproved,
                sh.Actives,
                sh.StandardCode,
                sh.RefgroupCode
                FROM SDSS_Head sh INNER JOIN flowrunsystem fr on fr.documentId=sh.JournalID 
                WHERE  sh.stateflow=fr.stateflow
                AND fr.statusType!='100'
                AND fr.activerecieved='0' AND sh.JournalGroupID='' AND sh.Actives='1' AND fr.approveById=${id} ORDER BY sh.JournalCode DESC;`

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


    getReviseJournallist(req, res) {

        const { code, version } = req.body


        var datalist = `SELECT JournalID, JournalCode, Revise FROM SDSS_Head WHERE StandardCode='${code}' and Revise NOT IN('${version}');`

        conn.query(datalist, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get SDSS_Head " });

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
        var data = `DELETE FROM dedicateTo WHERE dedicateId=${id}`

        conn.query(data, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add transitionnote" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'delete transitionnote successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'delete transitionnote fialed' })
                }
            }

        });

    }
    ///data SDSS_Details talbe ----------->

    // ส่วนของ Detail 
    CreateDocumentDail(req, res) {
        const {
            JournalID, SlotNo, ItemID, ItemName, ItemGroupID, GroupRemark, PkDescription,
            SpecID, Width, Depth, Height, NetWeight,
            TareWeight, GrossWeight, SizeDetails, TypeSheet,
            Barcode, Batch1, BatchDetail1, BatchExample1,
            Batch2, BatchDetail2, BatchExample2, BatchNo, TypeBatch,
            Remark, ColabgroupId, UserIDConfirm, ConfirmDateTime, JournalCode
        } = req.body
        console.log(req.body)

        var data = `INSERT INTO SDSS_Details
        ( SlotNo,ItemID,ItemName,ItemGroupID,GroupRemark,PkDescription,SpecID,Width,Depth,Height,NetWeight,
        TareWeight,GrossWeight,SizeDetails,TypeSheet,Barcode,Batch1,BatchDetail1,BatchExample1,Batch2,BatchDetail2,BatchExample2,BatchNo,TypeBatch,
        Remark,ColabgroupId,UserIDConfirm,ConfirmDateTime,JournalCode) 
        VALUES 
        ('${SlotNo}','${ItemID}','${ItemName}','${ItemGroupID}','${GroupRemark}','${PkDescription}','${SpecID}','${Width}','${Depth}','${Height}','${NetWeight}',
        '${TareWeight}','${GrossWeight}','${SizeDetails}','${TypeSheet}','${Barcode}',
        '${Batch1}','${BatchDetail1}','${BatchExample1}','${Batch2}','${BatchDetail2}','${BatchExample2}','${BatchNo}','${TypeBatch}',
        '${Remark}','${ColabgroupId}','${UserIDConfirm}','${ConfirmDateTime}',
        '${JournalCode}')`

        conn.query(data, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add SDSS_Head" });
            }

            if (res.status(200)) {
                console.log(res.results)
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {

                    DetailDocumentList(results.insertId)
                }
                else {
                    // res.json({ status: 400, error: true, message: 'update SDSS_Head fialed' })
                }
            }
        });

        function DetailDocumentList(id) {
            var dataall = `SELECT JournalID, SlotNo,ItemID,ItemName,ItemGroupID,GroupRemark,PkDescription,SpecID,Width,Depth,
            Height,NetWeight,TareWeight,GrossWeight,SizeDetails,TypeSheet,Barcode,
            Batch1,BatchDetail1,BatchExample1,Batch2,BatchDetail2,BatchExample2,BatchNo,TypeBatch,
            Remark,ColabgroupId,UserIDConfirm,ConfirmDateTime,
             JournalCode FROM SDSS_Details WHERE JournalID='${id}'`;

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
    }


    updateDetailById(req, res) {

        const {
            SlotNo, ItemID, ItemName, ItemGroupID, GroupRemark, PkDescription, SpecID, Width, Depth, Height, NetWeight,
            TareWeight, GrossWeight, SizeDetails, TypeSheet, Barcode,
            Batch1, BatchDetail1, BatchExample1, Batch2, BatchDetail2, BatchExample2, BatchNo, TypeBatch,
            Remark, ColabgroupId, UserIDConfirm, ConfirmDateTime, JournalCode
        } = req.body

        const { id } = req.params

        var updatedata = `
            UPDATE SDSS_Details SET SlotNo='${SlotNo}',ItemID='${ItemID}',ItemName='${ItemName}',ItemGroupID='${ItemGroupID}',
            GroupRemark='${GroupRemark}',PkDescription='${PkDescription}',SpecID='${SpecID}',
            Width='${Width}',Depth='${Depth}',Height='${Height}',
            NetWeight='${NetWeight}',TareWeight='${TareWeight}',GrossWeight='${GrossWeight}',SizeDetails='${SizeDetails}',
            TypeSheet='${TypeSheet}',Barcode='${Barcode}',Batch1='${Batch1}',BatchDetail1='${BatchDetail1}',BatchExample1='${BatchExample1}',
            Batch2='${Batch2}',BatchDetail2='${BatchDetail2}',BatchExample2='${BatchExample2}',BatchNo='${BatchNo}',TypeBatch='${TypeBatch}',
            Remark='${Remark}',ColabgroupId='${ColabgroupId}',UserIDConfirm='${UserIDConfirm}',ConfirmDateTime='${ConfirmDateTime}',
            JournalCode='${JournalCode}' WHERE JournalID=${id}`;

        conn.query(updatedata, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add SDSS_Detail" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({
                        status: 200,
                        error: false,
                        message: 'update SDSS_Details successfully',
                        insertId: results.insertId
                    })

                }
                else {
                    res.json({ status: 400, error: true, message: 'update SDSS_Details fialed' })
                }
            }

        });

    }

    UpdateDetailByItem(req, res) {
        const { id } = req.params
        const { PkDescription, ItemID, ItemName, ItemGroupID } = req.body
        var updatedata = `UPDATE SDSS_Details SET  PkDescription='${PkDescription}',ItemID='${ItemID}',ItemName='${ItemName}',ItemGroupID='${ItemGroupID}' 
        WHERE  JournalID=${id}`

        conn.query(updatedata, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add SDSS_Detail" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({
                        status: 200,
                        error: false,
                        message: 'update SDSS_Details successfully',
                        insertId: results.insertId
                    })

                }
                else {
                    res.json({ status: 400, error: true, message: 'update SDSS_Head fialed' })
                }
            }

        });
    }


    UpdateDetailBatch(req, res) {
        const { id } = req.params;
        const { Batch1, BatchDetail1, BatchExample1, Batch2, BatchDetail2, BatchExample2, BatchNo, TypeBatch } = req.body

        var updatedata = `UPDATE SDSS_Details SET Batch1='${Batch1}',BatchDetail1='${BatchDetail1}',BatchExample1='${BatchExample1}',
            Batch2='${Batch2}',BatchDetail2='${BatchDetail2}',BatchExample2='${BatchExample2}',BatchNo='${BatchNo}',TypeBatch='${TypeBatch}' WHERE JournalID=${id}`;

        conn.query(updatedata, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add SDSS_Details" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({
                        status: 200,
                        error: false,
                        message: 'update SDSS_Details successfully',
                        insertId: results.insertId
                    })

                }
                else {
                    res.json({ status: 400, error: true, message: 'update SDSS_Head fialed' })
                }
            }

        });

    }

    updateSpecall(req, res) {

        const { id } = req.params;
        const {
            ItemID,
            SpecID,
            ItemName,
            PkDescription,
            Width,
            Depth,
            Height,
            NetWeight,
            TareWeight,
            GrossWeight,
            ItemGroupID,
            ColabgroupId,
            SizeDetails,
            UserIDConfirm,
            ConfirmDateTime
        } = req.body;

        var updatedata = `UPDATE 
                        SDSS_Details 
                    SET 
                        ItemID='${ItemID}',
                        ItemName='${ItemName}',
                        ItemGroupID='${ItemGroupID}',
                        PkDescription='${PkDescription}',
                        SpecID='${SpecID}',
                        Width='${Width}',
                        Depth='${Depth}',
                        Height='${Height}',
                        NetWeight='${NetWeight}',
                        TareWeight='${TareWeight}',
                        GrossWeight='${GrossWeight}',
                        SizeDetails='${SizeDetails}',
                        ColabgroupId='${ColabgroupId}',
                        UserIDConfirm='${UserIDConfirm}',
                        ConfirmDateTime='${ConfirmDateTime}'
                    WHERE SDSS_Details.JournalID=${id}`;

        conn.query(updatedata, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add SDSS_Detail" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({
                        status: 200,
                        error: false,
                        message: 'update SDSS_Detail successfully',
                        insertId: results.insertId
                    })

                }
                else {
                    res.json({ status: 400, error: true, message: 'update SDSS_Detail fialed' })
                }
            }

        });

    }

    DocumentDetailByCodeJour(req, res) {
        const { id } = req.params
        var dataall = `SELECT 
		JournalID, SlotNo,ItemID,ItemName,ItemGroupID,GroupRemark,PkDescription,SpecID,Width,Depth,
        Height,NetWeight,TareWeight,GrossWeight,SizeDetails,TypeSheet,Barcode,
        Batch1,BatchDetail1,BatchExample1,Batch2,BatchDetail2,BatchExample2,BatchNo,TypeBatch,
        Remark,ColabgroupId,
            (SELECT userall.name FROM userall WHERE userall.userId=SDSS_Details.UserIdConfirm )as NameUserConfirm,
            (SELECT userall.lastname FROM userall WHERE userall.userId=SDSS_Details.UserIdConfirm )as lastnameUserConfirm,
            UserIDConfirm,ConfirmDateTime,
            JournalCode 
        FROM 
            SDSS_Details WHERE JournalCode='${id}' order by SlotNo ASC`;

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

    DocumentDetailListByCode(req, res) {
        const { id } = req.params;

        var datalist = `SELECT 
	JournalID, SlotNo, ItemID, ItemName, ItemGroupID, GroupRemark, PkDescription, SpecID,
    Width,Depth,Height,NetWeight,TareWeight,GrossWeight,SizeDetails,TypeSheet,Barcode,
    Batch1,BatchDetail1,BatchExample1,Batch2,BatchDetail2,BatchExample2,BatchNo, 
    TypeBatch,Remark,ColabgroupId,UserIDConfirm,ConfirmDateTime,JournalCode 
FROM SDSS_Details
WHERE JournalCode='${id}'`;

        conn.query(datalist, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get SDSS_Details " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });

    }

    DocumentDetailById(req, res) {
        const { id } = req.params
        var dataall = `SELECT 
		JournalID, SlotNo,ItemID,ItemName,ItemGroupID,GroupRemark,PkDescription,SpecID,Width,Depth,
        Height,NetWeight,TareWeight,GrossWeight,SizeDetails,TypeSheet,Barcode,
        Batch1,BatchDetail1,BatchExample1,Batch2,BatchDetail2,BatchExample2,BatchNo,TypeBatch,
        Remark,ColabgroupId,
            (SELECT userall.name FROM userall WHERE userall.userId=SDSS_Details.UserIdConfirm )as NameUserConfirm,
            (SELECT userall.lastname FROM userall WHERE userall.userId=SDSS_Details.UserIdConfirm )as lastnameUserConfirm,
            UserIDConfirm,ConfirmDateTime,
            JournalCode 
        FROM 
            SDSS_Details WHERE JournalID='${id}'`;

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


    SearchJourByfieldBatch(req, res) {
        const {
            BatchNo,
            TypeBatch
        } = req.body;
        var dataall = `SELECT  
	sdh.JournalID as JournalHeadID,
    sdh.JournalCode,
    sdh.CustID,
    sdh.CustName,
    sdd.JournalID,
    sdd.SlotNo,
    sdd.PkDescription,
    sdd.ItemID,
    sdd.ItemName,
    sdd.ColabgroupId,
    sdd.BatchNo,
    sdd.ItemGroupID,
    sdd.Batch1,
    sdd.BatchDetail1,
    sdd.BatchExample1,
    sdd.Batch2,
    sdd.BatchDetail2,
    sdd.BatchExample2,
    sdd.BatchNo,
    sdd.TypeBatch,
    sdh.Actives
FROM espec_db.SDSS_Details sdd inner join espec_db.SDSS_Head sdh on sdh.JournalCode=sdd.JournalCode
where 
	sdh.Actives = '1'
    and sdh.statusflow='105'
	and sdd.BatchNo='${BatchNo}'
	and sdd.TypeBatch='${TypeBatch}'
    GROUP BY sdd.JournalCode,
	sdd.JournalID,
    JournalHeadID,
    sdd.SlotNo,
    sdd.PkDescription,
    sdd.ItemID,
    sdd.ItemName,
    sdd.ColabgroupId,
    sdd.BatchNo,
    sdd.ItemGroupID,
    sdd.Batch1,
    sdd.BatchDetail1,
    sdd.BatchExample1,
    sdd.Batch2,
    sdd.BatchDetail2,
    sdd.BatchExample2,
    sdd.BatchNo,
    sdd.TypeBatch,
    sdd.GroupRemark, 
    sdd.ConfirmDateTime,
	sdh.JournalCode,
    sdh.CustID,
    sdh.CustName,
    sdh.Actives
    order by sdd.JournalCode`;

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



    SearchJourByfieldItemId(req, res) {
        const {
            ItemID,
        } = req.body;
        var dataall = `SELECT  
	sdh.JournalID as JournalHeadID,
    sdh.JournalCode,
    sdh.CustID,
    sdh.CustName,
    sdd.JournalID,
    sdd.SlotNo,
    sdd.PkDescription,
    sdd.ItemID,
    sdd.ItemName,
    sdd.ColabgroupId,
    sdd.BatchNo,
    sdd.ItemGroupID,
    sdd.Batch1,
    sdd.BatchDetail1,
    sdd.BatchExample1,
    sdd.Batch2,
    sdd.BatchDetail2,
    sdd.BatchExample2,
    sdd.BatchNo,
    sdd.TypeBatch,
    sdh.Actives
FROM espec_db.SDSS_Details sdd inner join espec_db.SDSS_Head sdh on sdh.JournalCode=sdd.JournalCode
where 
	sdh.Actives = '1'
    and sdh.statusflow='105'
	and sdd.ItemID='${ItemID}'
    GROUP BY sdd.JournalCode,
	sdd.JournalID,
    JournalHeadID,
    sdd.SlotNo,
    sdd.PkDescription,
    sdd.ItemID,
    sdd.ItemName,
    sdd.ColabgroupId,
    sdd.BatchNo,
    sdd.ItemGroupID,
    sdd.Batch1,
    sdd.BatchDetail1,
    sdd.BatchExample1,
    sdd.Batch2,
    sdd.BatchDetail2,
    sdd.BatchExample2,
    sdd.BatchNo,
    sdd.TypeBatch,
    sdd.GroupRemark, 
    sdd.ConfirmDateTime,
	sdh.JournalCode,
    sdh.CustID,
    sdh.CustName,
    sdh.Actives
    order by sdd.JournalCode`;

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


    DetailDeleteById(req, res) {

        const { id } = req.params

        var data = `DELETE FROM SDSS_Details WHERE JournalID=${id}`;

        conn.query(data, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add transitionnote" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'delete transitionnote successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'delete transitionnote fialed' })
                }
            }

        });
    }
    /// create  SDSS_Specification

    Create_SDSS_Specification(req, res) {
        const {
            JournalID, SlotNo, ItemID, ItemName, SlotNoSpec, SubjectDetails,
            SubjectExtend, LocationPic, UserIdConfirm, ConfirmDateTime, StatusFacConfirm, JournalCode, JourId
        } = req.body

        var dataall = `INSERT INTO SDSS_Specification(SlotNo, ItemID, ItemName,SlotNoSpec,SubjectDetails,
        SubjectExtend,LocationPic, UserIdConfirm, ConfirmDateTime,StatusFacConfirm,JournalCode,JourId) 
        VALUES ('${SlotNo}','${ItemID}','${ItemName}','${SlotNoSpec}','${SubjectDetails}','${SubjectExtend}','${LocationPic}',
        '${UserIdConfirm}','${ConfirmDateTime}','${StatusFacConfirm}','${JournalCode}',${JourId})`;

        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add SDSS_Specification" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'Create SDSS_Specification successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'Create SDSS_Specification fialed' })
                }
            }
        });
    }

    Update_Specification(req, res) {
        const { id } = req.params
        const {
            JournalID, SlotNo, ItemID, ItemName, SlotNoSpec, SubjectDetails,
            SubjectExtend, LocationPic, UserIdConfirm, ConfirmDateTime, StatusFacConfirm, JournalCode, JourId
        } = req.body

        console.log(req.body);

        var dataall = `UPDATE SDSS_Specification
                    SET 
                    SlotNo='${SlotNo}',ItemID='${ItemID}',ItemName='${ItemName}',SlotNoSpec='${SlotNoSpec}',SubjectDetails='${SubjectDetails}',
                    SubjectExtend='${SubjectExtend}',LocationPic='${LocationPic}',UserIdConfirm='${UserIdConfirm}',ConfirmDateTime='${ConfirmDateTime}',
                    StatusFacConfirm='${StatusFacConfirm}',JournalCode='${JournalCode}',JourId='${JourId}' 
                    WHERE JournalID=${id}`


        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add SDSS_Specification" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update SDSS_Specification successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update SDSS_Specification fialed' })
                }
            }
        });
    }

    getSSpecificationBycode(req, res) {
        const { id } = req.params
        var datat = `SELECT 
	spf.JournalID, 
    spf.SlotNo, 
    spf.ItemID, 
    spf.ItemName,
    spf.SlotNoSpec,
    spf.SubjectDetails,
    spf.SubjectExtend, 
    spf.LocationPic, 
    spf.UserIdConfirm,
    (SELECT userall.name FROM userall WHERE userall.userId=spf.UserIdConfirm )as NameUserConfirm,
    (SELECT userall.lastname FROM userall WHERE userall.userId=spf.UserIdConfirm )as lastnameUserConfirm,
    spf.ConfirmDateTime, 
    spf.StatusFacConfirm, 
    spf.JournalCode, 
    spf.JourId,
     (SELECT SDSS_Details.PkDescription 
     from SDSS_Details WHERE SDSS_Details.JournalID=spf.JourId ) as PkDescription,
    (SELECT SDSS_Details.ItemID FROM SDSS_Details WHERE SDSS_Details.JournalID=spf.JourId)AS ItemID,
    (SELECT SDSS_Details.ItemName FROM SDSS_Details WHERE SDSS_Details.JournalID=spf.JourId)AS ItemName 
FROM 
	SDSS_Specification  spf 
	WHERE spf.JournalCode='${id}' order by spf.SlotNo ASC`;

        conn.query(datat, async function (err, results, fields) {
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

    getSSpecificationById(req, res) {
        const { id } = req.params
        var datat = `SELECT 
JournalID,SlotNo,ItemID,ItemName,SlotNoSpec,SubjectDetails,SubjectExtend,LocationPic,
UserIdConfirm,
(SELECT userall.name FROM userall WHERE userall.userId=UserIdConfirm)as NameConfirm,
(SELECT userall.lastname FROM userall WHERE userall.userId=UserIdConfirm)as LastNameConfirm,
ConfirmDateTime, StatusFacConfirm, JournalCode, JourId 
FROM SDSS_Specification WHERE SDSS_Specification.JournalID=${id}`;

        conn.query(datat, async function (err, results, fields) {
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

    getSSpecificationBydetailId(req, res) {
        const { id } = req.params
        var datat = `SELECT 
JournalID,SlotNo,ItemID,ItemName,SlotNoSpec,SubjectDetails,SubjectExtend,LocationPic,
UserIdConfirm,
(SELECT userall.name FROM userall WHERE userall.userId=UserIdConfirm)as NameConfirm,
(SELECT userall.lastname FROM userall WHERE userall.userId=UserIdConfirm)as LastNameConfirm,
ConfirmDateTime, StatusFacConfirm, JournalCode, JourId 
FROM SDSS_Specification WHERE SDSS_Specification.JourId=${id}`;

        conn.query(datat, async function (err, results, fields) {
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

    DeleteSpecificationByid(req, res) {
        const { id } = req.params;
        var dataall = `DELETE FROM SDSS_Specification WHERE SDSS_Specification.JournalID=${id}`;

        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add SDSS_Specification" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'delete SDSS_Specification successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'delete SDSS_Specification fialed' })
                }
            }
        });
    }


}
module.exports = new DocumentController();