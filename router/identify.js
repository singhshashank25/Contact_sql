const router = require('express').Router();
const db = require('../config/mysqldb')


router.post("/",async(req,res)=>{
    const { email, phoneNumber } = req.body;

    if (!email && !phoneNumber) {
      return res.status(400).send('Phone number or email is required');
    }
    try {
        const data = await db.execute('INSERT INTO contacts(email,phoneNumber) values (?,?)',[email,phoneNumber]);
        if(!data)return res.send("there is erro in insertion");

        let phoneNumbersAll = [],primarycontact = data[0].insertId,secondaryNumber = [],emailsAll = [];
       
      let existingContacts = [];
      let emlist = [],phonelist = [];
      if (email) {
        [emlist] = await db.execute('SELECT * FROM contacts WHERE email = ?', [email]);
      } if (phoneNumber) {
        [phonelist] = await db.execute('SELECT * FROM contacts WHERE phoneNumber = ?', [phoneNumber]);
      }
      existingContacts = [...emlist,...phonelist];
      existingContacts.forEach((ele)=>{
        console.log(ele);
        primarycontact = Math.min(ele.id,primarycontact);
        phoneNumbersAll.push(ele.phoneNumber);
        emailsAll.push(ele.email);
        secondaryNumber.push(ele.id);
      });
      secondaryNumber = secondaryNumber.filter(element => element !== primarycontact);

      secondaryNumber.forEach(async id =>{
            const [rows] = await db.execute('SELECT linkedId, linkPrecedence FROM contacts WHERE id = ?', [id]);
            const contact = rows[0];
            if (contact.linkedId !== primarycontact || contact.linkPrecedence !== 'secondary') {
                await db.execute(
            'UPDATE contacts SET linkPrecedence = ?, linkedId = ?, updatedAt = NOW() WHERE id = ?',
            ['secondary', primarycontact, id]
            );
        }
      });

      return res.json({
        contact: {
          primaryContactId: primarycontact,
          emails: [...new Set(emailsAll)],
          phoneNumbers: [...new Set(phoneNumbersAll)],
          secondaryContactIds: secondaryNumber
        }
      });
    }
    catch(err){
        return res.send({
            message:"yyha ka eror",
            err:err
        });
    }
})

module.exports = router;