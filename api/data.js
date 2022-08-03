var admin = require("firebase-admin");
var serviceAccount = require("../serviceAccountKey.json");
const express = require('express');
const router = express.Router();
var cors = require('cors');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore()


router.get(['/totalRecord'],cors(), async ( req , res ) => {
  console.log('/totalRecord invoked');
  var answersa = 0; var answerb = 0;

  const ref = await db
    .collection('SaferSchool')
    .get();
  try {
    if (ref.docs.length > 0) {
      console.log('******data found*******',ref.docs)
      var arrRes = [];
      // ref.docs.forEach((doc) => {
      //   arrRes.push(doc.data()["content"][1]);
      // });
      ref.docs.forEach((doc) => {
        if(doc.data()["content"][1] == 'yes'){
          answersa += 1;
        }else{
          answerb += 1;
        }
      });

      arrRes.push(ref.docs.length,answersa,answerb)

      res.status(200).send(arrRes);
      console.log("******arrRes*****")
      console.log(arrRes)
      // return arrRes;
    } else {
      res.status(200).send({
        Status: 1,
        Message: 'ref not exists',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(200).send(error);
  }
  
})


// .where('completedby', '==', 'phillip@saferschoolsolutions.com')
router.get(['/userAnswers'],cors(), async ( req , res ) => {
  console.log('/userAnswers invoked');
  var result = [];

    const total =  await db
    .collection('SaferSchool')
    .get();

    const usera = await db
    .collection('SaferSchool')
    .where('completedby', '==',  'vincent@saferschoolsolutions.com')
    .get();

    const userb =  await db
    .collection('SaferSchool')
    .where('completedby', '==',  'phillip@saferschoolsolutions.com')
    .get();
    try {
      if (total.docs.length > 0) {
        console.log('******data found*******',total)
          result.push(total.docs.length)
          // return arrRes;
        } else {
        result.push(0)
        
      }

      if (usera.docs.length > 0) {
        console.log('******data found*******',usera)
          result.push(usera.docs.length)
          // return arrRes;
        } else {
        result.push(0)
        
      }

      if (userb.docs.length > 0) {
        console.log('******data found*******',userb)
          result.push(userb.docs.length)
          // return arrRes;
        } else {
        result.push(0)
        
      }
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(200).send(error);
    }

  
})



module.exports = router;