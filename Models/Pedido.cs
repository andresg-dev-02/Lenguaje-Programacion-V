using System;
using System.Collections.Generic;

namespace MarketPlace.Models;

public partial class Pedido
{
    public int Id { get; set; }

    public int UsuarioId { get; set; }

    public int DireccionId { get; set; }

    public int EstadoId { get; set; }

    public decimal Total { get; set; }

    public DateTime Fecha { get; set; }

    public virtual ICollection<DetallePedido> DetallePedidos { get; set; } = new List<DetallePedido>();

    public virtual Direccione Direccion { get; set; } = null!;

    public virtual EstadosPedido Estado { get; set; } = null!;

    public virtual ICollection<Pago> Pagos { get; set; } = new List<Pago>();

    public virtual Usuario Usuario { get; set; } = null!;
}
