using System;
using System.Collections.Generic;

namespace MarketPlace.Models;

public partial class EstadosFactura
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Descripcion { get; set; }

    public virtual ICollection<Factura> Facturas { get; set; } = new List<Factura>();
}
