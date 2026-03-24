using System;
using System.Collections.Generic;

namespace MarketPlace.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Contraseña { get; set; } = null!;

    public int? RolId { get; set; }

    public bool? Activo { get; set; }

    public DateTime? CreadoEn { get; set; }

    public virtual ICollection<Refreshtoken> Refreshtokens { get; set; } = new List<Refreshtoken>();

    public virtual Role? Rol { get; set; }
}
