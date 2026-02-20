import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useI18n } from "@/app/i18n/I18nContext";
import { personalInfo } from "@/config/personalInfo";
import { Coffee, X, Heart } from "lucide-react";

export default function DonationButton() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const donation = personalInfo.donation;

  // If donation is not enabled, don't show anything
  if (!donation || !donation.enabled) {
    return null;
  }

  return (
    <>
      {/* Donation Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 md:bottom-8 z-40 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <Coffee className="w-5 h-5" />
        <span className="text-sm font-medium">{t('donate')}</span>
      </motion.button>

      {/* Donation Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#242424] rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500 fill-current" />
                  {t('donateTitle')}
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
                {donation.description || t('donateDesc')}
              </p>

              {/* QR Code */}
              {donation.qrcode && (
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <img
                      src={donation.qrcode}
                      alt="打赏二维码"
                      className="w-48 h-48 rounded-xl shadow-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl opacity-0 hover:opacity-100 transition-opacity">
                      <span className="text-white text-sm">扫码打赏</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Methods */}
              <div className="flex justify-center gap-4 mb-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 text-2xl font-bold">
                    W
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">微信</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 text-2xl font-bold">
                    A
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">支付宝</span>
                </div>
              </div>

              {/* Thank you message */}
              <p className="text-center text-amber-600 dark:text-amber-400 font-medium">
                {t('thankYou')}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
