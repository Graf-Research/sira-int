import * as React from 'react';

import { WebDesignerInterpreter } from './components/web-designer-interpreter/WebDesignerInterpreter'
import { SiraParser } from 'sira-lang/lib/main';
import { SiraPage } from 'sira-lang/lib/sira.interface';
import { StatementExec } from './components/web-designer-interpreter/statement-exec';
import { WDIPageViewPreview } from './components/web-designer-interpreter/wdi-page-view/WDIPageView';

const project_pages: string[] = [
  "page Detail BPK\n  [param]\n    $bpk_id\n    $bpw_id\n\n  [data]\n    row bpk = query 'bpk by id' ($1 = $bpk_id)\n    table daftar_bpkel = query 'seluruh bpkel' ($1 = bpk.id_kota_kab)\n\n  [view]\n    button Hapus BPK {\n      confirm Hapus BPK ini?\n      query 'hapus bpk by id' ($1 = $bpk_id)\n      alert Berhasil\n      goto Detail BPW ($id = $bpw_id)\n    }\n    form Data BPK\n      - Nama: bpk.city_name text\n      - Masa Jabatan: bpk.masa_jabatan date\n      - Ketua: bpk.nama_ketua text\n      - No Telp Ketua: bpk.nomor_telepon_ketua text\n      - Email Ketua: bpk.email_ketua text\n      - Sekretaris: bpk.nama_sekretaris text\n      - No Telp Sekretaris: bpk.nomor_telepon_sekretaris text\n      - Email Sekretaris: bpk.email_sekretaris text\n      - Bendahara: bpk.nama_bendahara text\n      - No Telp Bendahara: bpk.nomor_telepon_bendahara text\n      - Email Bendahara: bpk.email_bendahara text\n\n    table Daftar BPKel (source = daftar_bpkel)\n      - BPKel: daftar_bpkel.nama_kelompok text\n      - Ketua: daftar_bpkel.nama_ketua text\n      - Masa Jabatan: daftar_bpkel.masa_jabatan date\n      - Detail {\n        goto Detail BPKel ($bpkel_id = daftar_bpkel.id)\n      }\n",
  "page Detail BPKel\n  [param]\n    $bpkel_id\n\n  [data]\n    row bpkel = query 'bpkel by id' ($1 = $bpkel_id)\n\n  [view]\n    form Data BPKel\n      - Nama: bpkel.city_name text\n      - Masa Jabatan: bpkel.masa_jabatan date\n      - Ketua: bpkel.nama_ketua text\n      - No Telp Ketua: bpkel.nomor_telepon_ketua text\n      - Email Ketua: bpkel.email_ketua text\n",
  "page Daftar BPW\n  [data]\n    table daftar_bpw = query 'seluruh bpw'\n\n  [view]\n    table Daftar Provinsi (source = daftar_bpw)\n      - ID: daftar_bpw.prov_id numeric\n      - Nama: daftar_bpw.prov_name text\n      - Ketua: daftar_bpw.nama_ketua text\n      - Sekretaris: daftar_bpw.nama_sekretaris text\n      - Bendahara: daftar_bpw.nama_bendahara text\n      - Masa Jabatan: daftar_bpw.masa_jabatan date\n      - Detail {\n        goto Detail BPW ($bpw_id = daftar_bpw.id)\n      }\n",
  "page Detail BPW\n  [param]\n    $bpw_id\n\n  [data]\n    row bpw = query 'bpw by id' ($1 = $bpw_id)\n    table daftar_bpk = query 'seluruh bpk' ($1 = bpw.id_provinsi)\n\n  [view]\n    button Hapus BPW {\n      confirm Hapus BPW ini?\n      query 'hapus bpw by id' ($1 = $bpw_id)\n      alert Berhasil\n      goto Daftar BPW\n    }\n    form Data BPW\n      - Nama: bpw.prov_name text\n      - Masa Jabatan: bpw.masa_jabatan date\n      - Ketua: bpw.nama_ketua text\n      - No Telp Ketua: bpw.nomor_telepon_ketua text\n      - Email Ketua: bpw.email_ketua text\n      - Sekretaris: bpw.nama_sekretaris text\n      - No Telp Sekretaris: bpw.nomor_telepon_sekretaris text\n      - Email Sekretaris: bpw.email_sekretaris text\n      - Bendahara: bpw.nama_bendahara text\n      - No Telp Bendahara: bpw.nomor_telepon_bendahara text\n      - Email Bendahara: bpw.email_bendahara text\n\n    table Daftar BPK (source = daftar_bpk)\n      - ID: daftar_bpk.city_id text\n      - BPK: daftar_bpk.city_name text\n      - Ketua: daftar_bpk.nama_ketua text\n      - Sekretaris: daftar_bpk.nama_sekretaris text\n      - Bendahara: daftar_bpk.nama_bendahara text\n      - Masa Jabatan: daftar_bpk.masa_jabatan date\n      - Detail {\n        goto Detail BPK (\n          $bpk_id = daftar_bpk.id,\n          $bpw_id = $bpw_id\n        )\n      }\n",
];

export { WebDesignerInterpreter, WDIPageViewPreview, StatementExec };

// Delete me
export const Thing = () => {
  StatementExec.config = {
    query_base_url: 'https://api.dearblues.graf-research.com/project/oi/database',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIyNWE0ZTNlLTk2ZjItNGYwNi1iMGQ3LWI4MzA3NWQ2NjEyMSIsImlhdCI6MTY1NDUxMTkzMX0.uDMntIEbYxPPm8_y5LI9aMHZNii4KEM1NRvkbp37tYA'
    }
  };
  
  function getAllPage(): SiraPage[] {
    const pages: SiraPage[] = project_pages.map((code: string) => {
      const sira_parser = new SiraParser();
      sira_parser.parse(code);
      return sira_parser.result;
    });
    console.log(pages);

    return pages;
  }

  return <div>
    <WebDesignerInterpreter
      pages={getAllPage()} />
  </div>
};
