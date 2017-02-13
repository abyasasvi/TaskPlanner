using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TaskPlanner.Startup))]
namespace TaskPlanner
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
