// pages.tsx
"use client"
import React, { useState, useCallback } from 'react';
import SidebarMenu from './components/SidebarMenu';
import MainContent from './components/MainContent';
import SearchBar from './components/SearchBar';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchTriggered, setSearchTriggered] = useState<boolean>(false);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setSearchTriggered(term.length >= 2);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-200">
      <SidebarMenu />
      <div className="flex-1">
        <SearchBar onSearch={handleSearch} />
        <MainContent searchTerm={searchTerm} searchTriggered={searchTriggered} />
      </div>
    </div>
  );
}
