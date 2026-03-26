using System;
using System.Collections.Generic;

namespace MarketPlace.Models;

public partial class Historialventum
{
    public int Id { get; set; }

    public int Usuarioid { get; set; }

    public string Imagenproducto { get; set; } = null!;

    public string Nombreproducto { get; set; } = null!;

    public int Cantidad { get; set; }

    public decimal Total { get; set; }

    public DateTime? Fecha { get; set; }

    public virtual Usuario Usuario { get; set; } = null!;
}
