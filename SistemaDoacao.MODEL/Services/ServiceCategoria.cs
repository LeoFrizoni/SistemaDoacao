using SistemaDoacao.MODEL.DTO;
using SistemaDoacao.MODEL.Models;
using SistemaDoacao.MODEL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaDoacao.MODEL.Services
{
    public class ServiceCategoria
    {
        public RepostiroryCategoria oRepositoryCategoria { get; set; }

        private Sistema_DoacoesContext _context;

        public ServiceCategoria(Sistema_DoacoesContext context)
        {
            _context = context;
            oRepositoryCategoria = new RepostiroryCategoria(context);
        }

        public async Task IncluirCategoriaDTO(CategoriaDTO categoriaDTO)
        {
            var categoria = new CATEGORIA()
            {
                CatCodigo = categoriaDTO.catCodigo,
                CatNome = categoriaDTO.catNome,
                CatDataRegistro = categoriaDTO.catDataRegistro
            };
            await oRepositoryCategoria.IncluirAsync(categoria);
        }

        public async Task AlterarCategoriaDTO(CategoriaDTO categoriaDTO)
        {
            var categoria = new CATEGORIA()
            {
                CatCodigo = categoriaDTO.catCodigo,
                CatNome = categoriaDTO.catNome,
                CatDataRegistro = categoriaDTO.catDataRegistro
            };
            await oRepositoryCategoria.AlterarAsync(categoria);
        }
        public async Task ExcluirCategoriaDTO(int catCodigo)
        {
            var categoria = await oRepositoryCategoria.SelecionarChaveAsync(catCodigo);

            if (categoria != null)
            {
                await oRepositoryCategoria.ExcluirAsync(categoria);
            }
            else
            {
                throw new Exception("Categoria não encontrada.");
            }
        }

    }
}
