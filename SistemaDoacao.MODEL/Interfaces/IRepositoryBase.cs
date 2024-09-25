using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaDoacao.MODEL.Interfaces
{
    public interface IRepositoryBase<T> where T : class
    {
        T Incluir(T obj);
        T Alterar(T obj);
        T SelecionarChave(params object[] var);
        List<T> SelecionarTodos();
        void Excluir(T obj);
        void Excluir(params object[] var);

        Task<T> IncluirAsync(T obj);
        Task<T> AlterarAsync(T obj);
        Task<T> SelecionarChaveAsync(params object[] var);
        Task<List<T>> SelecionarTodosAsync();
        Task ExcluirAsync(T obj);
        Task ExcluirAsync(params object[] var);
    }
}
