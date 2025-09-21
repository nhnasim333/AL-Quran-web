import React, { useState } from "react";
import { FiArrowLeft, FiBookOpen, FiSearch } from "react-icons/fi";
import { BiBook } from "react-icons/bi";

interface GoToPageProps {
  onBack: () => void;
}

const GoToPage: React.FC<GoToPageProps> = ({ onBack }) => {
  const [pageNumber, setPageNumber] = useState("");
  const [selectedPage, setSelectedPage] = useState<number | null>(null);

  // Total pages in the Quran (Mushaf)
  const TOTAL_PAGES = 611;

  const handlePageInput = (value: string) => {
    // Only allow numbers
    const numValue = value.replace(/\D/g, "");
    if (
      numValue === "" ||
      (parseInt(numValue) >= 1 && parseInt(numValue) <= TOTAL_PAGES)
    ) {
      setPageNumber(numValue);
    }
  };

  const handleGoToPage = () => {
    const page = parseInt(pageNumber);
    if (page >= 1 && page <= TOTAL_PAGES) {
      setSelectedPage(page);
      console.log(`Navigate to Page ${page}`);
    }
  };

  const handleQuickPage = (page: number) => {
    setSelectedPage(page);
    console.log(`Navigate to Page ${page}`);
  };

  // Quick access pages (common bookmarks)
  const quickPages = [
    { page: 1, description: "Al-Fatiha" },
    { page: 2, description: "Al-Baqarah" },
    { page: 49, description: "Aal-e-Imran" },
    { page: 77, description: "An-Nisa" },
    { page: 106, description: "Al-Ma'idah" },
    { page: 128, description: "Al-An'am" },
    { page: 151, description: "Al-A'raf" },
    { page: 177, description: "Al-Anfal" },
    { page: 187, description: "At-Tawbah" },
    { page: 208, description: "Yunus" },
    { page: 235, description: "Yusuf" },
    { page: 249, description: "Ar-Ra'd" },
    { page: 262, description: "Al-Hijr" },
    { page: 267, description: "An-Nahl" },
    { page: 282, description: "Al-Isra" },
    { page: 293, description: "Al-Kahf" },
    { page: 305, description: "Maryam" },
    { page: 312, description: "Taha" },
    { page: 322, description: "Al-Anbiya" },
    { page: 332, description: "Al-Hajj" },
    { page: 342, description: "Al-Mu'minun" },
    { page: 350, description: "An-Nur" },
    { page: 359, description: "Al-Furqan" },
    { page: 367, description: "Ash-Shu'ara" },
    { page: 377, description: "An-Naml" },
    { page: 385, description: "Al-Qasas" },
    { page: 396, description: "Al-Ankabut" },
    { page: 404, description: "Ar-Rum" },
    { page: 411, description: "Luqman" },
    { page: 415, description: "As-Sajdah" },
    { page: 418, description: "Al-Ahzab" },
    { page: 428, description: "Saba" },
    { page: 434, description: "Fatir" },
    { page: 440, description: "Ya-Sin" },
    { page: 446, description: "As-Saffat" },
    { page: 453, description: "Sad" },
    { page: 458, description: "Az-Zumar" },
    { page: 467, description: "Ghafir" },
    { page: 477, description: "Fussilat" },
    { page: 483, description: "Ash-Shuraa" },
    { page: 489, description: "Az-Zukhruf" },
    { page: 496, description: "Ad-Dukhan" },
    { page: 499, description: "Al-Jathiyah" },
    { page: 502, description: "Al-Ahqaf" },
    { page: 507, description: "Muhammad" },
    { page: 511, description: "Al-Fath" },
    { page: 515, description: "Al-Hujurat" },
    { page: 518, description: "Qaf" },
    { page: 520, description: "Adh-Dhariyat" },
    { page: 523, description: "At-Tur" },
    { page: 526, description: "An-Najm" },
    { page: 528, description: "Al-Qamar" },
    { page: 531, description: "Ar-Rahman" },
    { page: 534, description: "Al-Waqi'ah" },
    { page: 537, description: "Al-Hadid" },
    { page: 542, description: "Al-Mujadila" },
    { page: 545, description: "Al-Hashr" },
    { page: 549, description: "Al-Mumtahanah" },
    { page: 551, description: "As-Saff" },
    { page: 553, description: "Al-Jumu'ah" },
    { page: 554, description: "Al-Munafiqun" },
    { page: 556, description: "At-Taghabun" },
    { page: 558, description: "At-Talaq" },
    { page: 560, description: "At-Tahrim" },
    { page: 562, description: "Al-Mulk" },
    { page: 564, description: "Al-Qalam" },
    { page: 566, description: "Al-Haqqah" },
    { page: 568, description: "Al-Ma'arij" },
    { page: 570, description: "Nuh" },
    { page: 572, description: "Al-Jinn" },
    { page: 574, description: "Al-Muzzammil" },
    { page: 575, description: "Al-Muddaththir" },
    { page: 577, description: "Al-Qiyamah" },
    { page: 578, description: "Al-Insan" },
    { page: 580, description: "Al-Mursalat" },
    { page: 582, description: "An-Naba" },
    { page: 583, description: "An-Nazi'at" },
    { page: 585, description: "Abasa" },
    { page: 586, description: "At-Takwir" },
    { page: 587, description: "Al-Infitar" },
    { page: 587, description: "Al-Mutaffifin" },
    { page: 589, description: "Al-Inshiqaq" },
    { page: 590, description: "Al-Buruj" },
    { page: 591, description: "At-Tariq" },
    { page: 591, description: "Al-A'la" },
    { page: 592, description: "Al-Ghashiyah" },
    { page: 593, description: "Al-Fajr" },
    { page: 594, description: "Al-Balad" },
    { page: 595, description: "Ash-Shams" },
    { page: 595, description: "Al-Layl" },
    { page: 596, description: "Ad-Duhaa" },
    { page: 596, description: "Ash-Sharh" },
    { page: 597, description: "At-Tin" },
    { page: 597, description: "Al-Alaq" },
    { page: 598, description: "Al-Qadr" },
    { page: 598, description: "Al-Bayyinah" },
    { page: 599, description: "Az-Zalzalah" },
    { page: 600, description: "Al-Adiyat" },
    { page: 600, description: "Al-Qari'ah" },
    { page: 600, description: "At-Takathur" },
    { page: 601, description: "Al-Asr" },
    { page: 601, description: "Al-Humazah" },
    { page: 601, description: "Al-Fil" },
    { page: 602, description: "Quraysh" },
    { page: 602, description: "Al-Ma'un" },
    { page: 602, description: "Al-Kawthar" },
    { page: 603, description: "Al-Kafirun" },
    { page: 603, description: "An-Nasr" },
    { page: 603, description: "Al-Masad" },
    { page: 604, description: "Al-Ikhlas" },
    { page: 604, description: "Al-Falaq" },
    { page: 604, description: "An-Nas" },
  ];

  if (selectedPage) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="p-4 bg-emerald-500 text-white">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedPage(null)}
              className="text-white hover:bg-emerald-600 p-1 rounded"
            >
              <FiArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-lg font-bold">Page {selectedPage}</h2>
              <p className="text-sm opacity-90">Quran Reading</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 bg-gray-50">
          <div className="bg-white rounded-lg p-6 shadow-sm text-center">
            <div className="text-6xl text-emerald-500 mb-4">
              <BiBook />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Page {selectedPage}
            </h3>
            <p className="text-gray-600 mb-6">Ready to read the Quran</p>

            <button
              onClick={() => console.log(`Start reading page ${selectedPage}`)}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
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
            <h2 className="text-lg font-bold">Go to Page</h2>
            <p className="text-sm opacity-90">Navigate to any page (1-611)</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50">
        {/* Page Input Section */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Page Number
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={pageNumber}
              onChange={(e) => handlePageInput(e.target.value)}
              placeholder="1-611"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-center text-lg font-medium"
              maxLength={3}
            />
            <button
              onClick={handleGoToPage}
              disabled={
                !pageNumber ||
                parseInt(pageNumber) < 1 ||
                parseInt(pageNumber) > TOTAL_PAGES
              }
              className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Go
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1 text-center">
            Total pages: {TOTAL_PAGES}
          </p>
        </div>

        {/* Quick Access Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <FiSearch size={16} />
            Quick Access
          </h3>
          <div className="grid grid-cols-2 gap-2 space-y-2 overflow-y-scroll border scroll-smooth h-[47vh]">
            {quickPages.slice(0, 20).map((item) => (
              <button
                key={item.page}
                onClick={() => handleQuickPage(item.page)}
                className="p-3 text-left border border-gray-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 transition-colors duration-200"
              >
                <div className="font-medium text-emerald-600">
                  Page {item.page}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {item.description}
                </div>
              </button>
            ))}
          </div>
          <div className="mt-3 text-center">
            <button
              onClick={() => console.log("Show all surahs")}
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              View All Surahs →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoToPage;
