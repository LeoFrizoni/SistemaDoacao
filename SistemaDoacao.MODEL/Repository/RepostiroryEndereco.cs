
using SistemaDoacao.MODEL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaDoacao.MODEL.Repository
{
    public class RepostiroryEndereco : RepositoryBase<ENDERECO>
    {
        public RepostiroryEndereco(Sistema_DoacoesContext context, bool saveChanges = true) : base(context, saveChanges)
        {
        }
    }
}
