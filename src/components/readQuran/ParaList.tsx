import React, { useState } from "react";
import { FiArrowLeft, FiBookOpen, FiSearch } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import QuranPageReader from "./QuranPageRender";

interface Para {
  number: number;
  name: string;
  arabicName: string;
  startingSurah: string;
  endingSurah: string;
  totalPages: number;
}

const paras: Para[] = [
  {
    number: 1,
    name: "Alif Laam Meem",
    arabicName: "الم",
    startingSurah: "Al-Fatiha",
    endingSurah: "Al-Baqarah",
    totalPages: 22,
  },
  {
    number: 2,
    name: "Sayaqool",
    arabicName: "سيقول",
    startingSurah: "Al-Baqarah",
    endingSurah: "Al-Baqarah",
    totalPages: 20,
  },
  {
    number: 3,
    name: "Tilkal Rusul",
    arabicName: "تلك الرسل",
    startingSurah: "Al-Baqarah",
    endingSurah: "Aal-e-Imran",
    totalPages: 20,
  },
  {
    number: 4,
    name: "Lan Tanaloo",
    arabicName: "لن تنالوا",
    startingSurah: "Aal-e-Imran",
    endingSurah: "An-Nisa",
    totalPages: 20,
  },
  {
    number: 5,
    name: "Wal Mohsanat",
    arabicName: "والمحصنات",
    startingSurah: "An-Nisa",
    endingSurah: "An-Nisa",
    totalPages: 20,
  },
  {
    number: 6,
    name: "La Yuhibbullah",
    arabicName: "لا يحب الله",
    startingSurah: "An-Nisa",
    endingSurah: "Al-Ma'idah",
    totalPages: 20,
  },
  {
    number: 7,
    name: "Wa Iza Sami'u",
    arabicName: "وإذا سمعوا",
    startingSurah: "Al-Ma'idah",
    endingSurah: "Al-An'am",
    totalPages: 20,
  },
  {
    number: 8,
    name: "Wa Lau Annana",
    arabicName: "ولو أننا",
    startingSurah: "Al-An'am",
    endingSurah: "Al-A'raf",
    totalPages: 20,
  },
  {
    number: 9,
    name: "Qalal Malaa",
    arabicName: "قال الملأ",
    startingSurah: "Al-A'raf",
    endingSurah: "Al-Anfal",
    totalPages: 20,
  },
  {
    number: 10,
    name: "Wa A'lamu",
    arabicName: "واعلموا",
    startingSurah: "Al-Anfal",
    endingSurah: "At-Tawbah",
    totalPages: 20,
  },
  {
    number: 11,
    name: "Ya'tadhiroona",
    arabicName: "يعتذرون",
    startingSurah: "At-Tawbah",
    endingSurah: "Hud",
    totalPages: 20,
  },
  {
    number: 12,
    name: "Wa Ma Min Daabbatin",
    arabicName: "وما من دابة",
    startingSurah: "Hud",
    endingSurah: "Yusuf",
    totalPages: 20,
  },
  {
    number: 13,
    name: "Wa Ma Ubriyu",
    arabicName: "وما أبرئ",
    startingSurah: "Yusuf",
    endingSurah: "Ibrahim",
    totalPages: 20,
  },
  {
    number: 14,
    name: "Rubama",
    arabicName: "ربما",
    startingSurah: "Al-Hijr",
    endingSurah: "An-Nahl",
    totalPages: 20,
  },
  {
    number: 15,
    name: "Subhanallazi",
    arabicName: "سبحان الذي",
    startingSurah: "Al-Isra",
    endingSurah: "Al-Kahf",
    totalPages: 20,
  },
  {
    number: 16,
    name: "Qal Alam",
    arabicName: "قال ألم",
    startingSurah: "Al-Kahf",
    endingSurah: "Taha",
    totalPages: 20,
  },
  {
    number: 17,
    name: "Iqtarabal Linasi",
    arabicName: "اقترب للناس",
    startingSurah: "Al-Anbiya",
    endingSurah: "Al-Hajj",
    totalPages: 20,
  },
  {
    number: 18,
    name: "Qad Aflaha",
    arabicName: "قد أفلح",
    startingSurah: "Al-Mu'minun",
    endingSurah: "An-Nur",
    totalPages: 20,
  },
  {
    number: 19,
    name: "Wa Qalallazina",
    arabicName: "وقال الذين",
    startingSurah: "Al-Furqan",
    endingSurah: "An-Naml",
    totalPages: 20,
  },
  {
    number: 20,
    name: "A'man Khalaq",
    arabicName: "أمن خلق",
    startingSurah: "An-Naml",
    endingSurah: "Al-Ankabut",
    totalPages: 20,
  },
  {
    number: 21,
    name: "Utlu Ma Uhiya",
    arabicName: "اتل ما أوحي",
    startingSurah: "Al-Ankabut",
    endingSurah: "Luqman",
    totalPages: 20,
  },
  {
    number: 22,
    name: "Wa Manya'tasim",
    arabicName: "ومن يعتصم",
    startingSurah: "Al-Ahzab",
    endingSurah: "Fatir",
    totalPages: 20,
  },
  {
    number: 23,
    name: "Wa Mali",
    arabicName: "وما لي",
    startingSurah: "Ya-Sin",
    endingSurah: "Az-Zumar",
    totalPages: 20,
  },
  {
    number: 24,
    name: "Faman Azlam",
    arabicName: "فمن أظلم",
    startingSurah: "Az-Zumar",
    endingSurah: "Fussilat",
    totalPages: 20,
  },
  {
    number: 25,
    name: "Ilay Hi Yuraddu",
    arabicName: "إليه يرد",
    startingSurah: "Fussilat",
    endingSurah: "Al-Jathiyah",
    totalPages: 20,
  },
  {
    number: 26,
    name: "Ha'a Meem",
    arabicName: "حم",
    startingSurah: "Al-Ahqaf",
    endingSurah: "Az-Zariyat",
    totalPages: 20,
  },
  {
    number: 27,
    name: "Qala Fama Khatbukum",
    arabicName: "قال فما خطبكم",
    startingSurah: "Az-Zariyat",
    endingSurah: "Al-Hadid",
    totalPages: 20,
  },
  {
    number: 28,
    name: "Qad Sami Allah",
    arabicName: "قد سمع الله",
    startingSurah: "Al-Mujadila",
    endingSurah: "At-Tahrim",
    totalPages: 20,
  },
  {
    number: 29,
    name: "Tabarakalladhi",
    arabicName: "تبارك الذي",
    startingSurah: "Al-Mulk",
    endingSurah: "Al-Mursalat",
    totalPages: 20,
  },
  {
    number: 30,
    name: "'Amma Yatasa'alun",
    arabicName: "عم يتساءلون",
    startingSurah: "An-Naba",
    endingSurah: "An-Nas",
    totalPages: 24,
  },
];

interface ParaListProps {
  onBack: () => void;
}

const ParaList: React.FC<ParaListProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPara, setSelectedPara] = useState<Para | null>(null);
  const [startReading, setStartReading] = useState(false);

  const filteredParas = paras.filter(
    (para) =>
      para.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      para.arabicName.includes(searchTerm) ||
      para.number.toString().includes(searchTerm)
  );

  const handleParaClick = (para: Para) => {
    setSelectedPara(para);
  };

  if (startReading && selectedPara) {
    return (
      <QuranPageReader
        selectedPara={selectedPara}
        setSelectedPara={setSelectedPara}
        onBack={onBack}
      />
    );
  }
  if (selectedPara) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="p-4 bg-emerald-500 text-white">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedPara(null)}
              className="text-white hover:bg-emerald-600 p-1 rounded"
            >
              <FiArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-lg font-bold">Para {selectedPara.number}</h2>
              <p className="text-sm opacity-90">{selectedPara.name}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 bg-gray-50">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2 font-arabic">
                {selectedPara.arabicName}
              </h3>
              <p className="text-lg text-gray-600">{selectedPara.name}</p>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Para Number:</span>
                <span className="font-medium">{selectedPara.number}</span>
              </div>
              <div className="flex justify-between">
                <span>Starting Surah:</span>
                <span className="font-medium">
                  {selectedPara.startingSurah}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Ending Surah:</span>
                <span className="font-medium">{selectedPara.endingSurah}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Pages:</span>
                <span className="font-medium">{selectedPara.totalPages}</span>
              </div>
            </div>

            <button
              onClick={() => setStartReading(true)}
              className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <FiBookOpen size={18} />
              Start Reading
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 bg-emerald-500 text-white">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-white hover:bg-emerald-600 p-1 rounded"
          >
            <FiArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-lg font-bold">Para List</h2>
            <p className="text-sm opacity-90">30 Paras of the Holy Quran</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50">
        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <BiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search paras..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* Para Grid */}
        <div className="space-y-2 overflow-y-scroll border scroll-smooth h-[67vh]">
          {filteredParas.map((para) => (
            <button
              key={para.number}
              onClick={() => handleParaClick(para)}
              className="w-full p-4 bg-white rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 text-left shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {para.number}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {para.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {para.startingSurah} → {para.endingSurah}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-arabic text-emerald-600 mb-1">
                    {para.arabicName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {para.totalPages} pages
                  </div>
                </div>
              </div>
            </button>
          ))}
          {filteredParas.length === 0 && (
            <div className="text-center py-8">
              <FiSearch className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No paras found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search term.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParaList;
