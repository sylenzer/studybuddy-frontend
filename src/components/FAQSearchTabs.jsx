// components/FAQSearchTabs.jsx

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export const FAQSearchTabs = ({ selectedTab, onTabChange, searchTerm, onSearch }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
    <Tabs defaultValue={selectedTab} onValueChange={onTabChange}>
      <TabsList>
        <TabsTrigger value="parents">👨‍👩‍👧‍👦 Parents</TabsTrigger>
        <TabsTrigger value="students">🎓 Students</TabsTrigger>
        <TabsTrigger value="teachers">👩‍🏫 Teachers</TabsTrigger>
        <TabsTrigger value="admins">🏫 Admins</TabsTrigger>
      </TabsList>
    </Tabs>

    <Input
      type="text"
      placeholder="Search FAQs..."
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
      className="w-full sm:w-64"
    />
  </div>
);
