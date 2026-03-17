using System;
using System.Collections.Generic;

namespace MarketPlace.Models;

public partial class Refreshtoken
{
    public int Id { get; set; }

    public int Userid { get; set; }

    public string Token { get; set; } = null!;

    public DateTime Expiration { get; set; }

    public bool? Isrevoked { get; set; }

    public virtual Usuario User { get; set; } = null!;
}
