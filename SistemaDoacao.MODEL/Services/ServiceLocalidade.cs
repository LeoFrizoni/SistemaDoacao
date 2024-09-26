using Microsoft.IdentityModel.Tokens;
using SistemaDoacao.MODEL.DTO;
using SistemaDoacao.MODEL.Interfaces;
using SistemaDoacao.MODEL.Models;
using SistemaDoacao.MODEL.Repository;
using SistemaDoacao.MODEL.ViewModel;
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

        public async Task IncluirLocalidadeDTO(LocalidadeDTO localidadeDTO)
        {
            var localidade = new LOCALIDADE()
            {
                LocCodigo = localidadeDTO.locCodigo,
                LocNome = localidadeDTO.locNome,
                LocDescricao = localidadeDTO.locDescricao,
                LocCoordenada = localidadeDTO.locCoordenada,
                LocSite = localidadeDTO.locSite
            };
            await oRepositoryLocalidade.IncluirAsync(localidade);
        }

        public async Task AlterarLocalidadeDTO(LocalidadeDTO localidadeDTO)
        {
            var localidade = new LOCALIDADE()
            {
                LocCodigo = localidadeDTO.locCodigo,
                LocNome = localidadeDTO.locNome,
                LocDescricao = localidadeDTO.locDescricao,
                LocCoordenada = localidadeDTO.locCoordenada,
                LocSite = localidadeDTO.locSite
            };
            await oRepositoryLocalidade.AlterarAsync(localidade);
        }
        public async Task ExcluirLocalidadeDTO(int locCodigo)
        {
            var categoria = await oRepositoryLocalidade.SelecionarChaveAsync(locCodigo);

            if (categoria != null)
            {
                await oRepositoryLocalidade.ExcluirAsync(locCodigo);
            }
            else
            {
                throw new Exception("Categoria não encontrada.");
            }
        }

        //UTILIZANDO ViewModel

        public async Task<LocalidadeVM> IncluirLocalidadeAsyncVM(LocalidadeVM localidadeVM)
        {
            var localidade = new LOCALIDADE()
            {
                LocCodigo = localidadeVM.CodigoLocalidade,
                LocNome = localidadeVM.NomeLocalidade,
                LocDescricao = localidadeVM.DescricaoLocalidade,
                LocSite = localidadeVM.SiteLocalidade,
                LocCoordenada = localidadeVM.CoordenadaLocalidade
            };
            await oRepositoryLocalidade.IncluirAsync(localidade);

            var endereco = new ENDERECO()
            {
                EndCodigo = localidadeVM.EnderecoCodigo,
                EndCEP = localidadeVM.CEP,
                EndCidade = localidadeVM.Cidade,
                EndBairro = localidadeVM.Bairro,
                EndComplemento = localidadeVM.Complemento,
                EndLogradouro = localidadeVM.Logradouro,
                EndNumero = localidadeVM.Numero,
                EndDataRegistro = localidadeVM.DataRegistroEndereco
            };

            
            await oRepositoryEndereco.IncluirAsync(endereco);
            

            return localidadeVM;
        }

        public async Task<LocalidadeVM> AlterarLocalidadeAsyncVM(LocalidadeVM localidadeVM)
        {
            var localidade = new LOCALIDADE()
            {
                LocCodigo = localidadeVM.CodigoLocalidade,
                LocNome = localidadeVM.NomeLocalidade,
                LocDescricao = localidadeVM.DescricaoLocalidade,
                LocSite = localidadeVM.SiteLocalidade,
                LocCoordenada = localidadeVM.CoordenadaLocalidade
            };

            var endereco = new ENDERECO()
            {
                EndCodigo = localidadeVM.EnderecoCodigo,
                EndCEP = localidadeVM.CEP,
                EndCidade = localidadeVM.Cidade,
                EndBairro = localidadeVM.Bairro,
                EndComplemento = localidadeVM.Complemento,
                EndLogradouro = localidadeVM.Logradouro,
                EndNumero = localidadeVM.Numero,
                EndDataRegistro = localidadeVM.DataRegistroEndereco
            };

            await oRepositoryLocalidade.AlterarAsync(localidade);
            await oRepositoryEndereco.AlterarAsync(endereco);

            return localidadeVM;
        }

        public async Task<bool> ExcluirLocalidadeAsyncVM(LocalidadeVM localidadeVM)
        {

            if (localidadeVM == null)
            {
                throw new ArgumentNullException(nameof(localidadeVM), "Os dados da localidade são obrigatórios.");
            }

            // Supondo que os valores zero ou negativos não sejam permitidos
            if (localidadeVM.CodigoLocalidade <= 0 || localidadeVM.EnderecoCodigo <= 0)
            {
                throw new ArgumentException("Código da localidade ou do endereço é inválido.");
            }

            // 1. Verifica se a localidade existe
            var localidade = await oRepositoryLocalidade.SelecionarChaveAsync(localidadeVM.CodigoLocalidade);

            if (localidade == null)
            {
                throw new Exception("Localidade não encontrada.");
            }

            // 2. Verifica se o endereço associado existe
            var endereco = await oRepositoryEndereco.SelecionarChaveAsync(localidadeVM.EnderecoCodigo);

            if (endereco == null)
            {
                throw new Exception("Endereço associado não encontrado.");
            }

            // 3. Começa uma transação se a tua camada de dados suporta
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    // 4. Exclui o endereço
                    await oRepositoryEndereco.ExcluirAsync(endereco);

                    // 5. Exclui a localidade
                    await oRepositoryLocalidade.ExcluirAsync(localidade);

                    // 6. Confirma a transação
                    await transaction.CommitAsync();
                }
                catch (Exception)
                {
                    // Em caso de erro, faz rollback da transação
                    await transaction.RollbackAsync();
                    throw;
                }
            }

            // 7. Retorna true se a exclusão foi bem-sucedida
            return true;
        }


    }
}
