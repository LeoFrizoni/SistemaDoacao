using Microsoft.AspNetCore.Mvc;

namespace SistemaDoacao.API.Controllers
{
    public class AdministradorController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
