const nodemailer = require("nodemailer");
const { data_mailer } = require("../../settings/default");

let transporter = nodemailer.createTransport(data_mailer);
class mailer
{
    constructor(from,to,subject,text,html,req,res){
        this.from=from;
        this.to=to;
        this.subject=subject;
        this.text=text;
        this.html=html;
        this.req=req;
        this.res=res;
        
    }
    async active_return(){
       let info = await transporter.sendMail({
            from: this.from, // sender address '"Service Skycloud" <cloud@skyvisionafrica.com>'
            to: this.to, // list of receivers
          
            subject: this.subject, // Subject line
            text: this.text, // plain text body
            html: this.html // html body
          });
          console.log(info)
          if(info.messageId){
            return {status:"1"}
          }else{
            return {status:"0"}
          }
    }
    async active_res(){
       let info = await transporter.sendMail({
            from: this.from, // sender address '"Service Skycloud" <cloud@skyvisionafrica.com>'
            to: this.to, // list of receivers
          
            subject: this.subject, // Subject line
            text: this.text, // plain text body
            html: this.html // html body
          });

          if(info.messageId){
            this.res.json({status:"1"})
          }else{
            this.res.json({status:"0"})
          }
    }
}

module.exports={
    mailer:mailer
}