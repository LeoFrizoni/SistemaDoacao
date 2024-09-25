using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaDoacao.MODEL.DTO
{
    public class CategoriaDTO
    {
        public int catCodigo {  get; set; }
        public string catNome { get; set; }
        public DateTime catDataRegistro { get; set; }
    }
}
