import React, { useState, useEffect } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBookOpen,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { quran } from "../../../_scripts/downloadImages";

const QuranPageReader = ({ selectedPara, setSelectedPara, onBack }: any) => {
  const [isReading, setIsReading] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [currentQuranItem, setCurrentQuranItem] = useState(null);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const handleParaClick = (para: any) => {
    const quranItem: any = quran.filter((item) => item.para === para.number)[0];
    setCurrentQuranItem(quranItem);
    setCurrentPageIndex(0);
    setIsReading(true);
    setImageLoadError(false);
  };

  const handleBackToParaInfo = () => {
    setIsReading(false);
    setCurrentQuranItem(null);
    setCurrentPageIndex(0);
    setImageLoadError(false);
  };

  const handleBackToParaList = () => {
    setSelectedPara(null);
    setIsReading(false);
    setCurrentQuranItem(null);
    setCurrentPageIndex(0);
  };

  const goToNextPage = () => {
    if (
      currentQuranItem &&
      currentPageIndex < currentQuranItem.pages.length - 1
    ) {
      setCurrentPageIndex(currentPageIndex + 1);
      setImageLoadError(false);
    }
  };

  const goToPreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
      setImageLoadError(false);
    }
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
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
    const handleKeyPress = (e) => {
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

  const handleImageError = () => {
    setImageLoadError(true);
  };

  // Reading mode
  if (selectedPara && isReading && currentQuranItem) {
    const currentPage = currentQuranItem.pages[currentPageIndex];
    const isFirstPage = currentPageIndex === 0;
    const isLastPage = currentPageIndex === currentQuranItem.pages.length - 1;

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
                  Para {selectedPara.number}
                </h2>
                <p className="text-sm opacity-90">{selectedPara.name}</p>
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
        <div className="flex-1 flex items-center justify-center bg-gray-100 relative">
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

  if (selectedPara) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="p-4 bg-emerald-500 text-white">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBackToParaList}
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
        <p>Select a Para to begin reading</p>
      </div>
    </div>
  );
};

export default QuranPageReader;
