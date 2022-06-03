import * as React from 'react';

import { WebDesignerInterpreter as _WebDesignerInterpreter } from './components/web-designer-interpreter/WebDesignerInterpreter'
import { SiraParser } from 'sira-lang/lib/main';
import { SiraPage } from 'sira-lang/lib/sira.interface';
import { StatementExec as _StatementExec } from './components/web-designer-interpreter/statement-exec';

const project_pages: string[] = [
  "page Semua Provinsi\n  [data]\n    table daftar_provinsi = query 'daftar provinsi'\n\n  [view]\n    table Daftar Provinsi (source = daftar_provinsi)\n      - ID: daftar_provinsi.id numeric\n      - Nama: daftar_provinsi.nama text\n",
  "page Tambah Provinsi\n  [data]\n    row provinsi\n\n  [view]\n    form Formulir Tambah Provinsi\n      - Nama: provinsi.nama text\n\n    button Simpan {\n      confirm Simpan?\n      query 'tambah provinsi' ($1 = provinsi.nama)\n      alert Berhasil menambah provinsi\n      goto Semua Provinsi\n    }\n",
];

export const WebDesignerInterpreter = _WebDesignerInterpreter;
export const StatementExec = _StatementExec;

// Delete me
export const Thing = () => {
  StatementExec.config = {
    query_base_url: 'https://api.dearblues.graf-research.com/my-project/1ee36f21-4389-4a55-8d12-5c2fc7eff443',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQzNDk5MGFjLTQ2OTItNGQyOC1iNmRiLTVhMTNjZDA1ZWJjMiIsImlhdCI6MTY1NDA5MDU4NH0.nbwpZYiScLpxyJPI4KDS8JYbY3DZrSVtreopl3z0JBA'
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
