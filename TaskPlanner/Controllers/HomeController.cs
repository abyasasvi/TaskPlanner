using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TaskPlanner.Models;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.IO;
using System.Reflection;
using System.Collections;

namespace TaskPlanner.Controllers
{
    [RequireHttps]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Contact(EmailFormModel model)
        {
            if (ModelState.IsValid)
            {   var smtpClient = new SmtpClient();
                var msg = new MailMessage();
                msg.To.Add(model.FromEmail);
                msg.Subject = "Thank you for visiting us!";
                msg.Body = "Hey! Thank you for visiting us. We will get back in touch with you regarding your queries.";
                smtpClient.Send(msg);
            }
            return View(model);
        }


        public object getTasks()
        {
            string allText = "";
            object jsonObject;
            try
            {
                DirectoryInfo dir = new DirectoryInfo(Server.MapPath("/Content/tasks.json"));
                string path1 = dir.ToString();
                allText = System.IO.File.ReadAllText(path1);
                jsonObject = JsonConvert.DeserializeObject(allText);
            }
            catch
            {
                WebClient client = new WebClient();
                Stream stream = client.OpenRead("https://raw.githubusercontent.com/abyasasvi/ParentsBanking/master/tasks.json");
                StreamReader reader = new StreamReader(stream);
                String content = reader.ReadToEnd();
                jsonObject = JsonConvert.DeserializeObject(content);
            }


           
            return jsonObject;
        }


        [HttpPost]
        public string setTasks(String jsonString)
        {
            DirectoryInfo dir = new DirectoryInfo(Server.MapPath("/Content/tasks.json"));
            string path1 = dir.ToString();
            string outp = JsonConvert.SerializeObject(jsonString, Formatting.Indented);
            System.IO.File.WriteAllText(path1, outp);
            return "Success!";
        }

        public object getRems()
        {
            string allText = "";
            object jsonObject;
            try
            {
                DirectoryInfo dir = new DirectoryInfo(Server.MapPath("/Content/rems.json"));
                string path1 = dir.ToString();
                allText = System.IO.File.ReadAllText(path1);
                jsonObject = JsonConvert.DeserializeObject(allText);
            }
            catch
            {
                WebClient client = new WebClient();
                Stream stream = client.OpenRead("https://raw.githubusercontent.com/abyasasvi/ParentsBanking/master/rems.json");
                StreamReader reader = new StreamReader(stream);
                String content = reader.ReadToEnd();
                jsonObject = JsonConvert.DeserializeObject(content);
            }



            return jsonObject;
        }

        public object saveRems(object jsonObject)
        {
            DirectoryInfo dir = new DirectoryInfo(Server.MapPath("/Content/rems.json"));
            string path1 = dir.ToString();
            string outp = JsonConvert.SerializeObject(jsonObject, Formatting.Indented);
            System.IO.File.WriteAllText(path1, outp);
            return jsonObject;
        }
    }
}