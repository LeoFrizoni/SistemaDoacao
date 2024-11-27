using Microsoft.EntityFrameworkCore;
using SistemaDoacao.MODEL.Interfaces;
using SistemaDoacao.MODEL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaDoacao.MODEL.Repository
{
    public class RepositoryBase<T> : IRepositoryBase<T>, IDisposable where T : class
    {
        public Sistema_DoacoesContext _context;
        public bool _saveChanges = true;

        public RepositoryBase(Sistema_DoacoesContext context, bool saveChanges)
        {
            _context = context;
            _saveChanges = saveChanges;
        }

        public T Alterar(T obj)
        {
            _context.Entry<T>(obj).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            if (_saveChanges)
            {
                _context.SaveChanges();
            }
            return obj;
        }

        public async Task<T> AlterarAsync(T obj)
        {
            _context.Entry<T>(obj).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            if (_saveChanges)
            {
                await _context.SaveChangesAsync();
            }
            return obj;
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public void Excluir(T obj)
        {
            _context.Set<T>().Remove(obj);
            if (_saveChanges)
            {
                _context.SaveChanges();
            }
        }

        public void Excluir(params object[] var)
        {
            var obj = _context.Set<T>().Find(var);
            Excluir(obj!);
        }

        public async Task ExcluirAsync(T obj)
        {
            _context.Set<T>().Remove(obj);
            if (_saveChanges)
            {
                await _context.SaveChangesAsync();
            }
        }

        public async Task ExcluirAsync(params object[] var)
        {
            var obj = await _context.Set<T>().FindAsync(var);
            await ExcluirAsync(obj!);
        }

        public T Incluir(T obj)
        {
            _context.Set<T>().Add(obj);
            if (_saveChanges)
            {
                _context.SaveChanges();
            }
            return obj;
        }

        public async Task<T> IncluirAsync(T obj)
        {
            await _context.Set<T>().AddAsync(obj);
            if (_saveChanges)
            {
                await _context.SaveChangesAsync();
            }
            return obj;
        }

        public T SelecionarChave(params object[] var)
        {
            return _context.Set<T>().Find(var)!;
        }

        public async Task<T> SelecionarChaveAsync(params object[] var)
        {
            return await _context.Set<T>().FindAsync(var);
        }

        public List<T> SelecionarTodos()
        {
            return _context.Set<T>().ToList();
        }

        public async Task<List<T>> SelecionarTodosAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }


        //EXCLUSIVAMENTE PARA PESQUISA DE NOME E CEP DA LOCALIDADE
        public async Task<LOCALIDADE> SelecionarPorNomeAsync(string nome)
        {
            return await _context.Set<LOCALIDADE>().FirstOrDefaultAsync(l => l.LocNome == nome);
        }

        public async Task<List<LOCALIDADE>> SelecionarPeloCEP(string cep)
        {
            return await _context.Set<LOCALIDADE>().Where(l => l.LocCEP == cep).ToListAsync();
        }
    }
}
