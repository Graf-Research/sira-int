import * as React from 'react';

import { WebDesignerInterpreter } from './components/web-designer-interpreter/WebDesignerInterpreter'
import { SiraParser } from 'sira-lang/lib/main';
import { SiraPage } from 'sira-lang/lib/sira.interface';
import { StatementExec } from './components/web-designer-interpreter/statement-exec';
import { WDIPageViewPreview } from './components/web-designer-interpreter/wdi-page-view/WDIPageView';

const project_pages: string[] = [
  "page Daftar Pesanan\n  [data]\n    table list_pesanan = query 'daftar pesanan'\n\n  [view]\n    button Tambah Pesanan Baru {\n      goto Pesanan Baru\n    }\n    table Tabel Daftar Menu (source = list_pesanan)\n      - ID: list_pesanan.id numeric\n      - Nomor Meja: list_pesanan.nomor_meja text\n      - Pelanggan: list_pesanan.nama_pelanggan bigtext\n      - Jumlah Orang: list_pesanan.jumlah_pelanggan numeric\n      - Status: list_pesanan.status_pesanan text\n      - Detail {\n        goto Detail Pesanan ($id = list_pesanan.id)\n      }\n      - Hapus {\n        confirm Hapus pesanan?\n        query 'hapus pesanan' ($1 = list_pesanan.id)\n        goto Daftar Pesanan\n      }\n      - Selesaikan {\n        confirm Selesaikan pesanan?\n        query 'selesaikan pesanan' ($1 = list_pesanan.id)\n        goto Daftar Pesanan\n      }\n",
  "page Tambah Menu\n  [data]\n    row menu\n\n  [view]\n    form Formulir Tambah Menu\n      - Nama: menu.nama text\n      - Harga: menu.harga numeric\n      - Deskripsi: menu.deskripsi bigtext\n\n    button Tambah {\n      confirm Tambah menu?\n      query 'tambah menu' (\n        $1 = menu.nama, \n        $2 = menu.harga,\n        $3 = menu.deskripsi\n      )\n      alert Berhasil\n      goto Daftar Menu\n    }\n",
  "page Daftar Menu\n  [data]\n    table list_menu = query 'daftar menu'\n\n  [view]\n    table Tabel Daftar Menu (source = list_menu)\n      - ID: list_menu.id numeric\n      - Nama: list_menu.nama text\n      - Deskripsi: list_menu.deskripsi bigtext\n      - Ubah {\n        goto Ubah Menu ($id = list_menu.id)\n      }\n      - Hapus {\n        confirm Hapus menu?\n        query 'hapus menu' ($1 = list_menu.id)\n        goto Daftar Menu\n      }\n",
  "page Ubah Menu\n  [param]\n    $id\n\n  [data]\n    row menu = query 'menu by id' ($1 = $id)\n\n  [view]\n    form Formulir Ubah Menu\n      - ID: menu.id numeric\n      - Nama: menu.nama text\n      - Harga: menu.harga numeric\n      - Deskripsi: menu.deskripsi bigtext\n\n    button Ubah {\n      confirm Ubah menu?\n      query 'ubah menu' (\n        $1 = $id,\n        $2 = menu.nama, \n        $3 = menu.harga,\n        $4 = menu.deskripsi\n      )\n      alert Berhasil\n      goto Daftar Menu\n    }\n",
  "page Daftar Meja\n  [data]\n    table list_meja = query 'daftar meja'\n\n  [view]\n    table Tabel Daftar Meja (source = list_meja)\n      - ID: list_meja.id numeric\n      - Nomor: list_meja.nomor text\n      - Ubah {\n        goto Ubah Meja ($id = list_meja.id)\n      }\n      - Hapus {\n        confirm Hapus meja?\n        query 'hapus meja' ($1 = list_meja.id)\n        goto Daftar Meja\n      }\n",
  "page Ubah Meja\n  [param]\n    $id\n\n  [data]\n    row meja = query 'meja by id' ($1 = $id)\n\n  [view]\n    form Formulir Ubah Meja\n      - ID: meja.id numeric\n      - Nomor: meja.nomor text\n\n    button Ubah {\n      confirm Ubah meja?\n      query 'ubah meja' (\n        $1 = $id,\n        $2 = meja.nomor\n      )\n      alert Berhasil\n      goto Daftar Meja\n    }\n",
  "page Tambah Meja\n  [data]\n    row meja\n\n  [view]\n    form Formulir Tambah Meja\n      - Nomor: meja.nomor text\n\n    button Tambah {\n      confirm Tambah meja?\n      query 'tambah meja' (\n        $1 = meja.nomor\n      )\n      alert Berhasil\n      goto Daftar Meja\n    }\n",
  "page Pesanan Baru\n  [data]\n    row pesanan\n    table item_pesanan\n    table opsi_menu = query 'opsi menu'\n    table opsi_meja = query 'opsi meja'\n\n  [view]\n    form Formulir Pesanan Baru\n      - Nama Pelanggan: pesanan.nama_pelanggan text\n      - Jumlah Orang: pesanan.jumlah_pelanggan numeric\n      - Pilih Meja: pesanan.id_meja dropdown (source = opsi_meja)\n\n    multiform Item Pesanan (source = item_pesanan)\n      - Pilih Menu: item_pesanan.id_menu dropdown (source = opsi_menu)\n      - Kuantitas: item_pesanan.kuantitas numeric\n\n    button Tambah {\n      confirm Tambah pesanan?\n      row pesanan = query 'tambah pesanan' (\n        $1 = pesanan.nama_pelanggan, \n        $2 = pesanan.jumlah_pelanggan,\n        $3 = pesanan.id_meja\n      )\n      query 'tambah detail pesanan' (source = item_pesanan) [\n        $1 = pesanan.id,\n        $2 = item_pesanan.id_menu,\n        $3 = item_pesanan.kuantitas\n      ]\n      alert Berhasil\n      goto Daftar Pesanan\n    }\n",
  "page Detail Pesanan\n  [param]\n    $id\n\n  [data]\n    row pesanan = query 'pesanan by id' ($1 = $id)\n    table item_pesanan = query 'item pesanan by id pesanan' ($1 = $id)\n    table opsi_menu = query 'opsi menu'\n    table opsi_meja = query 'opsi meja'\n\n  [view]\n    form Data Pesanan\n      - Nama Pelanggan: pesanan.nama_pelanggan text\n      - Jumlah Orang: pesanan.jumlah_pelanggan numeric\n      - Meja: pesanan.id_meja dropdown (source = opsi_meja)\n\n    multiform Item Pesanan (source = item_pesanan)\n      - Pilih Menu: item_pesanan.id_menu dropdown (source = opsi_menu)\n      - Kuantitas: item_pesanan.kuantitas numeric\n\n    button Ubah {\n      confirm Ubah pesanan?\n      row pesanan = query 'ubah pesanan' (\n        $1 = $id,\n        $2 = pesanan.nama_pelanggan, \n        $3 = pesanan.jumlah_pelanggan,\n        $4 = pesanan.id_meja\n      )\n      query 'ubah detail pesanan' (source = item_pesanan) [\n        $1 = pesanan.id,\n        $2 = item_pesanan.id_menu,\n        $3 = item_pesanan.kuantitas\n      ]\n      alert Berhasil\n      goto Daftar Pesanan\n    }\n",
];

export { WebDesignerInterpreter, WDIPageViewPreview, StatementExec };

// Delete me
export const Thing = () => {
  StatementExec.config = {
    query_base_url: 'https://api.dearblues.graf-research.com/project/riochr17/warung-kuliner',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ2ODc1ZTM2LTQyMTgtNGYxZC04MTk3LTRjNWRlMDAwNGIyYyIsImlhdCI6MTY1NTAzNzMwOH0.9UbrksrGiYr4_xmcgfkgi77ssSKZSFTNPHLfLoOLeC0'
    }
  };
  
  function getAllPage(): SiraPage[] {
    const pages: SiraPage[] = project_pages.map((code: string) => {
      const sira_parser = new SiraParser();
      sira_parser.parse(code);
      return sira_parser.result;
    });

    return pages;
  }

  return <div>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
      body {
        color: white;
      }
    `}</style>
    <WebDesignerInterpreter
      pages={getAllPage()} />
  </div>
};
