using Microsoft.AspNetCore.Mvc;
using SistemaDoacao.MODEL.DTO;
using SistemaDoacao.MODEL.Models;
using SistemaDoacao.MODEL.Services;
using SistemaDoacao.MODEL.ViewModel;

namespace SistemaDoacao.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocalidadeController : ControllerBase
    {
        private Sistema_DoacoesContext _context;
        private ServiceLocalidade _Service;

        public LocalidadeController(Sistema_DoacoesContext context)
        {
            _context = context;
            _Service = new ServiceLocalidade(context);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _Service.oRepositoryLocalidade.SelecionarTodosAsync());
        }

        [HttpGet("GetLocalidadeById/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _Service.oRepositoryLocalidade.SelecionarChaveAsync(id));
        }

        [HttpGet("GetLocalidadeByCEP/{cep}")]
        public async Task<IActionResult> Get(string cep)
        {
            var resultado = await _Service.oRepositoryLocalidade.SelecionarPeloCEP(cep);
            return Ok(resultado);
        }

        [HttpPost("PostLocalidade")]
        public async Task<IActionResult> Post(LocalidadeDTO localidade)
        {
            await _Service.IncluirLocalidadeDTO(localidade);
            return Ok("Localidade registrada");
        }

        [HttpPut("PutLocalidade")]
        public async Task<IActionResult> Put(LocalidadeDTO localidade)
        {
            await _Service.AlterarLocalidadeDTO(localidade);
            return Ok("Localidade alterada");
        }

        [HttpDelete("DeleteLocalidade/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _Service.ExcluirLocalidadeDTO(id);
                return Ok("Categoria excluida");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //[HttpDelete("DeleteLocalidade/{id}")]
        //public async Task<IActionResult> Delete(int id)
        //{
        //    try
        //    {
        //        // Cria uma nova instancia de LocalidadeVM com o ID passado
        //        var localidadeVM = new LocalidadeVM { CodigoLocalidade = id };

        //        // Chama o serviço de exclusão, passando a ViewModel com o ID
        //        await _Service.ExcluirLocalidadeAsyncVM(localidadeVM);

        //        return Ok("Localidade excluída com sucesso.");
        //    }
        //    catch (Exception ex)
        //    {
        //        // Retorna uma mensagem de erro caso algo corra mal
        //        return BadRequest(ex.Message);
        //    }
        //}


    }
}
