using SistemaDoacao.MODEL.DTO;
using SistemaDoacao.MODEL.Interfaces;
using SistemaDoacao.MODEL.Models;
using SistemaDoacao.MODEL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaDoacao.MODEL.Services
{
    public class ServiceEndereco
    {
        public RepostiroryEndereco oRepositoryEndereco {  get; set; }

        private Sistema_DoacoesContext _context;

        public ServiceEndereco(Sistema_DoacoesContext context)
        {
            _context = context;
            oRepositoryEndereco = new RepostiroryEndereco(context);
        }

        public async Task IncluirEnderecoDTO(EnderecoDTO enderecoDTO)
        {
            var endereco = new ENDERECO()
            {
                EndCodigo = enderecoDTO.endCodigo,
                EndCodigoLocalidade = enderecoDTO.endCodigoLocalidade,
                EndBairro = enderecoDTO.endBairro,
                EndCidade = enderecoDTO.endCidade,
                EndComplemento = enderecoDTO.endComplemento,
                EndDataRegistro = enderecoDTO.endDataRegistro,
                EndLogradouro = enderecoDTO.endLogradouro,
                EndNumero = enderecoDTO.endNumero
            };
            await oRepositoryEndereco.IncluirAsync(endereco);
        }

        public async Task AlterarEndercoDTO(EnderecoDTO enderecoDTO)
        {
            var endereco = new ENDERECO()
            {
                EndCodigo = enderecoDTO.endCodigo,
                EndCodigoLocalidade = enderecoDTO.endCodigoLocalidade,
                EndBairro = enderecoDTO.endBairro,
                EndCidade = enderecoDTO.endCidade,
                EndComplemento = enderecoDTO.endComplemento,
                EndDataRegistro = enderecoDTO.endDataRegistro,
                EndLogradouro = enderecoDTO.endLogradouro,
                EndNumero = enderecoDTO.endNumero
            };
            await oRepositoryEndereco.AlterarAsync(endereco);
        }

        public async Task ExcluirEnderecoDTO(int enderecoCodigo)
        {
            var categoria = await oRepositoryEndereco.SelecionarChaveAsync(enderecoCodigo);

            if (categoria != null)
            {
                await oRepositoryEndereco.ExcluirAsync(enderecoCodigo);
            }
            else
            {
                throw new Exception("Categoria não encontrada.");
            }
        }
    }
}
