using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaskPlanner.Models
{
    public class Tasks
    {

        public string type_id { get; set; }
        public string id { get; set; }
        public string type_name { get; set; }
        public string title { get; set; }
        public string desp { get; set; }
        public string due_date { get; set; }
        public string est_time { get; set; }
       
    }


}