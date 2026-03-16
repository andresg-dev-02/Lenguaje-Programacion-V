using System;
using System.Collections.Generic;

namespace MarketPlace.Models;

public partial class Pago
{
    public int Id { get; set; }

    public int PedidoId { get; set; }

    public int MetodoPagoId { get; set; }

    public decimal Monto { get; set; }

    public int EstadoId { get; set; }

    public DateTime Fecha { get; set; }

    public virtual EstadosPago Estado { get; set; } = null!;

    public virtual MetodosPago MetodoPago { get; set; } = null!;

    public virtual Pedido Pedido { get; set; } = null!;
}
