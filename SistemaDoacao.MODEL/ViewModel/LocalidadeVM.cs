using Microsoft.EntityFrameworkCore;
using SistemaDoacao.MODEL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaDoacao.MODEL.ViewModel
{
    public class LocalidadeVM
    {
        // Localidade

        public int CodigoLocalidade { get; set; }
        public string NomeLocalidade { get; set; }
        public string DescricaoLocalidade {  get; set; }
        public string SiteLocalidade { get; set; }
        public string CoordenadaLocalidade { get; set; }
        
        // Endereco
        
        public int EnderecoCodigo { get; set; }
        public int EnderecoLocCodigo { get; set; }
        public string CEP {  get; set; }
        public string Cidade {  get; set; }
        public string Bairro { get; set; }
        public string Logradouro { get; set; }
        public int Numero {  get; set; }
        public string Complemento { get; set; }
        public DateTime DataRegistroEndereco { get; set; }

        public async static Task<List<LocalidadeVM>> GetLocalidadeVM()
        {
            var db = new Sistema_DoacoesContext();
            var listaLocalidade = await db.LOCALIDADEs.ToListAsync();
            return await (from loc in db.LOCALIDADEs
                          join end in db.ENDERECOs on loc.LocCodigo equals end.EndCodigo
                          select new LocalidadeVM
                          {
                              CodigoLocalidade = loc.LocCodigo,
                              NomeLocalidade = loc.LocNome,
                              DescricaoLocalidade = loc.LocDescricao,
                              SiteLocalidade = loc.LocSite,
                              CoordenadaLocalidade = loc.LocCoordenada,
                              EnderecoCodigo = end.EndCodigo,
                              EnderecoLocCodigo = end.EndCodigoLocalidade,
                              CEP = end.EndCEP,
                              Cidade = end.EndCidade,
                              Bairro = end.EndBairro,
                              Logradouro = end.EndLogradouro,
                              Numero = end.EndNumero,
                              Complemento = end.EndComplemento,
                              DataRegistroEndereco = end.EndDataRegistro
                          }).ToListAsync();
        }


    }
}
