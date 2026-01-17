"use client";
import React, { use, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MoodMirrorApp = () => {
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentMood, setCurrentMood] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // Dummy mood history
  const [moodHistory] = useState([
    { date: '2026-01-16', emotion: 'Calm', intensity: 'moderate' },
    { date: '2026-01-15', emotion: 'Anxious', intensity: 'high' },
    { date: '2026-01-14', emotion: 'Happy', intensity: 'moderate' },
    { date: '2026-01-13', emotion: 'Neutral', intensity: 'low' },
  ]);

  const moodResponses = {
    anxious: {
      emotion: 'Anxious',
      color: 'bg-amber-50',
      accentColor: 'border-amber-300',
      textColor: 'text-amber-900',
      response: "It's okay to feel anxious. Your feelings are valid, and they're temporary.",
      action: {
        type: 'breathing',
        title: 'Box Breathing Exercise',
        description: 'Breathe in for 4, hold for 4, out for 4, hold for 4. Repeat 3 times.'
      }
    },
    stressed: {
      emotion: 'Stressed',
      color: 'bg-red-50',
      accentColor: 'border-red-300',
      textColor: 'text-red-900',
      response: "Stress is your body's way of signaling. Let's take a moment to reset.",
      action: {
        type: 'breathing',
        title: '4-7-8 Breathing',
        description: 'Breathe in for 4 counts, hold for 7, exhale slowly for 8. Feel the tension release.'
      }
    },
    sad: {
      emotion: 'Sad',
      color: 'bg-blue-50',
      accentColor: 'border-blue-300',
      textColor: 'text-blue-900',
      response: "Sadness is a natural emotion. It's okay to feel this way and take time for yourself.",
      action: {
        type: 'prompt',
        title: 'Gentle Reflection',
        description: 'What\'s one small thing that brought you comfort recently? It can be anything.'
      }
    },
    happy: {
      emotion: 'Happy',
      color: 'bg-green-50',
      accentColor: 'border-green-300',
      textColor: 'text-green-900',
      response: "That's wonderful! Savoring positive moments helps build resilience.",
      action: {
        type: 'prompt',
        title: 'Gratitude Moment',
        description: 'Take a moment to appreciate what made you feel this way. What contributed to this feeling?'
      }
    },
    neutral: {
      emotion: 'Neutral',
      color: 'bg-gray-50',
      accentColor: 'border-gray-300',
      textColor: 'text-gray-900',
      response: "Finding balance is important. Neutrality can be a peaceful state.",
      action: {
        type: 'prompt',
        title: 'Check-in',
        description: 'How does your body feel right now? Notice any sensations without judgment.'
      }
    }
  };

  const analyzeMood = () => {
    if (!input.trim()) return;

    setIsAnalyzing(true);
    setShowResult(false);

    // Simple keyword-based mood detection (replace with actual AI later)
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let detectedMood = 'neutral';

      if (lowerInput.match(/anxious|worried|nervous|uneasy/)) {
        detectedMood = 'anxious';
      } else if (lowerInput.match(/stress|overwhelm|pressure|busy/)) {
        detectedMood = 'stressed';
      } else if (lowerInput.match(/sad|down|low|unhappy|depressed/)) {
        detectedMood = 'sad';
      } else if (lowerInput.match(/happy|joy|excited|great|good|wonderful/)) {
        detectedMood = 'happy';
      }

      setCurrentMood(moodResponses[detectedMood]);
      setIsAnalyzing(false);
      setShowResult(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 mt-8"
        >
          <h1 className="text-4xl font-light text-slate-800 mb-2">Mood Mirror</h1>
          <p className="text-slate-500">Reflect, understand, and care for your feelings</p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm p-8 mb-6 border border-slate-200"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="How are you feeling today? Share what's on your mind..."
            className="w-full h-32 p-4 border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-slate-300 text-slate-700 placeholder-slate-400"
          />
          <button
            onClick={analyzeMood}
            disabled={isAnalyzing || !input.trim()}
            className="mt-4 w-full bg-slate-800 text-white py-3 rounded-xl font-medium hover:bg-slate-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Mood'}
          </button>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {showResult && currentMood && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4 mb-6"
            >
              {/* Emotion Display */}
              <div className={`${currentMood.color} ${currentMood.accentColor} border-2 rounded-2xl p-6 shadow-sm`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Detected Emotion</p>
                    <h2 className={`text-3xl font-light ${currentMood.textColor}`}>
                      {currentMood.emotion}
                    </h2>
                  </div>
                  <div className={`w-16 h-16 ${currentMood.accentColor} border-2 rounded-full flex items-center justify-center text-3xl`}>
                    {currentMood.emotion === 'Happy' && '😊'}
                    {currentMood.emotion === 'Anxious' && '😰'}
                    {currentMood.emotion === 'Stressed' && '😣'}
                    {currentMood.emotion === 'Sad' && '😢'}
                    {currentMood.emotion === 'Neutral' && '😐'}
                  </div>
                </div>
              </div>

              {/* Response Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <p className="text-slate-700 leading-relaxed">{currentMood.response}</p>
              </div>

              {/* Action Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    {currentMood.action.type === 'breathing' ? '🫁' : '💭'}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-800 mb-2">{currentMood.action.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{currentMood.action.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mood History */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
        >
          <h3 className="text-lg font-medium text-slate-800 mb-4">Recent History</h3>
          <div className="space-y-3">
            {moodHistory.map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  <span className="text-slate-700">{entry.emotion}</span>
                </div>
                <span className="text-sm text-slate-500">{entry.date}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MoodMirrorApp;