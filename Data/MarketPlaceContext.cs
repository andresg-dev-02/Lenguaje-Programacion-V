using System;
using System.Collections.Generic;
using MarketPlace.Models;
using Microsoft.EntityFrameworkCore;

namespace MarketPlace.Data;

public partial class MarketPlaceContext : DbContext
{
    public MarketPlaceContext()
    {
    }

    public MarketPlaceContext(DbContextOptions<MarketPlaceContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Categoria> Categorias { get; set; }

    public virtual DbSet<Historialventum> Historialventa { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<Refreshtoken> Refreshtokens { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=dpg-d6o3a3p4tr6s73efs5fg-a.oregon-postgres.render.com;Database=marketplace_bd;Username=marketplace_bd_user;Password=nHXorQl6hAVBRyn0l7WguLtsvOHXMXKS;Port=5432;SSL Mode=Require;Trust Server Certificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Categoria>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("categorias_pkey");

            entity.ToTable("categorias");

            entity.HasIndex(e => e.Nombre, "categorias_nombre_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Descripcion).HasColumnName("descripcion");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Historialventum>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("historialventa_pkey");

            entity.ToTable("historialventa");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Cantidad).HasColumnName("cantidad");
            entity.Property(e => e.Fecha)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("fecha");
            entity.Property(e => e.Imagenproducto)
                .HasMaxLength(255)
                .HasColumnName("imagenproducto");
            entity.Property(e => e.Nombreproducto)
                .HasMaxLength(255)
                .HasColumnName("nombreproducto");
            entity.Property(e => e.Total)
                .HasPrecision(10, 2)
                .HasColumnName("total");
            entity.Property(e => e.Usuarioid).HasColumnName("usuarioid");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Historialventa)
                .HasForeignKey(d => d.Usuarioid)
                .HasConstraintName("fk_historial_usuario");
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("productos_pkey");

            entity.ToTable("productos");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Activo)
                .HasDefaultValue(true)
                .HasColumnName("activo");
            entity.Property(e => e.CategoriaId).HasColumnName("categoria_id");
            entity.Property(e => e.CreadoEn)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("creado_en");
            entity.Property(e => e.Descripcion).HasColumnName("descripcion");
            entity.Property(e => e.ImagenUrl)
                .HasMaxLength(255)
                .HasColumnName("imagen_url");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
            entity.Property(e => e.Precio)
                .HasPrecision(10, 2)
                .HasColumnName("precio");
            entity.Property(e => e.Stock)
                .HasDefaultValue(0)
                .HasColumnName("stock");

            entity.HasOne(d => d.Categoria).WithMany(p => p.Productos)
                .HasForeignKey(d => d.CategoriaId)
                .HasConstraintName("productos_categoria_id_fkey");
        });

        modelBuilder.Entity<Refreshtoken>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("refreshtokens_pkey");

            entity.ToTable("refreshtokens");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Expiration)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("expiration");
            entity.Property(e => e.Isrevoked)
                .HasDefaultValue(false)
                .HasColumnName("isrevoked");
            entity.Property(e => e.Token)
                .HasMaxLength(500)
                .HasColumnName("token");
            entity.Property(e => e.Tokenprincipalid)
                .HasMaxLength(100)
                .HasColumnName("tokenprincipalid");
            entity.Property(e => e.Userid).HasColumnName("userid");

            entity.HasOne(d => d.User).WithMany(p => p.Refreshtokens)
                .HasForeignKey(d => d.Userid)
                .HasConstraintName("fk_user");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("roles_pkey");

            entity.ToTable("roles");

            entity.HasIndex(e => e.Nombre, "roles_nombre_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("usuarios_pkey");

            entity.ToTable("usuarios");

            entity.HasIndex(e => e.Email, "usuarios_email_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Activo)
                .HasDefaultValue(true)
                .HasColumnName("activo");
            entity.Property(e => e.Contraseña)
                .HasMaxLength(255)
                .HasColumnName("contraseña");
            entity.Property(e => e.CreadoEn)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("creado_en");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
            entity.Property(e => e.RolId).HasColumnName("rol_id");

            entity.HasOne(d => d.Rol).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.RolId)
                .HasConstraintName("usuarios_rol_id_fkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
