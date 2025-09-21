// Enhanced QuranPageReader Component
import React, { useState, useEffect } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBookOpen,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { quran } from "../../../_scripts/downloadImages";

// Type definitions
interface Para {
  number: number;
  name: string;
  arabicName: string;
  startingSurah: string;
  endingSurah: string;
  totalPages: number;
}

interface Page {
  page: number;
  image: string;
}

interface QuranItem {
  para: number;
  pages: Page[];
}

interface QuranPageReaderProps {
  selectedPara?: Para | null;
  setSelectedPara?: (para: Para | null) => void;
  selectedPageNumber?: number | null;
  setSelectedPageNumber?: (page: number | null) => void;
  onBack: () => void;
}

const QuranPageReader: React.FC<QuranPageReaderProps> = ({
  selectedPara,
  setSelectedPara,
  selectedPageNumber,
  setSelectedPageNumber,
  onBack,
}) => {
  const [isReading, setIsReading] = useState<boolean>(false);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [currentQuranItem, setCurrentQuranItem] = useState<QuranItem | null>(
    null
  );
  const [imageLoadError, setImageLoadError] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [currentPara, setCurrentPara] = useState<Para | null>(null);

  const minSwipeDistance = 50;

  // Function to find para by page number
  const findParaByPageNumber = (
    pageNumber: number
  ): { para: Para | null; quranItem: QuranItem | null; pageIndex: number } => {
    for (const item of quran as QuranItem[]) {
      const pageIndex = item.pages.findIndex(
        (page: Page) => page.page === pageNumber
      );
      if (pageIndex !== -1) {
        // Find the corresponding para info (you might need to create a mapping)
        const paraInfo: Para = {
          number: item.para,
          name: `Para ${item.para}`, // You might want to add actual names
          arabicName: `الجزء ${item.para}`,
          startingSurah: "Varies", // You might want to calculate this
          endingSurah: "Varies", // You might want to calculate this
          totalPages: item.pages.length,
        };
        return { para: paraInfo, quranItem: item, pageIndex };
      }
    }
    return { para: null, quranItem: null, pageIndex: 0 };
  };

  // Handle direct page navigation
  useEffect(() => {
    if (selectedPageNumber && !selectedPara) {
      const result = findParaByPageNumber(selectedPageNumber);
      if (result.para && result.quranItem) {
        setCurrentPara(result.para);
        setCurrentQuranItem(result.quranItem);
        setCurrentPageIndex(result.pageIndex);
        setIsReading(true);
        setImageLoadError(false);
      }
    }
  }, [selectedPageNumber, selectedPara]);

  const handleParaClick = (para: Para): void => {
    const quranItem = quran.find(
      (item: QuranItem) => item.para === para.number
    );
    if (quranItem) {
      setCurrentQuranItem(quranItem);
      setCurrentPara(para);
      setCurrentPageIndex(0);
      setIsReading(true);
      setImageLoadError(false);
    }
  };

  const handleBackToParaInfo = (): void => {
    setIsReading(false);
    setCurrentQuranItem(null);
    setCurrentPara(null);
    setCurrentPageIndex(0);
    setImageLoadError(false);
    if (setSelectedPageNumber) {
      setSelectedPageNumber(null);
    }
  };

  const handleBackToMain = (): void => {
    if (setSelectedPara) {
      setSelectedPara(null);
    }
    if (setSelectedPageNumber) {
      setSelectedPageNumber(null);
    }
    setIsReading(false);
    setCurrentQuranItem(null);
    setCurrentPara(null);
    setCurrentPageIndex(0);
    onBack();
  };

  const goToNextPage = (): void => {
    if (
      currentQuranItem &&
      currentPageIndex < currentQuranItem.pages.length - 1
    ) {
      const newIndex = currentPageIndex + 1;
      setCurrentPageIndex(newIndex);
      setImageLoadError(false);

      // Update selectedPageNumber if navigating by page
      if (selectedPageNumber) {
        if (setSelectedPageNumber) {
          setSelectedPageNumber(currentQuranItem.pages[newIndex].page);
        }
      }
    } else if (
      currentQuranItem &&
      currentPageIndex === currentQuranItem.pages.length - 1
    ) {
      // Try to go to next para
      const nextParaItem = quran.find(
        (item: QuranItem) => item.para === currentQuranItem.para + 1
      );
      if (nextParaItem) {
        setCurrentQuranItem(nextParaItem);
        setCurrentPageIndex(0);
        setImageLoadError(false);

        const newParaInfo: Para = {
          number: nextParaItem.para,
          name: `Para ${nextParaItem.para}`,
          arabicName: `الجزء ${nextParaItem.para}`,
          startingSurah: "Varies",
          endingSurah: "Varies",
          totalPages: nextParaItem.pages.length,
        };
        setCurrentPara(newParaInfo);

        if (selectedPageNumber) {
          if (setSelectedPageNumber) {
            setSelectedPageNumber(nextParaItem.pages[0].page);
          }
        }
      }
    }
  };

  const goToPreviousPage = (): void => {
    if (currentPageIndex > 0) {
      const newIndex = currentPageIndex - 1;
      setCurrentPageIndex(newIndex);
      setImageLoadError(false);

      // Update selectedPageNumber if navigating by page
      if (selectedPageNumber && currentQuranItem) {
        if (setSelectedPageNumber) {
          setSelectedPageNumber(currentQuranItem.pages[newIndex].page);
        }
      }
    } else if (currentQuranItem && currentQuranItem.para > 1) {
      // Try to go to previous para
      const prevParaItem = quran.find(
        (item: QuranItem) => item.para === currentQuranItem.para - 1
      );
      if (prevParaItem) {
        setCurrentQuranItem(prevParaItem);
        setCurrentPageIndex(prevParaItem.pages.length - 1);
        setImageLoadError(false);

        const newParaInfo: Para = {
          number: prevParaItem.para,
          name: `Para ${prevParaItem.para}`,
          arabicName: `الجزء ${prevParaItem.para}`,
          startingSurah: "Varies",
          endingSurah: "Varies",
          totalPages: prevParaItem.pages.length,
        };
        setCurrentPara(newParaInfo);

        if (selectedPageNumber) {
          if (setSelectedPageNumber) {
            setSelectedPageNumber(
              prevParaItem.pages[prevParaItem.pages.length - 1].page
            );
          }
        }
      }
    }
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (): void => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNextPage();
    } else if (isRightSwipe) {
      goToPreviousPage();
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent): void => {
      if (!isReading) return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        goToNextPage();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        goToPreviousPage();
      } else if (e.key === "Escape") {
        handleBackToParaInfo();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isReading, currentPageIndex, currentQuranItem]);

  const handleImageError = (): void => {
    setImageLoadError(true);
  };

  // Reading mode
  if (
    (selectedPara || selectedPageNumber) &&
    isReading &&
    currentQuranItem &&
    currentPara
  ) {
    const currentPage = currentQuranItem.pages[currentPageIndex];
    const isFirstPage = currentPageIndex === 0 && currentQuranItem.para === 1;
    const isLastPage =
      currentPageIndex === currentQuranItem.pages.length - 1 &&
      currentQuranItem.para ===
        Math.max(...quran.map((item: QuranItem) => item.para));

    return (
      <div className="flex-1 flex flex-col bg-gray-900">
        {/* Header */}
        <div className="p-4 bg-emerald-500 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBackToParaInfo}
                className="text-white hover:bg-emerald-600 p-1 rounded"
              >
                <FiArrowLeft size={20} />
              </button>
              <div>
                <h2 className="text-lg font-bold">
                  {selectedPageNumber
                    ? `Page ${currentPage.page}`
                    : `Para ${currentPara.number}`}
                </h2>
                <p className="text-sm opacity-90">
                  {selectedPageNumber
                    ? `Para ${currentPara.number}`
                    : currentPara.name}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">
                Page {currentPageIndex + 1} of {currentQuranItem.pages.length}
              </p>
              <p className="text-xs opacity-75">
                Quran Page {currentPage.page}
              </p>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 flex items-center justify-center bg-gray-50 relative">
          <div
            className="relative max-w-2xl w-full h-full flex items-center justify-center px-4"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {imageLoadError ? (
              <div className="bg-white rounded-lg p-8 shadow-lg text-center">
                <div className="text-gray-400 mb-4">
                  <FiBookOpen size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Page Not Available
                </h3>
                <p className="text-gray-500 mb-4">
                  Unable to load page {currentPage.page}
                </p>
                <div className="flex gap-2 justify-center">
                  {!isFirstPage && (
                    <button
                      onClick={goToPreviousPage}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                    >
                      Previous Page
                    </button>
                  )}
                  {!isLastPage && (
                    <button
                      onClick={goToNextPage}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                    >
                      Next Page
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={currentPage.image}
                  alt={`Quran Page ${currentPage.page}`}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg bg-white"
                  onError={handleImageError}
                />
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="p-4 bg-white border-t">
          <div className="flex items-center justify-between">
            <button
              onClick={goToPreviousPage}
              disabled={isFirstPage}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isFirstPage
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              }`}
            >
              <FiChevronLeft size={18} />
              Previous
            </button>

            <div className="text-center">
              <div className="text-sm text-gray-600">
                {currentPageIndex + 1} / {currentQuranItem.pages.length}
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-1 mt-1">
                <div
                  className="bg-emerald-500 h-1 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      ((currentPageIndex + 1) / currentQuranItem.pages.length) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>

            <button
              onClick={goToNextPage}
              disabled={isLastPage}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isLastPage
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              }`}
            >
              Next
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="px-4 py-2 bg-gray-50 text-center text-xs text-gray-500">
          Swipe left/right or use arrow keys to navigate • ESC to go back
        </div>
      </div>
    );
  }

  // Para info mode
  if (selectedPara && !selectedPageNumber) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="p-4 bg-emerald-500 text-white">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBackToMain}
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
              onClick={() => handleParaClick(selectedPara)}
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
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="text-center text-gray-500">
        <FiBookOpen size={48} className="mx-auto mb-4" />
        <p>Select a Para or Page to begin reading</p>
      </div>
    </div>
  );
};

export default QuranPageReader;
