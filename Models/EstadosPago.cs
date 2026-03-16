using System;
using System.Collections.Generic;

namespace MarketPlace.Models;

public partial class EstadosPago
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Descripcion { get; set; }

    public virtual ICollection<Pago> Pagos { get; set; } = new List<Pago>();
}
