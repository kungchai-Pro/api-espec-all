const conn = require("../config/db");
var nodemailer = require('nodemailer');

const TosendEmail = (JournalId, userId, rejectTo, stateflow, TypeEvent, datetimes) => {

    var newStep = parseInt(stateflow) + 1;
    var message = ``;
    var dataall = ``;
    const transporter = nodemailer.createTransport({
        host: 'mail.pppi.co.th',
        secure: true,
        auth: {
            user: 'admin-packing@pppi.co.th', // your email
            pass: '167409Rj1'      // your password
        },
        tls: {
            // 👇 อนุญาต self-signed certificate
            rejectUnauthorized: false,
        },
    });

    if (TypeEvent == 'reject') {
        dataall = `SELECT 
    fs.runflowId,
    fs.documentId,
    fs.approveById,
    (SELECT SDSS_Head.JournalCode FROM SDSS_Head WHERE SDSS_Head.JournalID=fs.documentId) as journalcode,
    (SELECT userall.name FROM userall WHERE userall.userId=fs.approveById) as tonamapproved,
     (SELECT userall.name FROM userall WHERE userall.userId=${rejectTo}) as sendapproved,
     (SELECT userall.email FROM userall WHERE userall.userId=${rejectTo}) as toemail,
     (SELECT tn.notedetail FROM espec_db.transitionnote tn where tn.documentId=fs.documentId order by noteId desc limit 1)as notereject,
    (CASE 
         WHEN fs.statusType='100' THEN 'Create'
         WHEN fs.statusType='101' THEN 'Draft'
         WHEN fs.statusType='102' THEN 'Receive'
         WHEN fs.statusType='103' THEN 'Preview'
         WHEN fs.statusType='104' THEN 'Approved'
         WHEN fs.statusType='105' THEN 'Successful'
         WHEN fs.statusType='211' THEN 'EditReject'
         END
        )as statusName,
    (SELECT departments.departmentname FROM departments 
     WHERE departments.departmentcode=fs.departmentType)as departmentname,
    fs.stateflow 
FROM 
    flowrunsystem fs
    WHERE  fs.documentId=${JournalId} AND fs.stateflow='${newStep}';`

    } else if (TypeEvent == 'approved') {

        dataall = `SELECT 
    fs.runflowId,
    fs.documentId,
    fs.approveById,
    (SELECT SDSS_Head.JournalCode FROM SDSS_Head WHERE SDSS_Head.JournalID=fs.documentId) as journalcode,
    (SELECT userall.name FROM userall WHERE userall.userId=fs.approveById) as tonamapproved,
     (SELECT userall.name FROM userall WHERE userall.userId=${userId}) as sendapproved,
     (SELECT userall.email FROM userall WHERE userall.userId=fs.approveById) as toemail,
     (SELECT tn.notedetail FROM espec_db.transitionnote tn where tn.documentId=fs.documentId order by noteId desc limit 1)as notereject,
    (CASE 
         WHEN fs.statusType='100' THEN 'Create'
         WHEN fs.statusType='101' THEN 'Draft'
         WHEN fs.statusType='102' THEN 'Receive'
         WHEN fs.statusType='103' THEN 'Preview'
         WHEN fs.statusType='104' THEN 'Approved'
         WHEN fs.statusType='105' THEN 'Successful'
         WHEN fs.statusType='211' THEN 'EditReject'
         END
        )as statusName,
    (SELECT departments.departmentname FROM departments 
     WHERE departments.departmentcode=fs.departmentType)as departmentname,
    fs.stateflow 
FROM 
    flowrunsystem fs
    WHERE  fs.documentId=${JournalId} AND fs.stateflow='${newStep}';`
    }

    conn.query(dataall, async function (err, results, fields) {

        if (err) {
            console.log(err);
            return res.status(400).json({ message: "Error: Could not get flowrunsystem " });

        }
        if (results.length > 0) {
            
            tosendemaillist(results[0].journalcode, results[0].tonamapproved, results[0].sendapproved,
                results[0].toemail,results[0].notereject, results[0].statusName, results[0].departmentname, stateflow, JournalId, results[0].approveById)
            // [
            //   {
            //     runflowId: 2291,
            //     documentId: 439,
            //     journalcode: 'DCS-2025-251-1',
            //     tonamapproved: 'อภิญญา',
            //     sendapproved: 'ลินดา',
            //     toemail: '-',
            //     statusName: 'Darft',
            //     departmentname: 'production',
            //     stateflow: '3'
            //   }
            // ]
        }
        else {

            console.log(results)
        }

    });


    function tosendemaillist(journalcode, tonamapproved, sendapproved, toemail,notereject, statusName, departmentname, stateflow, JournalId, approveById) {

        if (TypeEvent == 'approved') {
            message = `
    <div>
    <h3>สวัสดีครับ คุณ ${tonamapproved}</h3></br>
    <p></p>
      แจ้งเตือน ? คุณมีเอกสารเข้ามา รหัส ${journalcode} </br>
      ผู้ส่งเอกสาร คุณ ${sendapproved} แผนก ${departmentname}</br>
      จากผู้อนุมัติที่ ${stateflow}</br>
      เวลา : ${datetimes}</br>
      สามารถเข้าไปตรวจสอบได้ใน link  https://packingspecsheet.com
     <div>
     `
        }
        else if (TypeEvent == 'reject') {
            message = `
    <div>
    <h3>สวัสดีครับ คุณ ${sendapproved}</h3></br>
    <p></p>
        แจ้งเอกสารตีกลับ </br>
      ผู้ส่งเอกสาร คุณ ${tonamapproved} แผนก ${departmentname}</br>
      จากผู้อนุมัติที่ ${stateflow}</br>
      คำอธิบาย : ${notereject} </br>
      เวลา : ${datetimes}</br>
      สามารถเข้าไปตรวจสอบได้ใน link  https://packingspecsheet.com
     <div>
     `}
        else if (TypeEvent == 'editreject') {
            message = `
    <div>
    <h3>สวัสดีครับ คุณ ${userMail}</h3></br>
    <p></p>
      แจ้งเตือน ? คุณ  ${tdsdata.approveby} ยกเลือกเอกสาร </br>
      เอกสาร : ${tdsdata.tdsnumber}</br>
      เวลา : ${datetimes}</br>
      สามารถเข้าไปตรวจสอบได้ใน link https://packingspecsheet.com
      
     <div>
     `
        }

        // https://packingspecsheet.com/loginByuser/${JournalId}/${approveById}

        const mailOptions = {
            from: 'admin-packing@pppi.co.th',              // sender
            to: `${toemail}`, // list of receivers
            subject: `แจ้งเตือนเอกสาร spec product  รหัส ${journalcode}`,
            html: message
        };
        // console.log(toemail)
        //  var emailTo = mailarrey.toString(); จาก array เป็นชุด string ['1','2',] => '1','2'
        // const mailOptions = {
        //     from: `computer@swan.co.th`,              // sender
        //     to: `${toemail}`, // list of receivers
        //     subject: `แจ้งเตือนเอกสาร spec product  รหัส ${journalcode}`,
        //     // cc: `${mailSale}`,           // Mail subject
        //     html: message
        // };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log('error mail')
                console.log(err)
            }
            else {
                res.json({
                    success: true,
                    message: 'send email successfully',
                    accepted: info.accepted,
                    envelope: info.envelope
                })
            }

        });

    }
}


module.exports = { TosendEmail }
