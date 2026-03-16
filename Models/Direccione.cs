using System;
using System.Collections.Generic;

namespace MarketPlace.Models;

public partial class Direccione
{
    public int Id { get; set; }

    public int UsuarioId { get; set; }

    public string Calle { get; set; } = null!;

    public string Ciudad { get; set; } = null!;

    public string? Departamento { get; set; }

    public string? CodigoPostal { get; set; }

    public string? Pais { get; set; }

    public bool? EsPrincipal { get; set; }

    public virtual ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();

    public virtual Usuario Usuario { get; set; } = null!;
}
