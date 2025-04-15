const { Resend } = require("resend");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;
const resend = new Resend("re_XFCohrX2_22FajmGAwF4xBfcUfVtAUP9G");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.post("/contactform", async (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log(name, email, subject, message);
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: "atoleon@gmail.com",
    subject: "Contacto RDC",
    html: `<p>${name}</p><p>${email}</p><p>${subject}</p><p>${message}</p>`,
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
});

app.listen(port);
console.log("listening on port: ", port);
