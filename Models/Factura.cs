using System;
using System.Collections.Generic;

namespace MarketPlace.Models;

public partial class Factura
{
    public int Id { get; set; }

    public int PagoId { get; set; }

    public DateTime Fecha { get; set; }

    public decimal Total { get; set; }

    public int EstadoId { get; set; }

    public virtual EstadosFactura Estado { get; set; } = null!;

    public virtual Pago Pago { get; set; } = null!;
}
