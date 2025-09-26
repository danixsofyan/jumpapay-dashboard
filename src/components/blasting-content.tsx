'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

const whatsappLists = ['B2B JumpaPay', 'B2C JumpaPay'];
const userCategories = ['User Active', 'User Inactive', 'User New'];
const templateOptions = ['Template Greetings', 'Template Promo'];
const delayOptions = ['2 detik', '5 detik', '10 detik'];

const initialUsers = [
  { no_hp: '08111111231', nama: 'Kaiden Break' },
  { no_hp: '0882123012', nama: 'Bambang agus' },
  { no_hp: '081321239981', nama: 'Ryan Juana' },
  { no_hp: '08223419008', nama: 'Andika' },
  { no_hp: '088901235887', nama: 'Nelson Listianto' },
  { no_hp: '081234567890', nama: 'Satria P' },
  { no_hp: '082765009214', nama: 'Jonathan' },
  { no_hp: '088799222001', nama: 'Elyas' },
  { no_hp: '082996476000', nama: 'Fritz O Stanley' },
  { no_hp: '082444555667', nama: 'sartika' },
];

const BlastingContent = () => {
  const [selectedWhatsapp, setSelectedWhatsapp] = useState(whatsappLists[0]);
  const [selectedCategory, setSelectedCategory] = useState(userCategories[0]);
  const [selectedTemplate, setSelectedTemplate] = useState(templateOptions[0]);
  const [selectedDelay, setSelectedDelay] = useState(delayOptions[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const handleGetUser = () => {
    console.log(`Mengambil user dari List: ${selectedWhatsapp}, Kategori: ${selectedCategory}`);
  };

  const handleCheckboxChange = (no_hp: string) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(no_hp)
        ? prevSelected.filter((id) => id !== no_hp)
        : [...prevSelected, no_hp]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allPhoneNumbers = filteredUsers.map(user => user.no_hp);
      setSelectedUsers(allPhoneNumbers);
    } else {
      setSelectedUsers([]);
    }
  };

  const filteredUsers = initialUsers.filter(user =>
    user.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.no_hp.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const handleSend = () => {
    console.log('Mengirim pesan...');
    console.log('Template:', selectedTemplate);
    console.log('Delay:', selectedDelay);
    console.log('Penerima:', selectedUsers);
    alert('Pesan berhasil dikirim!');
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div className="space-y-1">
            <label htmlFor="list-whatsapp" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              List Whatsapp
            </label>
            <select
              id="list-whatsapp"
              value={selectedWhatsapp}
              onChange={(e) => setSelectedWhatsapp(e.target.value)}
              className="w-full h-[40px] text-sm px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 focus:ring-2 focus:ring-primary focus:outline-none mt-2"
            >
              {whatsappLists.map((list) => (
                <option key={list} value={list}>
                  {list}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label htmlFor="pilih-template" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Pilih Template
            </label>
            <select
              id="pilih-template"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="w-full h-[40px] text-sm px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 focus:ring-2 focus:ring-primary focus:outline-none mt-2"
            >
              {templateOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-neutral-800 rounded-lg text-sm text-gray-700 dark:text-gray-300">
            <pre className="whitespace-pre-wrap">
              {`{
  "name": "blasting_loker",
  "language": {
    "code": "ID"
  },
  "components": [
    {
      "type": "body",
      "parameters": [
        {
          "type": "text",
          "text": "kak {{nama}}"
        }
      ]
    }
  ]
}`}
            </pre>
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-end gap-4">
            <div className="flex-1 w-full space-y-1">
              <label htmlFor="kategori-user" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Kategori User
              </label>
              <select
                id="kategori-user"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-[40px] text-sm px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 focus:ring-2 focus:ring-primary focus:outline-none mt-2"
              >
                {userCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <Button
              onClick={handleGetUser}
              className="w-full sm:w-auto h-[40px] flex items-center justify-center text-sm px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:opacity-90 cursor-pointer"
            >
              Get User
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="delay-pesan" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Delay Pesan
              </label>
              <select
                id="delay-pesan"
                value={selectedDelay}
                onChange={(e) => setSelectedDelay(e.target.value)}
                className="w-full h-[40px] text-sm px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 focus:ring-2 focus:ring-primary focus:outline-none mt-2"
              >
                {delayOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Butuh 2 detik untuk menjalankan broadcast ini.
              </p>
            </div>
            <div className="space-y-1">
              <label htmlFor="cari-data" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Cari Data
              </label>
              <div className="relative">
                <input
                  id="cari-data"
                  type="text"
                  placeholder="Cari Data"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-4 pr-10 py-2 w-full border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 focus:ring-2 focus:ring-primary focus:outline-none text-sm font-medium h-[40px] mt-2"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="overflow-x-auto rounded-lg border dark:border-neutral-700">
              <table className="min-w-full text-sm text-left text-gray-500 dark:text-neutral-400">
                <thead className="text-xs text-gray-700 dark:text-neutral-300 bg-gray-50 dark:bg-neutral-800">
                  <tr>
                    <th scope="col" className="p-4 w-10">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded-sm border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-primary focus:ring-primary"
                        checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th scope="col" className="px-6 py-3 font-semibold">No. HP</th>
                    <th scope="col" className="px-6 py-3 font-semibold">Nama</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user) => (
                    <tr key={user.no_hp} className="bg-white dark:bg-neutral-900 border-b dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800/50">
                      <td className="p-4 w-10">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded-sm border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-primary focus:ring-primary"
                          checked={selectedUsers.includes(user.no_hp)}
                          onChange={() => handleCheckboxChange(user.no_hp)}
                        />
                      </td>
                      <td className="px-6 py-4">{user.no_hp}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{user.nama}</td>
                    </tr>
                  ))}
                  {paginatedUsers.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-4 text-center text-gray-500 dark:text-neutral-400">
                        Tidak ada data yang ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 dark:text-neutral-400">
                {selectedUsers.length} user terpilih
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                </Button>
                <span className="text-gray-500 dark:text-neutral-400">
                  Halaman {totalPages === 0 ? 0 : currentPage} dari {totalPages}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full mt-4 flex items-end justify-end">
            <Button onClick={handleSend} className="w-full h-[40px] px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:opacity-90">
            Kirim Pesan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlastingContent;