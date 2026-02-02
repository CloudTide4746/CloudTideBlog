import { motion } from "motion/react";
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: Date;
  title?: string;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  const strValue = value.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <motion.div
          key={strValue}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="bg-white dark:bg-[#242424] rounded-lg px-4 py-3 shadow-lg border border-gray-100 dark:border-gray-800 min-w-[3rem]"
        >
          <span className="text-2xl md:text-3xl font-mono font-bold text-gray-900 dark:text-gray-100">
            {strValue}
          </span>
        </motion.div>
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-500 mt-2 font-medium">
        {label}
      </span>
    </div>
  );
}

export default function Countdown({ targetDate, title = "距离新年", className = "" }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className={className}
    >
      <div className="bg-gradient-to-br from-amber-50/50 to-rose-50/50 dark:from-amber-900/20 dark:to-rose-900/20 rounded-2xl p-6 border border-amber-200/50 dark:border-amber-800/50 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Clock className="w-5 h-5 text-amber-500" />
          </motion.div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {title}
          </span>
        </div>

        {/* Countdown Display */}
        {isExpired ? (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="text-center"
          >
            <span className="text-4xl md:text-5xl font-serif bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
              新年快乐！
            </span>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              愿新的一年带来美好与希望
            </p>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center gap-3 md:gap-6">
            <TimeUnit value={timeLeft.days} label="天" />
            <span className="text-2xl text-gray-400">:</span>
            <TimeUnit value={timeLeft.hours} label="时" />
            <span className="text-2xl text-gray-400">:</span>
            <TimeUnit value={timeLeft.minutes} label="分" />
            <span className="text-2xl text-gray-400">:</span>
            <TimeUnit value={timeLeft.seconds} label="秒" />
          </div>
        )}

        {/* Decorative elements */}
        {!isExpired && (
          <div className="mt-4 flex items-center justify-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{
                  width: [4, 8, 4],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                className="h-1 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full"
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
