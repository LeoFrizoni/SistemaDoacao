﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace SistemaDoacao.MODEL.Models;

public partial class LOCALIDADE
{
    public int LocCodigo { get; set; }

    public string LocNome { get; set; }

    public string LocDescricao { get; set; }

    public string LocSite { get; set; }

    public string LocCoordenada { get; set; }

    public virtual ICollection<ENDERECO> ENDERECOs { get; set; } = new List<ENDERECO>();

    public virtual ICollection<CATEGORIum> CLCodigoCategoria { get; set; } = new List<CATEGORIum>();
}