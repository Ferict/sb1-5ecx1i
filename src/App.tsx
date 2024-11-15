import React from 'react';
import NameGenerator from './components/NameGenerator';
import { Scroll } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen py-8">
      <header className="chinese-pattern shadow-lg mb-8">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <Scroll className="w-8 h-8 text-red-700" />
            <h1 className="text-3xl font-bold text-gray-900">AI 智慧取名</h1>
          </div>
          <p className="mt-2 text-gray-600">传统文化与现代科技的完美结合，为您的宝宝寻找最适合的名字</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4">
        <NameGenerator />
      </main>

      <footer className="mt-12 chinese-pattern">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-gray-600">
            © 2024 AI 智慧取名 - 让每个名字都充满智慧与寓意
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;