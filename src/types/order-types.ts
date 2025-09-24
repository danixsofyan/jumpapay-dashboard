export type OrderStatus = "Belum Bayar" | "Sudah Bayar" | "Sedang Diproses" | "Selesai" | "Perlu Verifikasi" | "Konfirmasi ETLE" | "Konfirmasi Alamat" | "Dibatalkan";

export interface Order {
  id: number;
  tanggal: string;
  nama: string;
  layanan: string;
  no_hp: string;
  kota: string;
  platform: string;
  harga: string;
  status_pembayaran?: OrderStatus; 
  status_b2b?: OrderStatus;
}