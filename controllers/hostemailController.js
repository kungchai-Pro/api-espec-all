const conn = require("../config/db");
var nodemailer = require('nodemailer');

class HostEmailController {

    createHostEmail(req, res) {
        const { eId,hostname, euser, epassword } = req.body

        var newdate = `INSERT INTO hostemail(hostname,euser,epassword) 
        VALUES ('${hostname}','${euser}','${epassword}')`;

        conn.query(newdate, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add hostemail" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'create hostemail successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'create hostemail fialed' })
                }
            }

        });

    }

    updateHostEmail(req, res) {

        const { id } = req.params
        const { hostname, euser, epassword } = req.body

        var dataupdate = `UPDATE hostemail SET hostname='${hostname}',euser='${euser}',epassword='${epassword}' WHERE eId=${id}`;

        conn.query(dataupdate, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add hostemail" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'update hostemail successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'update hostemail fialed' })
                }
            }
        });

    }

    HostEmailListAll(req, res) {

        var seleted = `SELECT * FROM hostemail`;
        conn.query(seleted, async function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get hostemail " });

            }
            if (results.length > 0) {
                res.json({ status: 200, error: false, data: results })
            }
            else {
                res.json({ status: 200, error: false, data: results })
            }

        });
    }

    HostEmailToById(req, res) {
        const { id } = req.params
        var dataselect = `SELECT eId,hostname,euser,epassword FROM hostemail WHERE eId=${id}`;

        conn.query(dataselect, async function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Error: Could not get hostemail " });

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
        var data = `DELETE FROM hostemail WHERE eId=${id}`

        conn.query(data, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add hostemail" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'delete hostemail successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'delete hostemail fialed' })
                }
            }

        });

    }

    sendEmail(req, res) {

        const transporter = nodemailer.createTransport({
            host: 'mail.swan.co.th',
            secure: true,
            auth: {
                user: 'computer@swan.co.th', // your email
                pass: 'Kajohn14082510'              // your password
            }
        });


        // setup email data with unicode symbols
        const mailOptions = {
            from: 'computer@swan.co.th',              // sender
            to: ``, // list of receivers
            subject: ``,            // Mail subject
            html: ``
            // HTML body
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
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
module.exports = new HostEmailController();