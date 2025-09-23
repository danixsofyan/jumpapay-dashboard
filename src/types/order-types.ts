export type OrderStatus = 'Belum Bayar' | 'Sudah Bayar' | 'Sedang Diproses' | 'Selesai';

export interface Order { 
  id: number; 
  tanggal: string; 
  nama: string; 
  layanan: string; 
  no_hp: string; 
  kota: string; 
  status_pembayaran: OrderStatus; 
  platform: string; 
  harga: string; 
}
