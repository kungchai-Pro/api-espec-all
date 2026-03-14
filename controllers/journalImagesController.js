const conn = require("../config/db");

class JournalImagesController {

    CreateJournalImagesn(req, res) {
        const {
            JournalID, SlotNo, ItemID, ItemName, SlotNoSpec, SubjectDetails,
            SubjectExtend, LocationPic, UserIdConfirm, ConfirmDateTime, StatusFacConfirm, JournalCode, JourId
        } = req.body

        var dataall = `INSERT INTO journalImages(SlotNo, ItemID, ItemName,SlotNoSpec,SubjectDetails,
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

    UpdateJournalImages(req, res) {
        const { id } = req.params
        const {
            JournalID, SlotNo, ItemID, ItemName, SlotNoSpec, SubjectDetails,
            SubjectExtend, LocationPic, UserIdConfirm, ConfirmDateTime, StatusFacConfirm, JournalCode, JourId
        } = req.body

        console.log(req.body);

        var dataall = `UPDATE journalImages
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

    getJournalImagesBycode(req, res) {
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
     from SDSS_Details WHERE SDSS_Details.JournalID=spf.JourId ) as PkDescription 
FROM 
	journalImages  spf 
	WHERE spf.JournalCode='${id}' order by spf.SlotNo asc`;

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

    getJournalImagesById(req, res) {
        const { id } = req.params
        var datat = `SELECT 
JournalID,SlotNo,ItemID,ItemName,SlotNoSpec,SubjectDetails,SubjectExtend,LocationPic,
UserIdConfirm,
(SELECT userall.name FROM userall WHERE userall.userId=UserIdConfirm)as NameConfirm,
(SELECT userall.lastname FROM userall WHERE userall.userId=UserIdConfirm)as LastNameConfirm,
ConfirmDateTime, StatusFacConfirm, JournalCode, JourId 
FROM journalImages WHERE journalImages.JournalID=${id}`;

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

    getJournalImagesBydetailId(req, res) {
        const { id } = req.params
        var datat = `SELECT 
JournalID,SlotNo,ItemID,ItemName,SlotNoSpec,SubjectDetails,SubjectExtend,LocationPic,
UserIdConfirm,
(SELECT userall.name FROM userall WHERE userall.userId=UserIdConfirm)as NameConfirm,
(SELECT userall.lastname FROM userall WHERE userall.userId=UserIdConfirm)as LastNameConfirm,
ConfirmDateTime, StatusFacConfirm, JournalCode, JourId 
FROM journalImages WHERE journalImages.JourId=${id}`;

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

    DeleteJournalImagesByid(req, res) {
        const { id } = req.params;
        var dataall = `DELETE FROM journalImages WHERE journalImages.JournalID=${id}`;

        conn.query(dataall, function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: true, message: "Error: Could not add journalImages" });
            }

            if (res.status(200)) {
                // กรณีที่ สร้าง menu list  
                if (results.affectedRows == 1) {
                    res.json({ status: 200, error: false, message: 'delete journalImages successfully' })
                }
                else {
                    res.json({ status: 400, error: true, message: 'delete journalImages fialed' })
                }
            }
        });
    }
}
module.exports = new JournalImagesController();