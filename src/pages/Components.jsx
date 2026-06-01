import React from "react";
import Container from "../components/Container";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import Card from "../components/Card";
import ProductCard from "../components/ProductCard";
import Table from "../components/Table";
import Footer from "../components/Footer";

export default function Components() {
  const headers = ["ID", "Nama Produk Farmasi", "Kategori Medis", "Sisa Stok", "Harga Jual", "Tindakan"];
  const products = [
    { id: "GC-091", name: "GlowCare Advanced Retinol Serum 20ml", category: "Serum / Anti-Aging", stock: "45 Pcs", price: "Rp 249.000" },
    { id: "GC-104", name: "UV Shield Sunscreen Gel SPF 50+", category: "Protection / Daily", stock: "120 Pcs", price: "Rp 145.000" },
    { id: "GC-032", name: "Acne Clarifying Facial Foam 100ml", category: "Cleanser / Acne Care", stock: "18 Pcs", price: "Rp 115.000" }
  ];

  return (
    <Container className="space-y-10 font-sans pb-12">
      {/* Header Utama Layanan Klinik */}
      <div className="border-b border-[#E6EFF5] pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#343C6A] tracking-tight">Katalog Layanan & Produk</h1>
          <p className="text-sm text-[#718EBF] mt-1">Manajemen aset produk skincare, status pelayanan ruang, dan daftar dokter penanggung jawab klinis GlowCare.</p>
        </div>
        <Button type="primary">+ Tambah Produk Baru</Button>
      </div>

      {/* SECTION 1: MASTER PARAMETER & STATUS ANTRIAN */}
      <section className="space-y-4">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-[#343C6A]">Indikator Sistem & Ruang</h2>
          <p className="text-xs text-[#718EBF] mt-0.5">Indikator status penanganan pasien yang terintegrasi langsung dengan ruang sterilisasi dan poli kosmetik.</p>
        </div>
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-xs font-bold text-[#B1B1B1] mb-3 uppercase tracking-widest">Aksi Cepat Kasir (Billing)</p>
              <div className="flex flex-wrap gap-2">
                <Button type="success">Cetak Resep</Button>
                <Button type="warning">Restock Obat</Button>
                <Button type="danger">Batalkan Invoice</Button>
              </div>
            </div>
            
            <div>
              <p className="text-xs font-bold text-[#B1B1B1] mb-3 uppercase tracking-widest">Status Pasien Saat Ini</p>
              <div className="flex flex-wrap gap-2">
                <Badge type="primary">Aktif Treatment</Badge>
                <Badge type="warning">Reservasi Baru</Badge>
                <Badge type="success">Selesai / Pulang</Badge>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-[#B1B1B1] mb-3 uppercase tracking-widest">Tim Medis Standby (On Duty)</p>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <Avatar name="Sarah" />
                  <Avatar name="Reza" />
                  <Avatar name="Alya" />
                </div>
                <span className="text-xs font-semibold text-[#718EBF]">(3 Dokter Spesialis)</span>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* SECTION 2: ETALASE PRODUK SKINCARE */}
      <section className="space-y-4">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-[#343C6A]">Rekomendasi Etalase Skincare</h2>
          <p className="text-xs text-[#718EBF] mt-0.5">Katalog produk kosmetik racikan medis yang dapat diresepkan langsung oleh dokter penanggung jawab.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProductCard
            image="https://placehold.co/600x400/e0f2fe/0369a1?text=Advanced+Serum"
            title="Advanced Luminous Brightening Serum"
            category="Rekomendasi Dokter"
            price="Rp 385.000"
            description="Serum konsentrat klinis dengan kandungan Niacinamide 10% dan Hyaluronic Acid murni untuk mencerahkan skin barrier kulit kusam secara instan."
          />
          <ProductCard
            image="https://placehold.co/600x400/dcfce7/15803d?text=Barrier+Cream"
            title="Ceramide Intensive Barrier Cream"
            category="Perawatan Pasca Laser"
            price="Rp 225.000"
            description="Krim pelembap medis intensif yang diformulasikan khusus untuk memperbaiki serta mengunci kelembapan wajah pasca tindakan laser treatment."
          />
        </div>
      </section>

      {/* SECTION 3: INVENTORY LOG TABLE */}
      <section className="space-y-4">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-[#343C6A]">Log Stok Inventaris Apotek</h2>
          <p className="text-xs text-[#718EBF] mt-0.5">Tabel rekam ketersediaan stok produk klinik yang tersinkronisasi otomatis dengan gudang pusat obat.</p>
        </div>
        <Table headers={headers}>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-[#F5F7FA] transition-colors">
              <td className="border border-[#E6EFF5] px-6 py-4 text-sm font-semibold text-[#718EBF]">{product.id}</td>
              <td className="border border-[#E6EFF5] px-6 py-4 text-sm font-bold text-[#232323]">{product.name}</td>
              <td className="border border-[#E6EFF5] px-6 py-4 text-sm text-[#718EBF]">
                <span className="px-3 py-1 rounded-full bg-[#E0F2FE] text-[#0369A1] text-xs font-bold">
                  {product.category}
                </span>
              </td>
              <td className="border border-[#E6EFF5] px-6 py-4 text-sm font-semibold text-[#475569]">{product.stock}</td>
              <td className="border border-[#E6EFF5] px-6 py-4 text-sm font-bold text-[#1877F2]">{product.price}</td>
              <td className="border border-[#E6EFF5] px-6 py-4 text-sm">
                <Button type="secondary">Sesuaikan Stok</Button>
              </td>
            </tr>
          ))}
        </Table>
      </section>

      {/* SECTION 4: FOOTER BRANDING */}
      <section className="pt-4">
        <Footer />
      </section>
    </Container>
  );
}