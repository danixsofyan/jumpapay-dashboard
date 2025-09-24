export type OrderStatus =
  | 'Belum Bayar'
  | 'Sudah Bayar'
  | 'Sedang Diproses'
  | 'Selesai'
  | 'Perlu Verifikasi'
  | 'Konfirmasi ETLE'
  | 'Konfirmasi Alamat'
  | 'Dibatalkan'
  | 'Menunggu Pembayaran';

interface BaseOrder {
  id: number;
  tanggal: string;
  nama: string;
  layanan: string;
  no_hp: string;
  kota: string;
  platform: string;
  harga: string;
}

export interface B2COrder extends BaseOrder {
  variant: 'b2c';
  status_pembayaran: OrderStatus;
}

export interface B2BOrder extends BaseOrder {
  variant: 'b2b';
  status_b2b: OrderStatus;
}

export type Order = B2COrder | B2BOrder;