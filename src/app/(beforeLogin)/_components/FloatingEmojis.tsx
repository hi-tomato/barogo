// components/FloatingEmojis.tsx
import React from "react";

const foodEmojis = ["🍕", "🍔", "🍜", "🍣", "🌮", "🍝", "🥘", "🍱", "🥗", "🍛"];

export default function FloatingEmojis() {
  return (
    <>
      {/* 상단 영역 */}
      <div className="fixed top-0 left-0 right-0 h-1/4 pointer-events-none overflow-hidden z-0">
        {foodEmojis.slice(0, 3).map((emoji, index) => (
          <div
            key={`top-${index}`}
            className={`absolute text-2xl opacity-20 animate-float-${
              index % 3
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* 하단 영역 */}
      <div className="fixed bottom-0 left-0 right-0 h-1/4 pointer-events-none overflow-hidden z-0">
        {foodEmojis.slice(3, 6).map((emoji, index) => (
          <div
            key={`bottom-${index}`}
            className={`absolute text-2xl opacity-20 animate-float-${
              index % 3
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* 좌측 영역 */}
      <div className="fixed top-1/4 bottom-1/4 left-0 w-1/4 pointer-events-none overflow-hidden z-0">
        {foodEmojis.slice(6, 8).map((emoji, index) => (
          <div
            key={`left-${index}`}
            className={`absolute text-2xl opacity-20 animate-float-${
              index % 3
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* 우측 영역 */}
      <div className="fixed top-1/4 bottom-1/4 right-0 w-1/4 pointer-events-none overflow-hidden z-0">
        {foodEmojis.slice(8, 10).map((emoji, index) => (
          <div
            key={`right-${index}`}
            className={`absolute text-2xl opacity-20 animate-float-${
              index % 3
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>
    </>
  );
}
