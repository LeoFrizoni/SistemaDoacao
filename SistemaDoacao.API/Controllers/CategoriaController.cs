using Microsoft.AspNetCore.Mvc;
using SistemaDoacao.MODEL.DTO;
using SistemaDoacao.MODEL.Models;
using SistemaDoacao.MODEL.Services;


namespace SistemaDoacao.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private Sistema_DoacoesContext _context;
        private ServiceCategoria _Service;

        public CategoriaController(Sistema_DoacoesContext context)
        {
            _context = context;
            _Service = new ServiceCategoria(_context);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _Service.oRepositoryCategoria.SelecionarTodosAsync());
        }

        [HttpGet("GetCategoriaById/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _Service.oRepositoryCategoria.SelecionarChaveAsync(id));
        }

        [HttpPost("PostCategoria")]
        public async Task<IActionResult> Post(CategoriaDTO categoria)
        {
            await _Service.IncluirCategoriaDTO(categoria);
            return Ok("Categoria registrada");
        }

        [HttpPut("PutCategoria")]
        public async Task<IActionResult> Put(CategoriaDTO categoria)
        {
            await _Service.AlterarCategoriaDTO(categoria);
            return Ok("Categoria alterada");
        }

        [HttpDelete("DeleteCategoria/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _Service.ExcluirCategoriaDTO(id);
                return Ok("Categoria excluida");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
