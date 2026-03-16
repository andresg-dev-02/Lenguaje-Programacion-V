using System;
using System.Collections.Generic;

namespace MarketPlace.Models;

public partial class EstadosPedido
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Descripcion { get; set; }

    public virtual ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();
}
