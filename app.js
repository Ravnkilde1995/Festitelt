import express from "express";
import path from "path";
import nodemailer from "nodemailer";


const app = express();

app.use(express.json());

app.use(express.static(path.resolve("./Client/public")));

app.get("/", (req, res) => {
    res.sendFile(path.resolve("/Client/public/index.html"));
});

app.get("/tent", (req, res) => {
    res.sendFile(path.resolve("./Client/public/tent.html"));
});

app.get("/accessories", (req, res) => {
    res.sendFile(path.resolve("./Client/public/accessories.html"));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.resolve("./Client/public/contact.html"));
});

//Register user function
app.post("/sendmail", async (req, res) => {
    const { name, phone, email, subject, message } = req.body

    sendMail(name, phone, email, subject, message);

});


// Send mail using nodemailer function
function sendMail(name, phone, email, subject, message) {
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'festiteltservice@gmail.com',
            pass: 'aosgjqpawuayhxpg'
        }
    });

    
    let mailDetails = {
        from: 'festiteltservice@gmail.com',
        // SKIFT TIL jankarlsson@mail.tele.dk NÅR DET ER KLART
        to: 'jankarlsson@mail.tele.dk',
        subject: 'Spørgsmål fra ' + name,
        html: '<p> <b> Navn: </b>'+ name + ' <br><br> <b> Afsender: </b>' + email +'<br><br> <b> Telefon nr: </b>' + phone + '<br><br> <b> Emne: </b>' + subject + '<br><br> <b> Spørgsmål: </b> <br><br> ' + message + '</p>'
        
    };

    mailTransporter.sendMail(mailDetails, function (err) {
        if (err) throw err;
    });
}

const PORT = process.env.PORT;
app.listen((process.env.PORT||"9000"), () => {
     console.log("App running on port", PORT)
});