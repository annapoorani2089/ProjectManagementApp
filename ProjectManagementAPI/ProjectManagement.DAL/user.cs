//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ProjectManagement.DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class user
    {
        public int user_id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public int employee_id { get; set; }
        public Nullable<int> project_id { get; set; }
        public Nullable<int> task_id { get; set; }
        public Nullable<bool> deleted { get; set; }
    
        public virtual Project Project { get; set; }
        public virtual Task Task { get; set; }
    }
}
