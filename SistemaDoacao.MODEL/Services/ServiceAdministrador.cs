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
    public class ServiceAdministrador
    {
        public RepositoryAdministrador oRepositoryAdministrador {  get; set; }

        private Sistema_DoacoesContext _context;

        public ServiceAdministrador(Sistema_DoacoesContext context)
        {
            _context = context;
            oRepositoryAdministrador = new RepositoryAdministrador(context);
        }

        public async Task IncluirAdmDTO(AdministradorDTO administradorDTO)
        {
            var adm = new ADMINISTRADOR()
            {
                AdmCodigo = administradorDTO.admCodigo,
                AdmUsuario = administradorDTO.admUsuario,
                AdmSenha = administradorDTO.admSenha
            };
            await oRepositoryAdministrador.IncluirAsync(adm);
        }

        public async Task AlterarAdmDTO(AdministradorDTO administradorDTO)
        {
            var adm = new ADMINISTRADOR()
            {
                AdmCodigo = administradorDTO.admCodigo,
                AdmUsuario = administradorDTO.admUsuario,
                AdmSenha = administradorDTO.admSenha
            };
            await oRepositoryAdministrador.AlterarAsync(adm);
        }

        public async Task ExcluirAdmDTO(int admCodigo)
        {
            var adm = await oRepositoryAdministrador.SelecionarChaveAsync(admCodigo);

            if (adm != null)
            {
                await oRepositoryAdministrador.ExcluirAsync(admCodigo);
            }
            else
            {
                throw new Exception("Administrador não encontrada.");
            }
        }
    }
}
