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
    public class ServiceLocalidade
    {
        public RepostiroryLocalidade oRepositoryLocalidade { get; set; }
        public RepostiroryEndereco oRepositoryEndereco { get; set; }

        private Sistema_DoacoesContext _context;

        public ServiceLocalidade(Sistema_DoacoesContext context)
        {
            _context = context;
            oRepositoryLocalidade = new RepostiroryLocalidade(context);
        }

        //public async Task IncluirLocalidadeDTO(LocalidadeDTO localidadeDTO)
        //{
        //    var localidade = new LOCALIDADE()
        //    {
        //        LocCodigo = localidadeDTO.locCodigo,
        //        LocNome = localidadeDTO.locNome,
        //        LocDescricao = localidadeDTO.locDescricao,
        //        LocCoordenada = localidadeDTO.locCoordenada,
        //        LocSite = localidadeDTO.locSite
        //    };
        //    await oRepositoryLocalidade.IncluirAsync(localidade);
        //}

        
    }
}
