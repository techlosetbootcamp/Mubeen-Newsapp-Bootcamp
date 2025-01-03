import React from "react";
import useProfile from "./useProfile.ts";

const Profile: React.FC = () => {
  const { activeDropdown, toggleDropdown } = useProfile();

  return (
    <div className="flex flex-col items-center p-6 bg-BACKGROUND_COLOR min-h-screen">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
            <img
              src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold mt-4">Tyler Mason</h1>
          <p className="text-sm text-gray-500">tylermason309@gmail.com</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 my-6">
          <h2 className="text-gray-600 font-semibold">Your Activity</h2>
          <div className="flex justify-between items-center py-2 px-3 hover:bg-gray-100 rounded cursor-pointer">
            <div className="flex items-center gap-2">
              <span className="text-gray-700">Bookmarks</span>
              <span className="text-blue-500 text-sm">(12 saved articles)</span>
            </div>
            <span className="text-gray-400">›</span>
          </div>
          <div className="flex justify-between items-center py-2 px-3 hover:bg-gray-100 rounded cursor-pointer">
            <div className="flex items-center gap-2">
              <span className="text-gray-700">Liked Articles</span>
              <span className="text-red-500 text-sm">(8 articles liked)</span>
            </div>
            <span className="text-gray-400">›</span>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 space-y-4">
          <h2 className="text-gray-600 font-semibold">Account settings</h2>
          {[
            {
              label: "Personal information",
              info: "You can update your name, email, or phone number here.",
            },
            {
              label: "Notifications",
              info: "Customize your email and push notification preferences.",
            },
            {
              label: "Time spent",
              info: "Check your activity statistics and time logs.",
            },
            {
              label: "Following",
              info: "Manage the accounts, topics, and authors you follow.",
            },
          ].map((item, index) => (
            <div key={index} className="border-b last:border-0 pb-3">
              <div
                className="flex justify-between items-center py-2 px-3 cursor-pointer hover:bg-gray-100 rounded"
                onClick={() => toggleDropdown(item.label)}
              >
                <span className="text-gray-700">{item.label}</span>
                <span className="text-gray-400 transform transition-transform duration-300">
                  {activeDropdown === item.label ? "▲" : "▼"}
                </span>
              </div>
              {activeDropdown === item.label && (
                <div className="mt-2 text-sm text-gray-600">{item.info}</div>
              )}
            </div>
          ))}
        </div>
        <div className="bg-white shadow rounded-lg p-4 mt-6 space-y-4">
          <h2 className="text-gray-600 font-semibold">Help & Support</h2>
          {[
            {
              label: "Privacy policy",
              info: "Learn about how we use your data.",
            },
            {
              label: "Terms & Conditions",
              info: "Review our terms of service.",
            },
            { label: "FAQ & Help", info: "Find answers to common questions." },
          ].map((item, index) => (
            <div key={index} className="border-b last:border-0 pb-3">
              <div
                className="flex justify-between items-center py-2 px-3 cursor-pointer hover:bg-gray-100 rounded"
                onClick={() => toggleDropdown(item.label)}
              >
                <span className="text-gray-700">{item.label}</span>
                <span className="text-gray-400 transform transition-transform duration-300">
                  {activeDropdown === item.label ? "▲" : "▼"}
                </span>
              </div>
              {activeDropdown === item.label && (
                <div className="mt-2 text-sm text-gray-600">{item.info}</div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6">
          <button className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
