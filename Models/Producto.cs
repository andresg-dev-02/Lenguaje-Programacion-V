using System;
using System.Collections.Generic;

namespace MarketPlace.Models;

public partial class Producto
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Descripcion { get; set; }

    public decimal Precio { get; set; }

    public int? Stock { get; set; }

    public string? ImagenUrl { get; set; }

    public bool? Activo { get; set; }

    public int? CategoriaId { get; set; }

    public DateTime? CreadoEn { get; set; }

    public virtual Categoria? Categoria { get; set; }

    public virtual ICollection<DetallePedido> DetallePedidos { get; set; } = new List<DetallePedido>();
}
