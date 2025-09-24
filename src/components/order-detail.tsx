'use client';

import { FC } from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Order { 
    id: number;
    tanggal: string;
    nama: string;
    layanan: string;
    no_hp: string;
    kota: string;
    status_pembayaran: 'Belum Bayar' | 'Sudah Bayar' | 'Sedang Diproses' | 'Selesai';
    platform: string;
    harga: string;
    detail?: {
        metode_pembayaran: string;
        alamat_penjemputan: {
            kota: string;
            detail: string;
        };
        status_detail: {
            status: string;
            status_pembayaran_detail: string;
            kurir: string;
            serah_terima_dokumen: string;
        };
        perpanjangan_pajak: {
            jenis_kendaraan: string;
            nomor_plat: string;
            pkb_terakhir: string;
            masa_berlaku_pkb: string;
            total_harga: string;
            biaya_jasa: string;
        };
        dokumen_order: { label: string; url: string; }[];
        rincian_pembayaran: {
            biaya_pajak: { label: string; value: string; }[];
            sub_total_biaya_pajak: string;
            biaya_jasa_jumpapay: { label: string; value: string; }[];
            sub_total_biaya_jasa_jumpapay: string;
        };
    };
}

interface OrderDetailProps {
    order: Order;
    title: string;
}

const OrderDetail: FC<OrderDetailProps> = ({ order, title }) => {
    const router = useRouter();

    const formatPrice = (price: string) => {
        const numericPrice = parseFloat(price.replace(/[^0-9,-]+/g,""));
        if (isNaN(numericPrice)) return "Rp0";

        return `Rp${numericPrice.toLocaleString('id-ID')}`;
    }

    if (!order.detail) {
      return (
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-neutral-800">
          <p className="text-center text-lg font-semibold text-gray-700 dark:text-neutral-300">Data detail order tidak tersedia.</p>
        </div>
      )
    }
    
    const { detail } = order;

    return (
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-neutral-800">
            {/* Header Utama (Arrow Back dan Title) */}
            <div className="flex items-center gap-4 mb-4">
                <button 
                    onClick={() => router.back()}
                    className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors duration-200 cursor-pointer"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-neutral-100">{title}</h1>
            </div>

            {/* Breadcrumb dan Garis Pemisah */}
            <div className="flex items-center gap-2 mb-4 text-sm text-gray-500 dark:text-neutral-400">
                <span onClick={() => router.back()} className="cursor-pointer">Order</span> &gt; <span className="font-medium">Detail Order</span>
            </div>
            <hr className="mb-6 border-t border-gray-200 dark:border-neutral-700" />


            <div className="p-5 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-800/50 mb-6">
                <p className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-3">
                    ID Order: <span className="text-primary dark:text-blue-400">#{order.id}</span>
                </p>
                <div className="flex gap-4">
                    <div className="inline-flex items-center px-3 py-1 bg-gray-200 dark:bg-neutral-700 rounded-md text-xs font-medium text-gray-700 dark:text-neutral-200">
                        Tanggal Order: {order.tanggal}, 20:10
                    </div>
                    <div className="inline-flex items-center px-3 py-1 bg-gray-200 dark:bg-neutral-700 rounded-md text-xs font-medium text-gray-700 dark:text-neutral-200">
                        Tanggal Bayar: {order.tanggal}, 20:10
                    </div>
                </div>
            </div>

            {/* Bagian Customer & Order, Alamat, Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Customer & Order Card */}
                <div className="rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-4">Customer & Order</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 dark:text-neutral-400">Nama Customer</span>
                            <span className="font-semibold text-gray-900 dark:text-neutral-100">{order.nama}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 dark:text-neutral-400">Nomor Customer</span>
                            <span className="font-semibold text-gray-900 dark:text-neutral-100">{order.no_hp}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 dark:text-neutral-400">Metode Pembayaran</span>
                            <span className="font-semibold text-gray-900 dark:text-neutral-100">{detail.metode_pembayaran}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 dark:text-neutral-400">Kode Voucher</span>
                            <span className="font-semibold text-gray-900 dark:text-neutral-100">-</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 dark:text-neutral-400">Platform</span>
                            <span className="font-semibold text-gray-900 dark:text-neutral-100">{order.platform}</span>
                        </div>
                    </div>
                </div>

                {/* Alamat Penjemputan Card */}
                <div className="rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-4">Alamat Penjemputan</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 dark:text-neutral-400">Kota</span>
                            <span className="font-semibold text-gray-900 dark:text-neutral-100">{detail.alamat_penjemputan.kota}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 dark:text-neutral-400">Detail Alamat</span>
                            <span className="font-semibold text-gray-900 dark:text-neutral-100 text-right">
                                {detail.alamat_penjemputan.detail}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Status Order Card */}
                <div className="rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-4">Status Order</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 dark:text-neutral-400">Status</span>
                            <span className="font-semibold text-gray-900 dark:text-neutral-100">{detail.status_detail.status}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 dark:text-neutral-400">Status Pembayaran</span>
                            <span className="font-semibold text-gray-900 dark:text-neutral-100">{detail.status_detail.status_pembayaran_detail}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 dark:text-neutral-400">Kurir</span>
                            <span className="font-semibold text-gray-900 dark:text-neutral-100">{detail.status_detail.kurir}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 dark:text-neutral-400">Serah Terima Dokumen</span>
                            <span className="font-semibold text-gray-900 dark:text-neutral-100">{detail.status_detail.serah_terima_dokumen}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bagian "Perpanjang Pajak 1 Tahun" */}
            <div className="border-t border-gray-200 dark:border-neutral-700 pt-6 mt-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4">{order.layanan}</h2>
                <div className="overflow-x-auto mb-6">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 rounded-lg overflow-hidden border border-gray-200 dark:border-neutral-700">
                        <thead className="bg-gray-50 dark:bg-neutral-800">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-neutral-300 uppercase tracking-wider">
                                    Jenis Kendaraan
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-neutral-300 uppercase tracking-wider">
                                    Nomor Plat
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-neutral-300 uppercase tracking-wider">
                                    PKB Terakhir
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-neutral-300 uppercase tracking-wider">
                                    Masa Berlaku PKB
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-neutral-300 uppercase tracking-wider">
                                    Total Harga
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-neutral-300 uppercase tracking-wider">
                                    Biaya Jasa
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-neutral-300 uppercase tracking-wider">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-neutral-900 divide-y divide-gray-200 dark:divide-neutral-700">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-neutral-100">{detail.perpanjangan_pajak.jenis_kendaraan}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-neutral-300">{detail.perpanjangan_pajak.nomor_plat}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-neutral-300">{detail.perpanjangan_pajak.pkb_terakhir}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-neutral-300">{detail.perpanjangan_pajak.masa_berlaku_pkb}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-neutral-300">{detail.perpanjangan_pajak.total_harga}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-neutral-300">{detail.perpanjangan_pajak.biaya_jasa}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-gray-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-neutral-100">
                                        <Download className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-4">Dokumen Order</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {detail.dokumen_order.map((doc, index) => (
                        <Image
                        key={index}
                        src={doc.url}
                        alt={doc.label}
                        width={400}
                        height={300}
                        className="w-full h-auto rounded-lg shadow-sm"
                        unoptimized
                        />
                    ))}
                </div>
            </div>
            
            {/* Bagian Rincian Pembayaran */}
            <div className="border-t border-gray-200 dark:border-neutral-700 pt-4 mt-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2">Rincian Pembayaran</h2>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2 mt-4 mb-4">Biaya Pajak</h2>
                
                {/* Biaya Pajak */}
                <div className="rounded-xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 shadow-xs">
                    <div className="divide-y divide-gray-200 dark:divide-neutral-700 dark:border-neutral-700">
                        {detail.rincian_pembayaran.biaya_pajak.map((item, index) => (
                            <div key={index} className="flex justify-between items-center text-sm text-gray-700 dark:text-neutral-300 px-6 py-3">
                                <span>{item.label}</span>
                                <span>{item.value}</span>
                            </div>
                        ))}
                        <div className="flex justify-between items-center text-sm text-gray-700 dark:text-neutral-300 px-6 py-3 font-semibold">
                            <span>Sub Total Biaya Pajak</span>
                            <span>{detail.rincian_pembayaran.sub_total_biaya_pajak}</span>
                        </div>
                    </div>
                </div>

                <h2 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mt-4 mb-3">Biaya Jasa Jumpapay</h2>

                {/* Biaya Jasa Jumpapay */}
                <div className="rounded-xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 shadow-xs">
                    <div className="divide-y divide-gray-200 dark:divide-neutral-700 dark:border-neutral-700">
                        {detail.rincian_pembayaran.biaya_jasa_jumpapay.map((item, index) => (
                            <div key={index} className="flex justify-between items-center text-sm text-gray-700 dark:text-neutral-300 px-6 py-3">
                                <span>{item.label}</span>
                                <span>{item.value}</span>
                            </div>
                        ))}
                        <div className="flex justify-between items-center text-sm text-gray-700 dark:text-neutral-300 px-6 py-3 font-semibold">
                            <span>Sub Total Biaya Jasa Jumpapay</span>
                            <span>{detail.rincian_pembayaran.sub_total_biaya_jasa_jumpapay}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center dark:border-neutral-700 pt-4 mt-6 bg-gray-50 dark:bg-neutral-800/50 p-6 rounded-xl border">
                <p className="text-xs sm:text-base font-semibold text-gray-900 dark:text-neutral-100">Total Biaya Pajak (PKB) + <br/> Biaya Jasa Jumpapay</p>
                <p className="text-sm sm:text-xl font-bold" style={{ color: '#3892E4' }}>{formatPrice(order.harga)}</p>
            </div>
        </div>
    );
};

export default OrderDetail;