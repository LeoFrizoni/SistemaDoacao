using Microsoft.AspNetCore.Mvc;
using SistemaDoacao.MODEL.DTO;
using SistemaDoacao.MODEL.Models;
using SistemaDoacao.MODEL.Services;

namespace SistemaDoacao.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnderecoController : ControllerBase
    {
        private Sistema_DoacoesContext _context;
        private ServiceEndereco _Service;

        public EnderecoController(Sistema_DoacoesContext context)
        {
            _context = context;
            _Service = new ServiceEndereco(_context);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _Service.oRepositoryEndereco.SelecionarTodosAsync());
        }

        [HttpGet("GetCategoriaById/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _Service.oRepositoryEndereco.SelecionarChaveAsync(id));
        }

        [HttpPost("PostEndereco")]
        public async Task<IActionResult> Post(EnderecoDTO endereco)
        {
            await _Service.IncluirEnderecoDTO(endereco);
            return Ok("Enderco registrado");
        }

        [HttpPut("PutEndereco")]
        public async Task<IActionResult> Put(EnderecoDTO endereco)
        {
            await _Service.AlterarEndercoDTO(endereco);
            return Ok("Endereco Alterado");
        }

        [HttpDelete("DeleteEndereco/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _Service.ExcluirEnderecoDTO(id);
                return Ok("Endereco Excluido");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
