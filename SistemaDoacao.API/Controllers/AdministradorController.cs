using Microsoft.AspNetCore.Mvc;
using SistemaDoacao.MODEL.DTO;
using SistemaDoacao.MODEL.Models;
using SistemaDoacao.MODEL.Services;
using System.Runtime.ConstrainedExecution;

namespace SistemaDoacao.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdministradorController : ControllerBase
    {
        private Sistema_DoacoesContext _context;
        private ServiceAdministrador _Service;

        public AdministradorController(Sistema_DoacoesContext context)
        {
            _context = context;
            _Service = new ServiceAdministrador(context);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _Service.oRepositoryAdministrador.SelecionarTodosAsync());
        }

        [HttpGet("GetADMById/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _Service.oRepositoryAdministrador.SelecionarChaveAsync(id));
        }

        [HttpGet("GetADMByUser/{user}")]
        public async Task<IActionResult> Get(string user)
        {
            var resultado = await _Service.oRepositoryAdministrador.SelecionarPeloUser(user);
            return Ok(resultado);
        }

        [HttpPost("PostADM")]
        public async Task<IActionResult> Post(AdministradorDTO adm)
        {
            await _Service.IncluirAdmDTO(adm);
            return Ok("ADM registrado");
        }

        [HttpPut("PutADM")]
        public async Task<IActionResult> Put(AdministradorDTO adm)
        {
            await _Service.AlterarAdmDTO(adm);
            return Ok("ADM Alterado");
        }

        [HttpDelete("DeleteADM/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _Service.ExcluirAdmDTO(id);
                return Ok("ADM Excluido");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
