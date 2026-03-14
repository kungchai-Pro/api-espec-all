const conn = require("../config/db");

const DeleteChangeflow = (jourId, jourcode, userchang) => {
    deleteTransition(jourId)

    deleteDetail(jourcode, userchang)

    deleteSpecification(jourcode, userchang)

    deleteImages(jourcode, userchang)
}
function deleteTransition(JourId) {
    var datadelete = `DELETE FROM transitionflow WHERE transitionflow.JournalId=${JourId}`;

    conn.query(datadelete, function (err, results, fields) {
        if (err) {
            console.log(err);
            return res.status(400).json({ status: 400, error: true, message: "Error: Could not add SDSS_Head" });
        }

        if (results) {
            // กรณีที่ สร้าง menu list  
            if (results.affectedRows == 1) {
                console.log(results);
            }
            else {
                console.log(results)
            }
        }
    });
}

function deleteDetail(Jourcode, UserChage) {
    var datadelete = `DELETE FROM SDSS_Details WHERE JournalCode='${Jourcode}' AND UserIDConfirm !=${UserChage}`;

    conn.query(datadelete, function (err, results, fields) {
        if (err) {
            console.log(err);
            return res.status(400).json({ status: 400, error: true, message: "Error: Could not add SDSS_Head" });
        }

        if (results) {
            // กรณีที่ สร้าง menu list  
            if (results.affectedRows == 1) {
                console.log(results);
            }
            else {
                console.log(results)
            }
        }
    });
}

function deleteSpecification(jourcode, UserChage) {
    var datadelete = `DELETE FROM SDSS_Specification WHERE JournalCode='${jourcode}'AND UserIdConfirm !=${UserChage}`;

    conn.query(datadelete, function (err, results, fields) {
        if (err) {
            console.log(err);
            return res.status(400).json({ status: 400, error: true, message: "Error: Could not add SDSS_Head" });
        }

        if (results) {
            // กรณีที่ สร้าง menu list  
            if (results) {
                console.log(results);
            }
            else {
                console.log(results)
            }
        }
    });
}

function deleteImages(Jourcode, UserChage) {
    var datadelete = `DELETE FROM journalImages WHERE JournalCode='${Jourcode}' AND UserIdConfirm !=${UserChage}`;

    conn.query(datadelete, function (err, results, fields) {
        if (err) {
            console.log(err);
            return res.status(400).json({ status: 400, error: true, message: "Error: Could not add SDSS_Head" });
        }

        if (results) {
            // กรณีที่ สร้าง menu list  
            if (results.affectedRows == 1) {
                console.log(results);
            }
            else {
                console.log(results)
            }
        }
    });
}

module.exports = { DeleteChangeflow }