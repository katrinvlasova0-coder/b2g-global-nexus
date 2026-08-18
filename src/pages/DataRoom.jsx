import React from 'react';
import { Download, FolderOpen } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import { DATA_ROOM_FILES, groupDataRoomFiles, localDataRoomHref } from '@/lib/data-room';

export default function DataRoom() {
  const { t } = useLanguage();
  const groups = groupDataRoomFiles(DATA_ROOM_FILES);
  const copy = t.dataRoom;

  return (
    <div className="b2g-page min-h-screen">
      <Navbar />
      <main className="pt-16">
        <section className="relative py-16 lg:py-24" style={{ backgroundColor: '#00001a' }}>
          <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
            <span className="b2g-label block mb-6">{copy.label}</span>
            <h1 className="b2g-h text-b2g-white text-4xl lg:text-6xl leading-[1.05] mb-6">{copy.title}</h1>
            <p className="text-lg text-b2g-slate max-w-2xl leading-relaxed">{copy.subtitle}</p>

            <div className="mt-12 space-y-10">
              {groups.map((group) => (
                <section key={group.folder}>
                  <div className="flex items-center gap-3 mb-4">
                    <FolderOpen size={18} className="b2g-copper" />
                    <h2 className="b2g-h text-b2g-white text-xl">{group.folder}</h2>
                  </div>
                  <ul className="divide-y divide-b2g-copper/10 border border-b2g-copper/15" style={{ borderRadius: '2px' }}>
                    {group.files.map((file) => (
                      <li key={file.file} className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4" style={{ backgroundColor: '#050530' }}>
                        <div className="min-w-0 flex-1">
                          <p className="text-b2g-white text-sm font-medium break-words">{file.title}</p>
                        </div>
                        <a
                          href={localDataRoomHref(file)}
                          download={`${file.title}.pdf`}
                          className="inline-flex items-center justify-center gap-2 b2g-copper-bg px-4 py-2.5 text-sm font-semibold shrink-0 b2g-focus-ring"
                          style={{ borderRadius: '2px', minHeight: '44px' }}
                        >
                          <Download size={16} />
                          {copy.download}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
